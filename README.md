# 🚀 Job Assistant Premium (V01.41)
> **AI-Powered Job Application Assistant with Cloudflare D1 + R2 Storage & Google Gemini 1.5 Flash**

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-UserScript-green.svg)](https://www.tampermonkey.net/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-blue.svg)](https://aistudio.google.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Backend-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![Cloudflare D1 & R2](https://img.shields.io/badge/Storage-Cloudflare%20D1%20%26%20R2-yellow.svg)](https://www.cloudflare.com/)

**Job Assistant Premium** is an intelligent browser extension (Tampermonkey UserScript) designed to automate, personalize, and track your job application process across all major job portals. Powered by **Google Gemini 1.5 Flash AI**, it analyzes Job Descriptions in real-time against your uploaded resume to craft tailored, high-converting **Emails** and **WhatsApp messages**, while automatically tracking all details in a central database and rendering a premium dashboard.

---

## 📖 Table of Contents
1. [🌟 What is Job Assistant Premium?](#-what-is-job-assistant-premium)
2. [🎁 Key Benefits](#-key-benefits)
3. [🛠️ Step-by-Step Installation Guide](#%EF%B8%8F-step-by-step-installation-guide)
   - [Part 1: Installing & Configuring Tampermonkey](#part-1-installing--configuring-tampermonkey)
   - [Part 2: Setting up Your Own Cloudflare Backend (Workers, D1, R2)](#part-2-setting-up-your-own-cloudflare-backend-workers-d1-r2)
4. [🖥️ Application Features & Screenshot Walkthrough](#%EF%B8%8F-application-features--screenshot-walkthrough)
   - [1. Main Job Portal Control Panel](#1-main-job-portal-control-panel)
   - [2. Interactive Resume R2 Uploader & Viewer](#2-interactive-resume-r2-uploader--viewer)
   - [3. Real-Time ATS Score Keyword Matcher](#3-real-time-ats-score-keyword-matcher)
   - [4. AI-Generated Recruiter Email Modal](#4-ai-generated-recruiter-email-modal)
   - [5. AI-Generated WhatsApp Message Modal](#5-ai-generated-whatsapp-message-modal)
   - [6. Dual AI Prompt Customizer & Refiner Chat](#6-dual-ai-prompt-customizer--refiner-chat)
   - [7. Cloudflare D1 Worker Settings Panel](#7-cloudflare-d1-worker-settings-panel)
   - [8. Premium Analytics Dashboard](#8-premium-analytics-dashboard)
5. [🔧 Backend Technical Development](#-backend-technical-development)

---

## 🌟 What is Job Assistant Premium?
It is a dual-tier system consisting of a client-side **UserScript** overlaying major job portals (Naukri, LinkedIn, Indeed, etc.) and a serverless **Cloudflare Worker** acting as your private API server, database, and asset host.

### Who can use this?
* **Modern Job Seekers**: Who want to stand out by messaging HRs immediately after applying.
* **Relationship Managers & Customer Specialists**: The built-in templates are highly optimized for Customer Specialist/Relations domains, although it can be customized for any role.
* **Developers & Tech Professionals**: Looking to self-host their own job application database and resume files.

---

## 🎁 Key Benefits
* **🚀 Increase Response Rates**: Send highly relevant metrics-driven emails/messages to recruiters immediately after applying.
* **📂 100% Data Ownership**: Hosted completely on your personal Cloudflare serverless account. No third-party data collection.
* **📉 Zero Friction**: Double-click tracking automatically saves company name, role, salary, location, job description, custom templates, ATS score, and apply link to your database.
* **🧩 Context-Aware Signatures**: Extends your name, email, phone, and links straight from your parsed resume dynamically.

---

## 🛠️ Step-by-Step Installation Guide

### Part 1: Installing & Configuring Tampermonkey

#### 1. Add Tampermonkey to Your Browser
Install the official **Tampermonkey** browser extension for your browser:
* [Tampermonkey for Chrome / Edge / Brave / Opera](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

#### 2. Create a New UserScript
1. Click the **Tampermonkey icon** in your browser toolbar and select **Create a new script...**
2. In the editor interface, delete all default placeholder code.
3. Open **[`job-assistant-userscript.user.js`](job-assistant-userscript.user.js)** from this repository, copy all of the code, and paste it into the editor.
4. Press **`Ctrl + S`** (or select **File** ➔ **Save**) to save the script.

---

### Part 2: Setting up Your Own Cloudflare Backend (Workers, D1, R2)

To host your own database, custom resume uploads, and the application analytics dashboard:

#### 1. Create a Cloudflare Account
1. Visit **[dash.cloudflare.com](https://dash.cloudflare.com/)** and sign up for a free account.

#### 2. Create your D1 SQL Database
1. In your Cloudflare Dashboard sidebar, navigate to **Workers & Pages** ➔ **D1 SQL Database**.
2. Click **Create Database** ➔ **D1 Database**.
3. Name your database `job-ai-db`.
4. Copy your generated **Database ID** (a long string like `5d6e5a34-b240-463a-a14a-519538fd2fc4`).
5. Open the **Console** tab of your D1 database dashboard and execute the SQL script in [schema.sql](schema.sql) to initialize the tables (`applications` and `user_api_keys`).

#### 3. Create your R2 Storage Bucket
1. Navigate to **R2 Object Storage** in your sidebar.
2. Click **Create Bucket**.
3. Name your bucket `jobassistantpremium`.
4. In bucket settings, enable the **Public R2.dev bucket URL** or bind your custom subdomain to ensure uploaded resumes can be viewed inline in the browser.

#### 4. Configure Wrangler in Your Local Codebase
Open **[`wrangler.jsonc`](wrangler.jsonc)** (or `wrangler.json` / `wrangler.toml`) in your editor and update it to match your database ID:
```json
{
  "name": "job-ai-backend",
  "main": "server.js",
  "compatibility_date": "2024-01-01",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "job-ai-db",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "jobassistantpremium"
    }
  ]
}
```

#### 5. Deploy the Backend Worker
Run these commands in your PowerShell or Bash terminal:
```bash
# Log in to your Cloudflare account
npx wrangler login

# Deploy your worker backend
npx wrangler deploy
```
Once deployed, copy the generated worker endpoint URL (e.g. `https://job-ai-backend.yoursubdomain.workers.dev`).

---

## 🖥️ Application Features & Screenshot Walkthrough

### 1. Main Job Portal Control Panel
When you visit job portal listings (e.g. Naukri or LinkedIn), the Job Assistant floating control panel slides in on the right-hand side. It shows the parsed job title, company, salary, location, email, and phone number extracted in real-time.

![Floating Control Panel](Screenshorts/Screenshot%202026-08-04%20211349.png)

---

### 2. Interactive Resume R2 Uploader & Viewer
Use the **`📤 Upload R2`** button to upload your PDF resume to Cloudflare R2. This replaces standard local links with a globally accessible, fast-loading, public PDF link. Click **`👁️ View R2`** to inspect your uploaded resume inline.

![Resume Storage Panel](Screenshorts/Screenshot%202026-08-04%20211421.png)

---

### 3. Real-Time ATS Score Keyword Matcher
Click **`📊 Check ATS Score`** to run a local scoring check. The extension compares the job requirements with your resume text to compute an ATS score percentage, helping you edit your resume before hitting submit.

![ATS Score Display](Screenshorts/Screenshot%202026-08-04%20211504.png)

---

### 4. AI-Generated Recruiter Email Modal
Click **`✉️ Email`** to generate a personalized recruiter outreach email. The modal displays recruiter email, customizable subject, and the message content.
* Click **`🚀 Send Email`** to open your native email app (`mailto:` link) pre-filled with the AI text, and instantly log the status.
* Click **`🔄 Regenerate AI Email`** to get a new version from Gemini.

![Email Generation Modal](Screenshorts/Screenshot%202026-08-04%20211646.png)

---

### 5. AI-Generated WhatsApp Message Modal
Click **`💬 WhatsApp`** to generate a direct recruiter chat template.
* Click **`🚀 Send WhatsApp Message`** to launch a direct web chat with the recruiter on WhatsApp Web, complete with your preloaded text.

![WhatsApp Modal](Screenshorts/Screenshot%202026-08-04%20211729.png)

---

### 6. Dual AI Prompt Customizer & Refiner Chat
Click **`✏️ AI Prompt`** to modify instructions. Under the hood, you can customize prompt schemas separately for Email and WhatsApp, or type your desired edits in the **Prompt Refiner Chat** to let Gemini auto-adjust templates.

![Prompt Refiner Screen](Screenshorts/Screenshot%202026-08-04%20211802.png)

---

### 7. Cloudflare D1 Worker Settings Panel
Click **`⚙️ Cloudflare DB`** to link your custom Worker backend URL. This registers where the Tampermonkey script sends JSON payloads when saving applications.

![Cloudflare Worker Settings](Screenshorts/Screenshot%202026-08-04%20212039.png)

---

### 8. Premium Analytics Dashboard
Access your custom backend URL `/dashboard?email=your_email@gmail.com` to view a premium metrics dashboard. It includes:
* **Real-time Overview Cards**: Displays Total Applications, Interviewing Count, and Average ATS Score matching your active filters.
* **Flexible Filtering**: Type any search keyword, or use the interactive dropdowns to filter by Roles, Companies, Statuses, Salaries, or Date Ranges.
* **CSV Export**: Click **`📊 Export CSV`** to instantly download your current filtered view as a formatted spreadsheet (with BOM encoded for Excel compatibility).
* **Inline Status Changer**: Double-click or change the dropdown under the "Status" column directly inside the table row to dynamically sync the application status to your Cloudflare database without reloading the page.

![Premium Dashboard Table](Screenshorts/Screenshot%202026-08-04%20212102.png)

---

### 9. Detailed Application Viewer Modal
Click the **👁️ (View)** button in any dashboard row to slide open a detailed application modal. This contains:
* Location, salary, and custom resume file link associated with that specific application.
* **Parsed Recruiter Contacts**: Shows parsed HR emails and phone numbers.
* **Full Job Description**: The captured job description text from the listing portal.
* **Generated Outreach Templates**: Tabs containing the specific Email, WhatsApp, and Cover Letter text generated for that application.

![Details Modal Overview](Screenshorts/Screenshot%202026-08-04%20212126.png)
![Details Modal Templates](Screenshorts/Screenshot%202026-08-04%20212151.png)

---

### 10. Dashboard Analytics & Insights Tab
Click the **`📊 Analytics & Insights`** tab next to the application list to view dynamic data charts:
* **Applications by Portal**: A horizontal bar chart illustrating application counts per portal (Naukri, LinkedIn, Indeed, etc.) alongside their percentage share.
* **Applications by Status**: Distribution of statuses (Applied, Interviewing, Offered, Rejected).
* **Top Roles Applied**: Frequency share of different job titles.

![Dashboard Charts](Screenshorts/Screenshot%202026-08-04%20212245.png)

---

## 💡 How Every Feature Works

### 🚀 1. Apply Job Button (Database Log Engine)
* **How it works**: Clicking the **`🚀 Apply Job`** button on your browser widget triggers an async API call to the `/api/track` endpoint on your Cloudflare Worker.
* **Details captured**:
  * Job Title, Company, and Location.
  * Salary details (e.g. "Not Disclosed" or parsed figures).
  * Direct Job Listing Link.
  * Extracted HR contact email and phone number.
  * The raw text of the Job Description.
  * The calculated ATS match score.
  * The active resume URL hosted on your Cloudflare R2 bucket.
  * Pre-generated fallback cover letters and messaging templates so your database records are always complete.
* **Persistence**: Once saved, the button turns green and displays **`✅ Applied`**. The userscript checks this logged state on page load to prevent duplicate logging.

### ✉️ 2. Email Option (Recruiter Email Extraction)
* **HR Email Extraction**: The script runs pattern matching checks against the job listing page source and the description text, looking for valid email formats and domains (e.g. `hr@company.com`, `careers@...`).
* **Generation**: If found, it matches the JD with your resume text to write a high-converting recruiter email.
* **Outreach**: Clicking **`🚀 Send Email`** launches your local mail client with the recruiter email, subject line, and body pre-filled, while logging the application status in the database.

### 💬 3. WhatsApp Option (Recruiter Phone Number Extraction)
* **HR Phone Number Extraction**: The script parses phone number formats, specifically looking for 10-digit Indian numbers (`+91`, `91`, etc.) or international numbers inside the recruiter's posting details.
* **Outreach**: Generates a brief intro message. Clicking **`🚀 Send WhatsApp Message`** triggers a direct `wa.me/<number>` redirection, launching a WhatsApp chat directly in a new tab without saving the contact.

### 📄 4. Cover Letter Option
* Generates a fully formatted professional cover letter based on your parsed resume skills and the job's key requirements. It outputs your contact header, current date, greeting, intro, core achievements matching the JD, and signature.

### 📤 5. Resume Uploading (Cloudflare R2 Integration)
* Clicking **`📤 Upload R2`** opens a local file selector. The script uploads your resume directly to your Cloudflare R2 bucket using the `/api/upload-resume` Worker endpoint.
* The returned public file URL is then dynamically injected into all your outreach signatures, making it easy for recruiters to open your resume inline.

### 📊 6. ATS Score calculation
* When you click **`📊 Check ATS Score`**, the script runs a local keyword density matcher. It extracts high-value keywords, technologies, and skills from the Job Description and compares them to your resume content to calculate a match percentage.

---

## 🔧 Backend Technical Development

### Running the Backend Locally
To edit, test, or run your Hono backend worker in local dev mode:
```bash
# Install dependencies
npm install

# Start local Wrangler dev server (listens on http://localhost:8787)
npm run dev

# Deploy the code updates live to Cloudflare
npx wrangler deploy
```

### Resetting / Applying Database Updates
To re-run migrations or update schema fields remotely:
```bash
npx wrangler d1 execute job-ai-db --file=./schema.sql --remote
```
