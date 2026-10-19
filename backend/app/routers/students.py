
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/students", tags=["students"])


class BulkStudentRow(BaseModel):
    student_code: str
    full_name: str
    grade: str
    parent_phone: str
    fee_type: str
    parent_name: Optional[str] = None
    parent_email: Optional[str] = None


class BulkStudentImport(BaseModel):
    students: list[BulkStudentRow]


@router.get("", response_model=list[schemas.StudentOut])
def list_students(grade: str | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Student)
    if grade:
        query = query.filter(models.Student.grade == grade)
    return query.all()


@router.get("/{student_id}", response_model=schemas.StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = (
        db.query(models.Student)
        .filter(models.Student.id == student_id)
        .first()
    )
    if not student:
        raise HTTPException(404, "Student not found")
    return student


@router.post("", response_model=schemas.StudentOut, status_code=201)
def create_student(payload: schemas.StudentCreate, db: Session = Depends(get_db)):
    student = models.Student(**payload.dict())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@router.get("/family/{family_id}", response_model=list[schemas.StudentOut])
def get_family_students(family_id: int, db: Session = Depends(get_db)):
    return (
        db.query(models.Student)
        .filter(models.Student.family_id == family_id)
        .all()
    )


@router.post("/bulk-import")
def bulk_import_students(
    payload: BulkStudentImport,
    db: Session = Depends(get_db),
):
    rows = []
    errors = []
    seen_codes = set()

    for line, student in enumerate(payload.students, start=2):
        row = student.model_dump()
        missing = [
            field for field in (
                "student_code",
                "full_name",
                "grade",
                "parent_phone",
                "fee_type",
            )
            if not str(row.get(field) or "").strip()
        ]

        if missing:
            errors.append({
                "line": line,
                "error": f"Missing: {', '.join(missing)}",
            })
            continue

        code = row["student_code"].strip()

        if code in seen_codes:
            errors.append({
                "line": line,
                "error": f"Duplicate student_code: {code}",
            })
            continue

        seen_codes.add(code)
        row["student_code"] = code
        rows.append(row)

    existing_codes = {
        code
        for (code,) in db.query(models.Student.student_code)
        .filter(
            models.Student.student_code.in_(
                [row["student_code"] for row in rows]
            )
        )
        .all()
    } if rows else set()

    duplicates = [
        row["student_code"]
        for row in rows
        if row["student_code"] in existing_codes
    ]

    valid_rows = [
        row for row in rows
        if row["student_code"] not in existing_codes
    ]

    try:
        if valid_rows:
            db.bulk_insert_mappings(
                models.Student,
                [
                    {
                        key: row[key]
                        for key in (
                            "student_code",
                            "full_name",
                            "grade",
                            "parent_phone",
                            "parent_name",
                            "parent_email",
                        )
                    }
                    for row in valid_rows
                ],
            )

        db.commit()

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Import failed. No records were imported.",
        )

    return {
        "imported": len(valid_rows),
        "skipped": len(duplicates),
        "skipped_duplicates": duplicates,
        "validation_errors": errors,
    }

