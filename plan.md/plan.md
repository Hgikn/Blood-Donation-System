# Blood Donation System — Implementation Plan

## 1. Project Overview

**Project Name:** Blood Donation System
**Goal:** Build a full-stack web platform that connects blood donors with patients and hospitals. Visitors can search for available donors by blood group and location, and registered donors can manage their availability and donation history.

Each donor will:

- Appear as a card in the donor directory
- Show blood group, location, last donation date, and availability status
- Allow patients/hospitals to send donation requests
- Display donor contact info (with privacy controls)

This project will be built live in front of students, so the implementation must be:

- Easy to explain
- Modular
- Beginner-observable
- Incremental
- Deployable on Vercel Hobby

---

## 2. Core Product Vision

Blood Donation System is not just a donor directory. It should become:

- A life-saving donor-patient connection platform
- A department project example for real-world MERN architecture
- A community health tool for local use
- A teaching example for full-stack development with authentication and role-based access

---

## 3. Technology Stack

We will use the MERN stack, adapted for Vercel Hobby.

**Frontend**
- React
- Next.js (for routing, SSR/SEO, and Vercel deployment)
- Tailwind CSS
- Axios or Fetch API

**Backend**
- Node.js
- Express-style logic via Next.js API routes / Vercel serverless functions

**Database**
- MongoDB Atlas
- Mongoose

**Authentication**
- NextAuth.js or JWT-based custom auth
- Start with JWT + role-based auth for teaching clarity

**File/Image Storage**
- Cloudinary for donor profile photos
- Do not store files inside Vercel filesystem

**Hosting**
- Vercel Hobby plan
- MongoDB Atlas free/shared tier
- Cloudinary free tier

---

## 4. Important Architecture Decision

Because the full project will be hosted on Vercel Hobby, we should not build a traditional always-running Express server.

**Recommended practical approach:**
- Next.js frontend
- API routes / serverless functions for backend logic
- MongoDB Atlas as the database

**Why:**
Vercel Hobby is excellent for frontend hosting, serverless APIs, and small to medium classroom projects. It is not ideal for long-running background workers, heavy file processing, or traditional persistent Express servers.

**Conclusion:** We will follow MERN concepts, but the backend will be implemented in a serverless-friendly Node/Express-style architecture. This keeps the project fully deployable on Vercel, easy for students to understand, and realistic for free-tier constraints.

---

## 5. Development Philosophy

This project will be built while teaching students, so follow these rules:

- Build phase by phase
- Keep each class/demo focused on one visible outcome
- Do not over-engineer early
- Ship an MVP first
- Use clean folder structure from day one
- Add features only after the base flow works
- Prefer simple code over clever code
- Keep backend and frontend responsibilities clearly separated
- Write code that students can read and reproduce
- Deploy early and keep the live link working

---

## 6. Primary User Roles

**1) Visitor**
Can:
- Search donors by blood group, location, and availability
- View donor profiles
- See emergency blood requests
- View how the platform works

**2) Donor**
Can:
- Register/login
- Set up a donor profile
- Set availability status (available / not available)
- View and manage their donation history
- Respond to donation requests

**3) Patient / Requester**
Can:
- Register/login
- Post a blood request with blood group, urgency, location
- Browse and contact available donors
- Mark a request as fulfilled

**4) Admin**
Can:
- Approve or reject donor profiles
- Manage blood requests
- View platform statistics (total donors, requests, donations)
- Manage categories and featured listings

---

## 7. MVP Scope (Must Build First)

**Public Features**
- Home page with search
- Donor search by blood group and location
- Donor profile page
- Blood group filter
- Emergency request listings

**Donor Features**
- Register/login
- Create/edit donor profile
- Set availability toggle
- View received requests

**Patient/Requester Features**
- Register/login
- Post a blood request
- View matched donors
- Contact donor

**Admin Features**
- Admin login
- Approve/reject donor registrations
- Manage blood requests
- View basic stats

**Non-negotiable MVP data per donor:**
- Full name
- Blood group
- Location (city/area)
- Phone number (shown only to logged-in users)
- Last donation date
- Availability status
- Profile photo

---

## 8. Phase-wise Delivery Plan

### Phase 1 — Project Foundation
**Goal:** Create the base code structure and deploy a working shell.

Tasks:
- Initialize Next.js project
- Configure Tailwind CSS
- Set up ESLint / Prettier
- Set up environment variables
- Connect MongoDB Atlas
- Create basic folder structure
- Create reusable layout, navbar, footer
- Deploy first version to Vercel

**Deliverable:** Live deployed skeleton app

---

### Phase 2 — Public Donor Search UI
**Goal:** Visible public browsing experience.

