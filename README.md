# Smart School Pay

Act as an Expert Product Designer and Frontend Architect. Please build a fully interactive, multi-page web application prototype called "Smart School FinTech". This is an end-to-end digital fee management system designed to replace scattered spreadsheets and manual paper receipts.

1. GLOBAL DESIGN SYSTEM & AESTHETICS (STRICT HACKATHON RULES)

Theme: Strict Dark Mode. The global background must be a very deep midnight blue/slate.

Pastel Gradients: Place large, highly blurred, absolute-positioned shapes in the background using soft pastel mint green, cyan, and lavender to create a glowing, modern FinTech atmosphere.

Glassmorphism (Frosted Glass): ALL UI elements (cards, sidebars, modals, tables) MUST use a soft frosted glass effect. They should have slight transparency, background blur, and thin, subtle white borders.

Typography & Icons: Use a clean, modern sans-serif font. Use modern icons for all menus and actions.

2. LAYOUT & NAVIGATION

Sidebar (Left): Create a collapsible glassmorphism sidebar with the following navigation tabs: Dashboard, Fee Engine, Payments, Staff Directory, Audit Trail, and Settings.

Header (Top): A clean glass top bar featuring a search input, a notification bell, and an Admin Profile avatar.

3. DETAILED PAGE-BY-PAGE UI REQUIREMENTS (Use rich mock data)

PAGE 1: The Next-Gen Admin Dashboard

Top Metrics: 4 glass cards displaying: Total Revenue, Pending Dues, Active Defaulters, and UPI vs. Cash Ratio. Include mini trend indicators (e.g., "+5% this month").

Visual Analytics: A beautiful, animated breakdown chart showing revenue sources (Tuition, Transport, Late Fees).

Prioritized Defaulters Table: A list of students with the highest overdue balances, using red/orange badges for urgency.

INNOVATION FEATURE 1 (WhatsApp Bot Showcase): Include a prominent "Smart Communications" panel on the dashboard. Show a visual mockup of a WhatsApp chat bubble where a parent sends "Hi", the bot replies with their due amount, and provides a "Pay via UPI" link.

PAGE 2: Dynamic Fee Engine & Rules

Fee Management: A grid of active school fees. Include a "Create New Fee" button that opens a glass modal to define fee type and amount.

INNOVATION FEATURE 2 (Edu-EMI / Smart Split): Build a dedicated "Payment Plans" section. Create a UI flow where an admin can select a student's massive fee (e.g., ₹60,000) and click a button to instantly divide it into 4 equal monthly micro-installments of ₹15,000.

INNOVATION FEATURE 3 (Automated Waiver Logic): Build a "Waiver Rules Engine" settings card. Add interactive toggle switches for: "Enable First-Time Late Payer Grace Period" and "Enable Strict Penalty for Habitual Defaulters".

PAGE 3: Omnichannel Payments

Create a tabbed interface (Digital vs. Offline).

Digital Tab (UPI): A feed of auto-approved, zero-fee UPI transactions coming in real-time.

Offline Tab (Reconciliation): A workflow table for manual Cash/Cheque entries. Include "Approve" and "Reject" buttons next to each pending offline payment so the admin can reconcile them into the system.

PAGE 4: INNOVATION FEATURE 4 (Staff Directory)

Build a visually stunning grid of "Staff Profile Cards".

Every single card MUST display: The staff member's Avatar, Full Name, Specific Job Role (e.g., Senior Accountant, Bus Coordinator), and an explicit badge highlighting their "Total Experience" (e.g., "10 Years Experience").

Add a "View Profile" button on each card.

PAGE 5: INNOVATION FEATURE 5 (Tamper-Proof Audit Trail)

Design this page to look like a highly secure, immutable ledger to prevent financial fraud.

Include a large lock icon at the top with the title "System Audit Log".

Create a strict, read-only data table with the following columns: Exact Date & Timestamp, Admin User ID, Action Taken (e.g., "Manually Waived ₹500 Late Fee for Student #104", "Deleted Cash Entry"), and IP Address.

4. PROTOTYPE BEHAVIOR

Please make the sidebar tabs clickable so I can navigate between these 5 distinct pages. Ensure the entire layout is fully responsive and feels like a premium, production-ready SaaS product

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://school-sparkle-pay.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/67e09847-7766-4954-bd75-25d54b35d67c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
