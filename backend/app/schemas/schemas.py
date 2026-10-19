from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from decimal import Decimal


# ── Student ──────────────────────────────────
class StudentCreate(BaseModel):
    student_code: str
    full_name: str
    grade: str
    family_id: Optional[int] = None
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    parent_email: Optional[str] = None


class StudentOut(StudentCreate):
    id: int
    status: str

    class Config:
        from_attributes = True


# ── Fee Type ─────────────────────────────────
class FeeTypeCreate(BaseModel):
    name: str
    category: Optional[str] = None
    amount: Decimal
    cycle: str  # Monthly / Quarterly / Annually
    status: Optional[str] = "Active"


class FeeTypeOut(FeeTypeCreate):
    id: int

    class Config:
        from_attributes = True


# ── Fee Record ───────────────────────────────
class FeeRecordCreate(BaseModel):
    student_id: int
    fee_type_id: int
    amount_due: Decimal
    due_date: date
    installment_number: Optional[int] = None
    total_installments: Optional[int] = None


class FeeRecordOut(BaseModel):
    id: int
    student_id: int
    fee_type_id: int
    amount_due: Decimal
    amount_paid: Decimal
    due_date: date
    status: str
    installment_number: Optional[int]
    total_installments: Optional[int]

    class Config:
        from_attributes = True


# ── Payment ──────────────────────────────────
class PaymentCreate(BaseModel):
    fee_record_id: int
    student_id: int
    amount: Decimal
    method: str  # UPI / Card / Cash / Cheque
    reference_id: Optional[str] = None
    recorded_by: Optional[str] = None


class PaymentOut(BaseModel):
    id: int
    fee_record_id: int
    student_id: int
    amount: Decimal
    method: str
    reference_id: Optional[str]
    receipt_number: Optional[str]
    status: str
    recorded_by: Optional[str]
    rejection_reason: Optional[str]
    paid_at: datetime

    class Config:
        from_attributes = True


class PaymentDecision(BaseModel):
    status: str  # "approved" or "rejected"
    rejection_reason: Optional[str] = None


# ── Waiver / Penalty ─────────────────────────
class WaiverCreate(BaseModel):
    fee_record_id: int
    student_id: int
    type: str  # waiver / penalty
    amount: Decimal
    reason: str
    rule_name: Optional[str] = None
    approved_by: str


class WaiverOut(WaiverCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ── Staff ────────────────────────────────────
class StaffCreate(BaseModel):
    staff_code: str
    full_name: str
    role: str
    department: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    years_experience: Optional[int] = None


class StaffOut(StaffCreate):
    id: int

    class Config:
        from_attributes = True


# ── Audit Log ────────────────────────────────
class AuditLogOut(BaseModel):
    id: int
    admin_id: str
    admin_name: str
    action: str
    ip_address: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ── Dashboard aggregates ─────────────────────
class DashboardMetrics(BaseModel):
    total_revenue: float
    pending_dues: float
    active_defaulters: int
    upi_share_pct: float
    cash_share_pct: float


class DefaulterOut(BaseModel):
    student_id: int
    student_code: str
    name: str
    grade: str
    overdue_amount: float
    days_late: int
    urgency: str  # low / med / high
class BulkStudentImportRow(BaseModel):
    student_code: str
    full_name: str
    grade: str
    parent_phone: str
    fee_type: str
    parent_name: Optional[str] = None
    parent_email: Optional[str] = None