Tasks:
- Home page with hero and search bar
- Donor card component
- Donor listing/search page
- Blood group filter UI
- Donor profile page
- Emergency requests section

**Deliverable:** Visitors can search and browse using static/mock donor data

---

### Phase 3 — Database + Real Data
**Goal:** Replace mock data with MongoDB data.

Tasks:
- Design Mongoose models
- Create seed data with sample donors
- Build API routes for donor listing, search, and details
- Connect frontend pages to real API

**Deliverable:** Donors loaded from database

---

### Phase 4 — Authentication + Donor Registration
**Goal:** Allow donors to register and manage profiles.

Tasks:
- Register/login flow
- Role support (donor, patient, admin)
- Protected routes
- Create/edit donor profile form
- Availability toggle
- Donor dashboard

**Deliverable:** Donors can register and manage their profiles

---

### Phase 5 — Blood Request System
**Goal:** Allow patients to post and manage blood requests.

Tasks:
- Blood request form (blood group, urgency level, location, message)
- Request listing page
- Donor notification of matching requests
- Requester dashboard
- Mark request as fulfilled

**Deliverable:** Patients can post requests and contact donors

---

### Phase 6 — Admin Panel
**Goal:** Moderation and oversight workflow.

Tasks:
- Admin dashboard
- Pending donor approvals
- Active blood requests overview
- Approve/reject donor profiles
- Archive or close requests
- Basic platform statistics

**Deliverable:** Admin can control platform content

---

### Phase 7 — Polish + Stability
**Goal:** Improve usability and presentation.

Tasks:
- Better loading states
- Empty states (no donors found, no active requests)
- Error handling
- Responsive design fixes
- Image optimization
- Basic SEO metadata
- Urgency badge styling

**Deliverable:** Clean public release suitable for demonstration

---

## 9. Optional Phase 2+ Features

Add only after the MVP is stable:

- SMS or email notification to donors on new request match
- Donation history tracking per donor
- Badge system (10 donations = Gold Donor, etc.)
- Hospital registration and verified hospital badge
- Area/district based donor map
- Blood bank directory
- Urgency levels with color coding (critical, moderate, planned)
- Donor leaderboard
- Request expiry system
- Donor health tips and eligibility info

---

## 10. Recommended Folder Structure

```
blood-donation-system/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  │  ├─ page.tsx                    # home
│  │  │  ├─ donors/
│  │  │  │  ├─ page.tsx                 # donor search page
│  │  │  │  └─ [username]/page.tsx      # donor profile
│  │  │  ├─ requests/
│  │  │  │  ├─ page.tsx                 # blood requests listing
│  │  │  │  └─ [id]/page.tsx            # request details
│  │  ├─ dashboard/
│  │  │  ├─ page.tsx
│  │  │  ├─ profile/
│  │  │  ├─ requests/
│  │  │  └─ history/
│  │  ├─ admin/
│  │  │  ├─ page.tsx
│  │  │  ├─ donors/
│  │  │  └─ requests/
│  │  ├─ api/
│  │  │  ├─ auth/
│  │  │  ├─ donors/
│  │  │  ├─ requests/
│  │  │  ├─ users/
│  │  │  └─ admin/
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ ui/
│  │  ├─ cards/
│  │  ├─ forms/
│  │  └─ sections/
│  ├─ lib/
│  │  ├─ db.ts
│  │  ├─ auth.ts
│  │  ├─ validators.ts
│  │  └─ utils.ts
│  ├─ models/
│  │  ├─ User.ts
│  │  ├─ Donor.ts
│  │  ├─ BloodRequest.ts
│  │  └─ Donation.ts
│  ├─ services/
│  ├─ hooks/
│  ├─ types/
│  └─ constants/
├─ .env.local
├─ package.json
└─ README.md
```

---

## 11. Core Data Models

