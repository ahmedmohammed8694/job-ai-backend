# 🚀 Job Assistant Premium (V01.13)
> **AI-Powered Job Application Assistant for Naukri, LinkedIn, Indeed, and Major Job Portals**

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-UserScript-green.svg)](https://www.tampermonkey.net/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-blue.svg)](https://aistudio.google.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Backend-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![Cloudflare D1 & R2](https://img.shields.io/badge/Storage-Cloudflare%20D1%20%26%20R2-yellow.svg)](https://www.cloudflare.com/)

**Job Assistant Premium** is an intelligent browser extension (Tampermonkey UserScript) designed to automate, personalize, and track your job application process across all major job portals. Powered by **Google Gemini 1.5 Flash AI**, it analyzes Job Descriptions in real-time against your uploaded resume to craft tailored, high-converting **Emails** and **WhatsApp messages**.

---

## 🌟 Key Features

### 1. 🤖 Gemini 1.5 Flash AI Messaging Engine
- **Custom-Tailored Emails & WhatsApp Messages**: Automatically analyzes Job Descriptions (JDs) and matches them against your candidate profile.
- **High-Converting HR Attraction Paragraphs**: Generates persuasive opening paragraphs and 3–4 bulleted metrics tailored specifically to what recruiters want.
- **Zero-Hardcoding Signature Layout**: Contact details (Name, Phone, Email, LinkedIn, Portfolio) are extracted **strictly from your uploaded resume summary**, leaving missing fields clean and un-cluttered.

### 2. ✉️ & 💬 Interactive Preview & Approval Modals
- **Interactive Email Preview Modal**:
  - Review Recruiter Email, Subject, and Editable AI Content before sending.
  - **`🚀 Send Email`**: Opens `mailto:` and automatically logs application to Cloudflare D1.
  - **`🔄 Regenerate AI Email`**: Ask Gemini to write a fresh new email version live.
  - **`📋 Copy`**: Copy text to clipboard in one click.
- **Interactive WhatsApp Preview Modal**:
  - Review Recruiter Phone Number and Editable AI Message.
  - **`🚀 Send WhatsApp Message`**: Opens `wa.me` in a new tab and logs application status.
  - **`🔄 Regenerate AI Message`**: Generate a new concise WhatsApp message live.

### 3. ✏️ Dual AI Prompt Manager & Gemini Prompt Refiner Chat
- **Dual Prompt Tabs**: Separate, customizable prompt managers for **✉️ Email** and **💬 WhatsApp**.
- **🤖 Ask Gemini to Refine / Generate Prompt**: Type any command (e.g., *"Make it shorter and emphasize sales metrics"*) and Gemini AI will engineer a brand-new prompt template live!
- **Dynamic Placeholders**: Full support for `{RESUME_TEXT}`, `{RESUME_URL}`, `{JOB_TITLE}`, `{COMPANY_NAME}`, `{JOB_DESCRIPTION}`, and `{STYLE_INSTRUCTIONS}`.

### 4. ☁️ Cloudflare R2 Storage & Inline PDF Resume Viewer
- **`📤 Upload R2`**: Upload your PDF or Word resume directly to Cloudflare R2 cloud storage.
- **`👁️ View R2`**: View your active uploaded resume inline in your browser (`Content-Disposition: inline`).

### 5. 📊 ATS Match Score Calculator & Application Logging
- **`📊 Check ATS Score`**: Calculates real-time ATS keyword matching density between your resume and the current job description.
- **Automatic D1 & Sheets Logging**: Logs every job application with timestamp, job title, company, portal, and application status.

### 6. 🌐 Supported Job Portals
- [Naukri.com](https://www.naukri.com)
- [LinkedIn.com](https://www.linkedin.com)
- [Indeed.com](https://www.indeed.com) & Indeed India
- Foundit (Monster India)
- Shine.com
- TimesJobs.com
- Hirist.com
- Instahyre.com

---

## 🛠️ Step-by-Step Installation Guide

### Step 1: Install Tampermonkey Extension
Install the official **Tampermonkey** browser extension for your browser:
- [Tampermonkey for Chrome / Edge / Brave](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

### Step 2: Add the UserScript
1. Click the **Tampermonkey icon** in your browser toolbar ➔ **Create a new script**.
2. Clear any default code in the editor.
3. Open **[`job-assistant-userscript.user.js`](job-assistant-userscript.user.js)**, copy all the code, and paste it into the Tampermonkey editor.
4. Press **`Ctrl + S`** (or File ➔ Save) to save the script.

---

## 🚀 How to Set Up & Use

### 1. 🔑 Set Up Your Free Gemini API Key
1. Click the green link inside the widget or visit **[Google AI Studio](https://aistudio.google.com/apikey)** (Free to get a key).
2. Create and copy your **Gemini API Key**.
3. On any job portal page, click **`🔑 API Key`** on the Job Assistant widget, paste your key, and click **`💾 Save API Key`**.

### 2. 📤 Upload Your Resume to Cloudflare R2
1. On the Job Assistant panel, click **`📤 Upload R2`**.
2. Select your resume file (`.pdf`, `.doc`, or `.docx`).
3. Once uploaded, your custom resume link will automatically be embedded in all AI Emails & WhatsApp signatures! Click **`👁️ View R2`** to verify your uploaded resume inline.

### 3. ✉️ Send Personalised AI Application Emails
1. Navigate to any job listing on Naukri, LinkedIn, Indeed, etc.
2. Click **`✉️ Email`**.
3. The **Email Preview Modal** will open up on your screen.
4. Review or edit the text. If you want a fresh variation, click **`🔄 Regenerate AI Email`**.
5. Click **`🚀 Send Email`** to open your email client and log the application into your database!

### 4. 💬 Send Personalised AI WhatsApp Messages
1. Click **`💬 WhatsApp`** on the panel.
2. The **WhatsApp Preview Modal** will open.
3. Review the recruiter's phone number and message. Click **`🔄 Regenerate AI Message`** if desired.
4. Click **`🚀 Send WhatsApp Message`** to launch WhatsApp Web (`wa.me`)!

### 5. ✏️ Customize or Refine AI Prompts
1. Click **`✏️ AI Prompt`** on the panel.
2. Switch between **✉️ Email Prompt** and **💬 WhatsApp Prompt** tabs.
3. Use the **`🤖 Ask Gemini to Refine / Generate Prompt`** input box to instruct Gemini how to refine your system prompt (*e.g., "Focus heavily on client retention metrics"*).
4. Click **`✨ Generate`** and **`💾 Save Active Prompt`**.

---

## 🔧 Backend Technical Architecture

- **Live Worker Backend**: `https://job-ai-backend.ahmed-mohammed8694.workers.dev`
- **Database**: Cloudflare D1 Database (`job-ai-db`)
- **Object Storage**: Cloudflare R2 Bucket (`jobassistantpremium`)
- **AI Model**: Google Gemini 1.5 Flash (`gemini-1.5-flash`)

### Local Backend Development
```bash
# Clone the repository
git clone https://github.com/ahmedmohammed8694/job-ai-backend.git
cd job-ai-backend

# Install dependencies
npm install

# Run local Wrangler development server
npm run dev

# Deploy updates to Cloudflare Workers
npx wrangler deploy
```

---

## 📄 License & Credits

Created with ❤️ by **Mohammed Ahmed** for modern job seekers.
Developed using Cloudflare Workers, D1, R2, and Google Gemini AI API.