**User**
```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "role": "donor | patient | admin",
  "phone": "string",
  "profileImage": "string",
  "location": { "city": "string", "area": "string" },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Donor**
```json
{
  "user": "ref:User",
  "bloodGroup": "A+ | A- | B+ | B- | AB+ | AB- | O+ | O-",
  "isAvailable": "boolean",
  "lastDonationDate": "Date",
  "totalDonations": "number",
  "weight": "number",
  "age": "number",
  "medicalConditions": "string",
  "isApproved": "boolean",
  "approvedBy": "ref:User",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**BloodRequest**
```json
{
  "requester": "ref:User",
  "patientName": "string",
  "bloodGroup": "string",
  "unitsNeeded": "number",
  "urgencyLevel": "critical | moderate | planned",
  "hospital": "string",
  "location": { "city": "string", "area": "string" },
  "contactPhone": "string",
  "message": "string",
  "status": "open | fulfilled | closed | expired",
  "fulfilledBy": "ref:User",
  "expiresAt": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Donation**
```json
{
  "donor": "ref:User",
  "request": "ref:BloodRequest",
  "donationDate": "Date",
  "notes": "string",
  "createdAt": "Date"
}
```

---

## 12. Minimum API Plan

**Public APIs**
```
GET  /api/donors                     # search/list donors
GET  /api/donors/[username]          # donor profile
GET  /api/requests                   # active blood requests
GET  /api/requests/[id]              # request details
```

**Donor/Patient APIs**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/me
PATCH  /api/me
POST   /api/donors                   # create donor profile
PATCH  /api/donors/[id]              # update donor profile
PATCH  /api/donors/[id]/availability # toggle availability
POST   /api/requests                 # create blood request
PATCH  /api/requests/[id]            # update request
PATCH  /api/requests/[id]/fulfill    # mark as fulfilled
```

**Admin APIs**
```
GET    /api/admin/donors?status=pending
PATCH  /api/admin/donors/[id]/approve
PATCH  /api/admin/donors/[id]/reject
GET    /api/admin/requests
PATCH  /api/admin/requests/[id]/close
GET    /api/admin/stats
```

---

## 13. Key Pages to Build

**Public**
- Home (hero, search, blood group filter, emergency requests)
- Donor Search / Directory
- Donor Profile
- Blood Request Listing
- Blood Request Details

**Donor / Patient**
- Login / Register
- Dashboard
- Create/Edit Donor Profile
- Post Blood Request
- Donation History

**Admin**
- Admin Dashboard
- Pending Donor Approvals
- Active Blood Requests
- Platform Statistics

---

## 14. Home Page Section Plan

Recommended sections:

1. Hero section with emergency search bar (search by blood group + city)
2. Blood group quick-select buttons
3. Active emergency requests (critical urgency)
4. Featured/available donors near you
5. How it works (3-step explainer)
6. Platform statistics (total donors, total donations, lives saved)
7. Call to action: Register as a donor

Keep the home page simple in the first version.

---

## 15. Donor Card Content

Each donor card should show:

- Profile photo
- Full name
- Blood group badge (colored by type)
- City / area
- Availability status (green = available, gray = not available)
- Last donation date
- Total donations count
- "View Profile" button
- "Request Donation" button (for logged-in users)

Optional later:
- Verified donor badge
- Donation streak badge
- Response rate

---

## 16. Blood Request Card Content

Each blood request card should show:

- Patient name
- Blood group needed (bold, highlighted)
- Units needed
- Urgency badge (Critical / Moderate / Planned)
- Hospital name
- Location (city/area)
- Posted time
- Contact button (for logged-in users)
- Expires in countdown (optional)

---

## 17. Donation Request Workflow

**Patient flow:**
1. Patient registers or logs in
2. Patient fills blood request form
3. Request becomes public and visible to matching donors
4. Matching donors are notified (or can browse requests)
5. Donor responds and contacts patient
6. Patient marks request as fulfilled

**Admin review checks:**
- Blood group is valid
- Contact info is present
- Location is specified
- Request is not a duplicate

---

## 18. Validation Rules

Every donor profile submission should validate:

- Full name required
- Blood group required (from allowed list)
- Phone number required and valid format
- City/area required
- Age must be between 18 and 65
- Weight must be at least 50 kg
- Last donation date must be at least 3 months ago for availability

Every blood request should validate:

- Patient name required
- Blood group required
- Units needed (minimum 1)
- Hospital name required
- Location required
- Contact phone required
- Urgency level required

---

## 19. Security Rules

Must implement:

- Password hashing with bcrypt
- JWT/session protection
- Role-based access control
- Input validation with Zod or Joi
- Phone number shown only to authenticated users
- Sanitization for text fields
- Rate limiting on auth and submission routes
- Safe external links with `rel="noopener noreferrer"`

Do not trust client-side validation alone.

---

## 20. Database and Hosting Notes

**MongoDB Atlas**
Use Atlas because Vercel serverless works well with it.

**Vercel notes**
Because Vercel serverless functions are stateless:
- Use a reusable DB connection helper
- Keep API handlers lightweight
- Avoid heavy processing inside API routes

**File uploads**
Do not upload files directly into Vercel runtime. Use:
- Cloudinary upload widget, or
- Client-to-Cloudinary direct upload flow

---

## 21. Environment Variables

```env
MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_APP_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

If using NextAuth:
```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

---

## 22. Teaching-Friendly Build Order

Because this will be shown to students, follow this order:

**Class/Demo 1**
- Explain product idea and real-world impact
- Create Next.js app
- Set up Tailwind
- Build navbar, footer, and home skeleton

**Class/Demo 2**
- Create donor card component
- Build donor search page using mock data

**Class/Demo 3**
- Build donor profile page with dynamic route
- Build blood request card and listing page

**Class/Demo 4**
- Set up MongoDB Atlas and Mongoose
- Fetch real donor and request data from database

**Class/Demo 5**
- Create register/login flow
- Implement role-based access

**Class/Demo 6**
- Build donor profile creation form
- Build blood request submission form

**Class/Demo 7**
- Create admin approval workflow for donors
- Admin blood request management

**Class/Demo 8**
- Polish UI, deploy, and explain production concerns

This sequence ensures students see visible, meaningful progress every session.

---

## 23. UI/UX Guidance

The visual style should feel trustworthy, urgent, and clean.

Recommended direction:
- Red as the primary accent color (blood/health association)
- Clean white/light gray backgrounds
- Clear typography hierarchy
- Bold blood group badges with distinct colors per type
- Urgency indicators: red for critical, yellow for moderate, green for planned
- Responsive card grid layout
- Availability toggle that is easy to spot

Do not try to make it overly fancy in the first version. Focus on clarity, reusability, and readability.

---

## 24. Performance Guidance

Since this is on Vercel Hobby, optimize from the start:

- Use Next.js Image for donor photos
- Compress profile images via Cloudinary
- Paginate donor listings if count grows
- Prefer server rendering for public pages
- Cache public donor and request reads where practical
- Keep bundle size under control

---

## 25. SEO and Discoverability

Basic SEO should be included even in MVP:

- Proper page titles (e.g., "O+ Donors in Dhaka — Blood Donation System")
- Meta descriptions
- Open Graph image support
- Blood group and location in page URLs
- Search-engine-friendly public pages

---

## 26. Things to Avoid Early

Do not build these in the first version:

- Real-time notifications
- In-app messaging/chat
- Complex analytics dashboard
- Payment or subscription system
- Hospital verification system
- Mobile app
- Microservices

The first goal is a working, reliable donor-patient connection platform.

---

## 27. Suggested Git Workflow

Use clean, small commits so students can follow the evolution.

**Example branches:**
```
main
dev
feature/homepage
feature/donor-search
feature/donor-profile
feature/blood-request
feature/auth
feature/donor-registration
feature/admin-panel
```

**Commit style:**
```
feat: add home page hero section
feat: build donor card component
feat: connect mongodb atlas
feat: add blood request submission form
fix: handle missing donor profile photo
```

---

## 28. Launch Checklist

Before public release:

- [ ] App deployed on Vercel
- [ ] MongoDB connection stable
- [ ] Auth works (register, login, logout)
- [ ] Donor registration works
- [ ] Blood request submission works
- [ ] Admin approval works
- [ ] Public donor search works
- [ ] Mobile view is usable
- [ ] Phone numbers hidden from non-logged-in users
- [ ] Error states are handled
- [ ] Required metadata is present

---

## 29. Immediate Execution Plan

Start with the following exact order:

1. Initialize project with Next.js + Tailwind
2. Set up folder structure
3. Build public UI using static mock data
4. Create reusable donor card and donor profile page
5. Connect MongoDB Atlas
6. Create Mongoose models
7. Replace mock data with API-driven data
8. Add authentication and role support
9. Add donor registration and profile flow
10. Add blood request submission flow
11. Add admin review flow
12. Polish and deploy

---

## 30. Final Direction for Cursor

When implementing this project, Cursor should follow these rules:

- Respect Vercel Hobby limitations
- Use Next.js + MongoDB Atlas + serverless API routes
- Keep code modular and beginner-readable
- Prioritize MVP over advanced features
- Avoid unnecessary dependencies
- Use clean reusable components
- Implement features in the planned order
- Prefer small, safe diffs
- Do not redesign the architecture without strong reason
- Keep the project demo-friendly and classroom-friendly

---

## 31. Recommended Next Step

After this plan, the next document to create should be:

**`agent.md` or `cursor-rules.md`**

That file should define:
- Coding rules
- Folder discipline
- Naming conventions
- API design conventions
- UI consistency rules
- Deployment constraints
- "Do not over-engineer" principles

---

## 32. Summary

Blood Donation System should be built as a **teaching-first, impact-ready, Vercel-friendly MERN platform** for connecting donors and patients.

The correct strategy is:
- Keep architecture simple
- Build in phases
- Use serverless-friendly backend patterns
- Start with strong public search and donor registration
- Add request posting and admin moderation
- Polish only after the main flow works

This will make the project:
- Practical for students
- Affordable on free tiers
- Easy to deploy
- Easy to explain in class
- Genuinely useful as a real community health tool
