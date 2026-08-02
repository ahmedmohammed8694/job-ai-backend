// ==UserScript==
// @name         Job Assistant Premium Naukri & LinkedIn V01.04
// @namespace    http://tampermonkey.net/
// @version      01.04
// @description  Stable UI + LinkedIn Shadow DOM isolation fix. All functions preserved.
// @author       Mohammed Ahmed
// @match        *://*.naukri.com/*
// @match        *://*.linkedin.com/*
// @match        *://*.indeed.com/*
// @match        *://*.indeed.co.in/*
// @match        *://*.foundit.in/*
// @match        *://*.monsterindia.com/*
// @match        *://*.shine.com/*
// @match        *://*.timesjobs.com/*
// @match        *://*.hirist.com/*
// @match        *://*.instahyre.com/*
// @match        *://*.glassdoor.com/*
// @match        *://*.internshala.com/*
// @match        *://*.glassdoor.co.in/*
// @match        *://*.wellfound.com/*
// @match        *://*.michaelpage.co.th/*
// @connect      job-ai-backend.ahmed-mohammed8694.workers.dev
// @connect      script.google.com
// @connect      script.googleusercontent.com
// @connect      linkedin.com
// @connect      www.linkedin.com
// @connect      generativelanguage.googleapis.com
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    const WORKER_URL = "https://job-ai-backend.ahmed-mohammed8694.workers.dev";
    const SHEET_URL = "https://script.google.com/macros/s/AKfycbzXY-3b4OrJnYzfq3W9AVnBP9oc9pzQaaCZdI1ysTUk-635jQrrXpnQPXjRq53eKitO/exec";
    const DASHBOARD_URL = SHEET_URL + "?view=dashboard";
    const STATS_URL = SHEET_URL + "?view=stats";
    const RESUME_LINK = "https://drive.google.com/file/d/1SHDFALAim2uSemURa-PQ8K7IoTPMf0U3/view";

    const PROFILE = {
        name: "Mohammed Ahmed",
        phone: "+918686871994",
        email: "Ahmed.mohammed8694@gmail.com",
        experience: "8 Years",
        resume: "https://drive.google.com/file/d/1SHDFALAim2uSemURa-PQ8K7IoTPMf0U3/view",
        linkedin: "https://linkedin.com/in/ma8694",
        portfolio: "https://ahmedmohammed8694.wixsite.com/myportfolio"
    };

    const RESUME_TEXT = `
MOHAMMED AHMED
Hyderabad, Telangana 500048, India | anmed.mohammed8694@gmail.com | 8686871994

Profile
Proactive Client Relationship Specialist with master's degree in Computer Application. Strong interpersonal and effective time management.
Communicate with clients using superior written and verbal communication skills. Interact effectively with clients, managers and associates.
Proactive and positive attitude, using tact and diplomacy. Dedicated to understanding and meeting needs of clients.

PROFESSIONAL EXPERIENCE
Client Relationship Specialist, Domestic, Iamneo.ai, Coimbatore
Led end-to-end delivery of IT upskilling and assessment programs for enterprise and academic partners across India, shortening delivery timelines by 20%.
Coordinated product, content, and operations teams to enforce milestone-driven schedules and ensure consistent on-time execution.
Redesigned learner onboarding and engagement workflows to raise completion rates and improve reporting accuracy for stakeholders.
Produced data-driven progress reports and recommendations to increase client transparency and confidence in program outcomes.
Implemented standardized project tracking and documentation practices to reduce handoff errors and accelerate issue resolution.

Relationship Manager, International, Turito Inc., Hyderabad
Managed an international EdTech client portfolio, delivering 97% client satisfaction and 95% retention through consultative account management and rapid issue resolution.
Designed and implemented CRM workflow automations (templates, triggers, pipelines) that cut manual follow-ups and improved communication efficiency by 95%.
Analyzed client usage and feedback to prioritize product improvements and surface upsell opportunities.
Owned strategic engagement plans and regular business reviews to align on objectives and deepen partnerships.

Senior Student Account Manager, International, Vedantu Innovations Pvt. Ltd, Hyderabad
Managed a portfolio of 300+ active student accounts, tracking engagement and performance to drive learning outcomes.
Raised account renewal rates to 95% through personalized mentoring, targeted retention interventions, and proactive follow-ups.
Built KPI dashboards in Excel and Google Sheets to streamline reporting, surface at-risk accounts, and inform retention strategies.
Collaborated with academic, content, and tech teams to resolve delivery issues and improve the overall student experience.

Web Aggregator, Domestic, Destination Insurance Web Aggregators Pvt. Ltd, Hyderabad
Provided consultative customer support on insurance products, consistently achieving strong satisfaction scores.
Advised clients on plan selection, coverage details, and claims procedures to reduce escalations and improve outcomes.
Conducted market research and proposed service improvements that enhanced process efficiency and client experience.

Customer Care Executive, Domestic, Tata Business Support Services Pvt. Ltd, Hyderabad
Delivered technical and billing support, resolving 90% of issues on first contact while meeting SLAs.
Created process documentation and knowledge articles that improved team efficiency and reduced onboarding time.
Contributed to continuous improvement initiatives to enhance service quality and compliance.

EDUCATION
Deccan College of Engineering & Technology, Hyderabad, Hyderabad
Anwar-ul-Uloom Degree College, Hyderabad, Hyderabad

CERTIFICATIONS
Python Fundamentals, Online
Google Analytics Certification, Online
Reveal 11: Accelerator, Online
Reveal Reviewer Certification, Online
Reveal Data Processing Certification, Online

TECHNICAL & PROFESSIONAL SKILLS
Technical support expertise, Marketing strategy, Client needs assessment
CRM Tools & Ticketing Systems, Stakeholder Management, Customer relations
Insurance Understanding, Schedule management, Proficient in Freshdesk
Client Onboarding & Activation, Customer service excellence
Customer relationship management, Analytical & Process-Oriented Approach
Client Communication & Relationship Building, MS Office
Product Adoption & Engagement, Windows Troubleshooting
`.trim();

    // ── GEMINI AI CONFIG ──
    // Get a free key at https://aistudio.google.com/apikey then run once in console:
    //   GM_setValue('geminiApiKey','YOUR_KEY_HERE')
    // Or just paste it below between the quotes.
    const GEMINI_MODEL = "gemini-flash-latest";
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    function getGeminiApiKey() {
        try {
            const stored = typeof GM_getValue === "function" ? GM_getValue("geminiApiKey", "") : "";
            return stored || "";
        } catch (e) { return ""; }
    }

    // Calls Gemini with the JD + resume, asking it to write a tailored email or WhatsApp message.
    // Re-scrapes the JD fresh every single call — no caching — so each job gets its own analysis.
    // onDone(text, usedFallback) — usedFallback=true means Gemini failed and we returned the static template.
    function generateAiMessage(info, type, onDone) {
        // Force a fresh scrape right now — don't trust info.jdText, it may be stale from an earlier click
        // (LinkedIn's SPA can leave the URL/DOM signature unchanged briefly when switching jobs in the list).
        const freshJd = cleanStructuredText(extractJobDescriptionText() || info.jdText || info.jobDescription || "").slice(0, 6000);
        const freshTitle = extractJobRole() || info.title || "N/A";
        const freshCompany = extractCompanyNameFromPage() || info.company || "N/A";

        console.log("[Job Assistant][Gemini] Generating", type, "for:", freshTitle, "@", freshCompany, "| JD length:", freshJd.length);
        if (freshJd.length < 100) {
            console.warn("[Job Assistant][Gemini] JD extraction looks too short/empty — the AI message may not be well-tailored for this job. Try scrolling the JD into view before clicking.");
        }

        const apiKey = getGeminiApiKey();
        const infoForFallback = Object.assign({}, info, { title: freshTitle, company: freshCompany, jdText: freshJd, jobDescription: freshJd });
        const staticFallback = type === "email" ? emailBody(infoForFallback) : waBody(infoForFallback);
        if (!apiKey) {
            console.warn("[Job Assistant] No Gemini API key set — using static template. Run GM_setValue('geminiApiKey','...') once, or paste your key into GEMINI_API_KEY in the script.");
            onDone(staticFallback, true);
            return;
        }

        const styleNote = type === "email"
            ? "Write it as a formal application EMAIL (no subject line, just the body). 180-260 words."
            : "Write it as a short, friendly WHATSAPP message. Under 120 words, no markdown formatting, plain text only.";

        const prompt = `You are helping a candidate named Mohammed Ahmed write a personalized job application message.

CANDIDATE RESUME:
${RESUME_TEXT}

JOB TITLE: ${freshTitle}
COMPANY: ${freshCompany}

JOB DESCRIPTION:
${freshJd || "(not available — write a generic but strong message based on the job title and company alone)"}

TASK: Analyze THIS SPECIFIC job description against the resume. Pick the 3-4 most relevant achievements/skills from the resume that best match what THIS job is asking for, and write a compelling, tailored application message. Do not write a generic message — reference specifics from the job description above wherever possible.

${styleNote}

Rules:
- Address it "Dear Hiring Manager,"
- Do NOT invent facts not present in the resume.
- End with: Mohammed Ahmed, ${PROFILE.phone}
- Include these links on their own lines before the sign-off: LinkedIn: ${PROFILE.linkedin} | Portfolio: ${PROFILE.portfolio} | Resume: ${PROFILE.resume}
- Return ONLY the message text, no preamble, no explanation, no markdown code fences.`;

        GM_xmlhttpRequest({
            method: "POST",
            url: GEMINI_API_URL,
            headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
            anonymous: true,
            data: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 700 }
            }),
            onload: function (response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.candidates && data.candidates[0] && data.candidates[0].content
                    && data.candidates[0].content.parts && data.candidates[0].content.parts[0]
                    ? String(data.candidates[0].content.parts[0].text || "").trim() : "";
                if (text) {
                    console.log("[Job Assistant][Gemini] Generated fresh", type, "message (", text.length, "chars ) for", freshTitle);
                    onDone(text, false);
                } else {
                    console.error("[Job Assistant] Gemini returned no usable text, falling back to template.", data);
                    onDone(staticFallback, true);
                }
            },
            onerror: function (err) {
                console.error("[Job Assistant] Gemini API call failed, falling back to template.", err);
                onDone(staticFallback, true);
            }
        });
    }

    const STOP_WORDS = new Set([
        "a", "an", "the", "and", "or", "but", "with", "without", "to", "of", "for", "from", "in", "on", "at",
        "by", "as", "is", "are", "was", "were", "be", "been", "being", "this", "that", "these", "those",
        "it", "its", "you", "your", "we", "our", "they", "their", "he", "she", "his", "her", "them", "us",
        "will", "shall", "can", "could", "would", "should", "may", "might", "must", "do", "does", "did",
        "not", "no", "yes", "about", "into", "over", "under", "more", "most", "less", "least", "than", "then",
        "if", "when", "while", "where", "what", "which", "who", "whom", "why", "how", "also", "such",
        "role", "job", "position", "work", "working", "apply", "responsible", "responsibilities", "requirement",
        "requirements", "skills", "skill", "experience", "years", "year", "day", "days", "month", "months"
    ]);

    const ATS_TARGET_KEYWORDS = [
        { label: "Relationship Management", pattern: /\b(?:relationship management|client relationship management)\b/i },
        { label: "CRM", pattern: /\b(?:crm|customer relationship management)\b/i },
        { label: "SaaS", pattern: /\b(?:saas|software as a service)\b/i },
        { label: "Program Delivery", pattern: /\b(?:program delivery|programme delivery)\b/i },
        { label: "Project Management", pattern: /\b(?:project management|project manager)\b/i },
        { label: "EdTech", pattern: /\b(?:edtech|education technology|educational technology)\b/i },
        { label: "Stakeholder Management", pattern: /\b(?:stakeholder management|stakeholder engagement)\b/i },
        { label: "Customer Excellence", pattern: /\b(?:customer excellence|customer success|customer service excellence)\b/i },
        { label: "MCA", pattern: /\b(?:mca|master of computer applications)\b/i },
        { label: "SQL", pattern: /\bsql\b/i },
        { label: "Python", pattern: /\bpython\b/i }
    ];

    const EMAIL_BLOCKLIST = ["support@naukri.com", "noreply@", "sentry@", "example.com", "notifications@naukri.com"];

    const STATE = {
        panel: null, shadowRoot: null, jobInfoDiv: null, atsCounter: null, logBtn: null,
        logBtnDefaultText: "", currentJob: null, currentSignature: "", lastAtsScore: null,
        totalAppliedCount: null, isRefreshingCounter: false, observerInstalled: false,
        lastRecruiterContact: null, currentJobAlreadyLogged: false, currentLoggedLookupKey: "",
        loggedLookupPendingKey: "", startupRetryCount: 0, lastObservedJdText: "",
        pendingLogRequests: Object.create(null)
    };

    // ── SHADOW DOM CSS (isolated from LinkedIn completely) ──
    const SHADOW_CSS = `
        :host { all: initial; }
        * { box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        #panel {
            position: fixed; bottom: 20px; left: 20px; width: 260px;
            font-size: 11px; color: #fff; border-radius: 16px; z-index: 2147483647;
            overflow: hidden; background: #0a0f1e;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 25px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
            display: block; visibility: visible; opacity: 1;
        }
        #hdr {
            padding: 10px 12px; display: flex; justify-content: space-between;
            align-items: center; cursor: move;
            background: linear-gradient(90deg, rgba(37,99,235,0.9), rgba(29,78,216,0.9));
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        #hdr strong { font-size: 11px; letter-spacing: 0.2px; color: #fff; }
        #hdr .hdr-btns { display: flex; gap: 10px; }
        #hdr .hdr-btns span { cursor: pointer; opacity: 0.8; font-size: 13px; color: #fff; }
        #hdr .hdr-btns span:hover { opacity: 1; }
        #panelBody { padding: 12px; }
        #jobInfo {
            font-size: 11.5px; line-height: 1.5; margin-bottom: 12px; padding: 10px;
            background: rgba(255,255,255,0.03); border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.06); color: #fff;
        }
        #jobInfo div { margin-bottom: 2px; }
        #jobInfo strong { color: #fff; }
        #atsLine { padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); font-weight: bold; color: #a78bfa; }
        .section { margin-bottom: 14px; }
        .section-label {
            font-weight: 700; margin-bottom: 6px; font-size: 9px;
            text-transform: uppercase; letter-spacing: 1px;
        }
        .s1-label { color: #67e8f9; }
        .s2-label { color: #c084fc; }
        .s3-label { color: #60a5fa; }
        .btn-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .gbtn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 8px; color: #e2e8f0; padding: 8px 4px;
            cursor: pointer; font-size: 10.5px; font-weight: 500;
            flex: 1 1 48%; display: flex; align-items: center;
            justify-content: center; white-space: nowrap;
            transition: all 0.2s ease; outline: none;
            font-family: 'Inter', system-ui, sans-serif;
        }
        .gbtn:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); border-color: rgba(255,255,255,0.2); }
        .gbtn-full { flex: 1 1 100%; margin-top: 2px; }
        #atsCounter { padding-top: 4px; font-size: 9.5px; color: #a78bfa; text-align: center; opacity: 0.8; }
        #bubble {
            position: fixed; bottom: 20px; left: 20px; width: 56px; height: 56px;
            border-radius: 50%; display: none; cursor: pointer; z-index: 2147483647;
            background: radial-gradient(circle at top left, #60a5fa, #1e40af);
            box-shadow: 0 0 25px rgba(59,130,246,.9), inset 0 0 10px rgba(255,255,255,.4);
            align-items: center; justify-content: center; font-size: 22px;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 18px rgba(59,130,246,.6); }
            50% { box-shadow: 0 0 30px rgba(59,130,246,1); }
            100% { box-shadow: 0 0 18px rgba(59,130,246,.6); }
        }
    `;

    function parseJsonSafe(t) { try { return JSON.parse(t); } catch (e) { return null; } }
    function clampScore(v) { return Math.max(0, Math.min(100, Math.round(v))); }
    function cleanDisplayText(t) { return String(t == null ? "" : t).replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim(); }

    function stripJsonNoise(text) {
        return String(text || "")
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/\{[\s\S]{0,500}?"@context"[\s\S]{0,2500}?\}/gi, " ")
            .replace(/```[\s\S]*?```/g, " ");
    }

    function cleanStructuredText(text) {
        const lines = stripJsonNoise(String(text || "")).replace(/\r/g, "\n").split("\n")
            .map(l => l.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim())
            .filter(l => l && l.length > 1 && !/^(home|about|jobs|careers|login|sign in|sign up|privacy|terms|cookies)$/i.test(l));
        const out = [];
        for (const l of lines) { if (l === "" && out[out.length - 1] === "") continue; out.push(l); }
        return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    }

    function sanitizeJobDescriptionText(text) {
        return stripJsonNoise(String(text || ""))
            .replace(/\r\n?/g, "\n").replace(/&nbsp;/gi, " ").replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/(p|div|li|ul|ol|section|article|h[1-6])>/gi, "\n")
            .replace(/<[^>]+>/g, " ").replace(/[ \t]+/g, " ")
            .split("\n").map(l => l.trim()).filter(l => l.length > 1)
            .join("\n").replace(/\n{3,}/g, "\n\n").trim();
    }

    function getPortalName() {
        const h = location.hostname.replace(/^www\./i, "").toLowerCase();
        if (h.includes("linkedin")) return "LinkedIn";
        if (h.includes("naukri")) return "Naukri";
        if (h.includes("indeed")) return "Indeed";
        if (h.includes("foundit")) return "Foundit";
        if (h.includes("monster")) return "Monster India";
        if (h.includes("shine")) return "Shine";
        if (h.includes("timesjobs")) return "TimesJobs";
        if (h.includes("hirist")) return "Hirist";
        if (h.includes("glassdoor")) return "Glassdoor";
        if (h.includes("wellfound")) return "Wellfound";
        return h.split(".")[0].replace(/^\w/, c => c.toUpperCase());
    }
    function isLinkedInPortal() { return location.hostname.includes("linkedin.com"); }
    function isNaukriPortal() { return location.hostname.includes("naukri.com"); }

    function getCleanBodyClone() {
        if (!document.body) return null;
        const clone = document.body.cloneNode(true);
        ["job-assistant-host", "recruiter-modal"].forEach(id => { const n = clone.querySelector("#" + id); if (n) n.remove(); });
        clone.querySelectorAll("script,style,noscript,iframe,svg,header,footer,nav,aside").forEach(n => n.remove());
        return clone;
    }
    function getPageTextWithoutAssistant(pL) {
        const clone = getCleanBodyClone();
        const src = clone ? (pL ? (clone.innerHTML || "") : (clone.innerText || "")) : (pL ? (document.body?.innerHTML || "") : (document.body?.innerText || ""));
        return pL ? sanitizeJobDescriptionText(src) : cleanStructuredText(src);
    }
    function getPageHtmlWithoutAssistant() {
        const c = getCleanBodyClone();
        return c ? (c.innerHTML || "") : (document.body?.innerHTML || "");
    }

    function getJobDescriptionSelectors() {
        if (isLinkedInPortal()) return [
            ".jobs-search__job-details [data-job-description]",
            ".jobs-search__job-details .jobs-box__html-content",
            ".jobs-search__job-details .jobs-description-content__text",
            ".scaffold-layout__detail .jobs-box__html-content",
            ".scaffold-layout__detail .jobs-description-content__text",
            ".job-view-layout .jobs-box__html-content",
            ".jobs-description-content__text", ".jobs-box__html-content",
            ".jobs-description__content", "[data-job-description]"
        ];
        if (isNaukriPortal()) return [
            ".styles_JDC__dang-inner-html__", ".job-desc", ".jd-container",
            ".job-desc-container", "[class*='dang-inner-html']", "[class*='job-desc']"
        ];
        return [".job-desc", ".jd-container", ".jobs-description-content__text", "article", "main"];
    }

    function extractPlainNodeText(node, pL) {
        if (!node) return "";
        const clone = node.cloneNode(true);
        clone.querySelectorAll("script,style,noscript,iframe,svg,form,button").forEach(c => c.remove());
        const src = pL ? (clone.innerHTML || "") : (clone.innerText || clone.textContent || "");
        return pL ? sanitizeJobDescriptionText(src) : cleanStructuredText(src);
    }

    function scoreJdCandidate(text) {
        const s = String(text || ""), lo = s.toLowerCase();
        let score = Math.min(12, Math.floor(s.length / 180));
        ["responsibilities", "requirements", "qualification", "about the job", "job description", "skills", "experience"]
            .forEach(t => { if (lo.includes(t)) score += 8; });
        if (/\b(?:sql|python|crm|saas|stakeholder|project management|edtech)\b/i.test(s)) score += 10;
        if (s.split(/\n/).length > 8) score += 6;
        return score;
    }

    function countAtsHits(text) {
        const src = cleanStructuredText(text || "");
        return ATS_TARGET_KEYWORDS.reduce((c, k) => c + (k.pattern.test(src) ? 1 : 0), 0);
    }

    function extractJobDescriptionText() {
        const sels = getJobDescriptionSelectors();
        const seen = new Set(); let best = null;
        sels.forEach((sel, idx) => {
            document.querySelectorAll(sel).forEach(node => {
                const t = extractPlainNodeText(node, true);
                const n = cleanStructuredText(t);
                if (!n || n.length < 80) return;
                const fp = n.slice(0, 420);
                if (seen.has(fp)) return;
                seen.add(fp);
                const hits = countAtsHits(n);
                const score = scoreJdCandidate(n) + (hits * 12) + (idx < 6 ? 30 : 0);
                if (!best || score > best.score || (score === best.score && n.length > best.text.length))
                    best = { text: n, score, hits };
            });
        });
        if (best && (best.hits > 0 || best.score >= 35)) { STATE.lastObservedJdText = best.text; return best.text; }
        const fallback = sanitizeJobDescriptionText(getPageTextWithoutAssistant(true));
        if (fallback && fallback.length > 80) { STATE.lastObservedJdText = fallback; return fallback; }
        return STATE.lastObservedJdText || "";
    }

    function extractFromJsonLd(key) {
        try {
            for (const sc of document.querySelectorAll('script[type="application/ld+json"]')) {
                const d = parseJsonSafe(sc.textContent);
                if (!d) continue;
                for (const item of (Array.isArray(d) ? d : [d])) {
                    if (key === 'company' && item.hiringOrganization?.name) return String(item.hiringOrganization.name).trim();
                    if (key === 'title' && item.title) return String(item.title).trim();
                    if (key === 'location') { const loc = item.jobLocation?.address; if (loc) return [loc.addressLocality || "", loc.addressRegion || "", loc.addressCountry || ""].filter(Boolean).join(", "); }
                    if (key === 'salary') { const sal = item.baseSalary?.value; if (sal) { if (typeof sal === 'object' && sal.minValue) return `${sal.currency || ""} ${sal.minValue} - ${sal.maxValue}`; if (typeof sal === 'string') return sal; } }
                }
            }
        } catch (e) { }
        return null;
    }

    function cleanCompanyName(raw) {
        if (!raw) return "";
        return raw.replace(/https?:\/\/\S+/gi, "").replace(/\(.*?\)/g, "").replace(/is\s.+/i, "")
            .replace(/provides\s.+/i, "").replace(/job description/gi, "").replace(/work from home|wfh|permanent/gi, "")
            .replace(/\|.+/g, "").trim();
    }

    function extractJobRole() {
        const jt = extractFromJsonLd('title');
        if (jt) return cleanDisplayText(jt).replace(/^(Hiring for|Urgent hiring for)\s+/i, "");
        if (isLinkedInPortal()) { const h = document.querySelector(".job-details-jobs-unified-top-card__job-title,.jobs-unified-top-card__job-title,h1"); return cleanDisplayText(h?.innerText || "").replace(/^(Hiring for|Urgent hiring for)\s+/i, ""); }
        if (isNaukriPortal()) { const h = document.querySelector(".jd-header-title,.styles_jhc__title__6S6t4,h1"); return cleanDisplayText(h?.innerText || "").replace(/^(Hiring for|Urgent hiring for)\s+/i, ""); }
        return document.title.split("|")[0].split("-")[0].trim();
    }

    function extractCompanyNameFromPage() {
        const jc = extractFromJsonLd('company');
        if (jc) return cleanCompanyName(jc);
        if (isLinkedInPortal()) {
            for (const sel of [".job-details-jobs-unified-top-card__company-name a", ".jobs-unified-top-card__company-name a", ".topcard__org-name-link", ".job-details-jobs-unified-top-card__company-name"]) {
                const el = document.querySelector(sel); if (el && el.innerText.trim()) return cleanCompanyName(el.innerText);
            }
        }
        if (isNaukriPortal()) {
            for (const sel of [".jd-header-comp-name a", ".styles_jhc__comp-name span", ".styles_jhcCompName__89DIn span", ".cpName"]) {
                const el = document.querySelector(sel); if (el && el.innerText.trim()) return cleanCompanyName(el.innerText);
            }
        }
        return "N/A";
    }

    function isLikelyLocationText(text) {
        const v = cleanDisplayText(String(text || "")).replace(/^(location|job location)\s*[:\-]?\s*/i, "").replace(/\s*(?:posted|days?|hours?)\s+ago.*$/i, "").trim();
        if (!v || v === "N/A" || v.length > 90) return false;
        if (/^(posted|today|easy apply|apply|full-time|part-time|contract)$/i.test(v)) return false;
        if (/\b(applicants?|connections?|employees?|views?)\b/i.test(v)) return false;
        return /(remote|hybrid|onsite|india|usa|uk|canada|hyderabad|bengaluru|bangalore|mumbai|pune|chennai|delhi|noida|gurugram|gurgaon)/i.test(v) || /^[A-Za-z][A-Za-z .',\-]+$/.test(v);
    }

    function extractLocationFromPage() {
        const jl = extractFromJsonLd('location');
        if (jl && isLikelyLocationText(jl)) return jl;
        if (isLinkedInPortal()) {
            for (const sel of [".job-details-jobs-unified-top-card__bullet", ".jobs-unified-top-card__bullet", ".top-card-layout__bullet"]) {
                for (const n of document.querySelectorAll(sel)) { const t = (n.innerText || "").trim(); if (isLikelyLocationText(t)) return t; }
            }
        }
        if (isNaukriPortal()) {
            for (const sel of [".styles_jhc__location", ".styles_jhcLoc__container span", "[class*='location']"]) {
                for (const n of document.querySelectorAll(sel)) { const t = (n.innerText || "").trim(); if (isLikelyLocationText(t)) return t; }
            }
        }
        return "N/A";
    }

    function extractSalaryFromHeader() {
        const js = extractFromJsonLd('salary'); if (js) return js;
        if (isNaukriPortal()) {
            for (const sel of [".styles_jhc__salary", ".salary", "[title='Salary'] + span", ".salaryText"]) {
                const el = document.querySelector(sel); if (el && el.innerText.trim()) return el.innerText.trim();
            }
        }
        if (isLinkedInPortal()) {
            for (const b of document.querySelectorAll(".job-details-jobs-unified-top-card__job-insight,.job-details-jobs-unified-top-card__bullet")) {
                const t = b.innerText;
                if (t.includes("₹") || t.includes("$") || t.includes("£") || t.toLowerCase().includes("monthly") || t.toLowerCase().includes("yearly")) return t.trim();
            }
        }
        return "Not Disclosed";
    }

    function extractContextualContact(text, type) {
        if (!text) return "N/A";
        const src = String(text), norm = src.toLowerCase();
        const hrKw = ["hr", "recruiter", "hiring manager", "talent acquisition", "contact", "whatsapp", "call", "mobile", "phone", "email", "mail"];
        if (type === 'email') {
            const emails = (src.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).filter(e => !EMAIL_BLOCKLIST.some(b => e.toLowerCase().includes(b)));
            if (!emails.length) return "N/A";
            if (emails.length === 1) return emails[0];
            let best = emails[0], minD = 9999;
            emails.forEach(em => { const pos = src.indexOf(em); hrKw.forEach(kw => { const kp = norm.indexOf(kw); if (kp !== -1) { const d = Math.abs(pos - kp); if (d < minD) { minD = d; best = em; } } }); });
            return minD < 200 ? best : "N/A";
        }
        if (type === 'phone') {
            const matches = (src.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}|\b\d{10}\b/g) || []);
            const cands = matches.filter(m => { const d = m.replace(/\D/g, ''); return d.length >= 10 && d.length <= 13 && !d.startsWith('2024') && !d.startsWith('2025'); });
            if (!cands.length) return "N/A";
            let best = "N/A", bestS = -1;
            cands.forEach(ph => { const pos = src.indexOf(ph); const ctx = norm.slice(Math.max(0, pos - 60), pos + ph.length + 60); let s = 0; hrKw.forEach(kw => { if (ctx.includes(kw)) s++; }); if (s > bestS) { bestS = s; best = ph; } });
            return bestS > 0 ? best : "N/A";
        }
        return "N/A";
    }

    function extractExperienceFromPage(jd) {
        if (!jd) return "N/A";
        const m = jd.match(/(\d+\s*(?:to|-|\+)\s*\d*\s*(?:years?|yrs?))/gi);
        if (m && m.length) return [...new Set(m)].join(", ");
        const m2 = jd.match(/(\d+)\s+(?:years?|yrs?)\s+experience/gi);
        return m2 ? m2[0] : "N/A";
    }

    function calculateAtsScore(jdText) {
        const src = cleanStructuredText(jdText || STATE.lastObservedJdText || "");
        if (!src) return 0;
        const hits = ATS_TARGET_KEYWORDS.filter(k => k.pattern.test(src));
        const score = clampScore((hits.length / ATS_TARGET_KEYWORDS.length) * 100);
        console.log("[Job Assistant] ATS:", hits.map(k => k.label), "Score:", score);
        return score;
    }

    function getJobInfo() {
        const title = extractJobRole();
        const company = extractCompanyNameFromPage();
        const location = extractLocationFromPage();
        const salary = extractSalaryFromHeader();
        const jd = extractJobDescriptionText() || STATE.lastObservedJdText || "";
        const effectiveJd = jd || cleanStructuredText(getPageTextWithoutAssistant(false));
        return {
            title: title || "Job Role", company: company || "", location: location || "", salaryDetails: salary || "",
            experience: extractExperienceFromPage(effectiveJd),
            email: extractContextualContact(effectiveJd, 'email'),
            phone: extractContextualContact(effectiveJd, 'phone'),
            jdText: effectiveJd, jobDescription: effectiveJd,
            atsScore: calculateAtsScore(effectiveJd),
            portal: getPortalName(), pageUrl: window.location.href.split("#")[0]
        };
    }

    function buildJobSignature(info) {
        return [location.href.split("#")[0], info.title || "", info.company || "", info.location || "", (info.jobDescription || "").slice(0, 300)].join("||");
    }

    function hasMeaningfulJobData(info) {
        if (!info) return false;
        const t = cleanDisplayText(info.title || "");
        return Boolean((t && t !== "Job Role") || info.company || info.location || (info.jdText || "").length > 120);
    }

    // ── DOM QUERY HELPERS (query inside shadow root) ──
    function $s(id) { return STATE.shadowRoot ? STATE.shadowRoot.getElementById(id) : null; }
    function $sq(sel) { return STATE.shadowRoot ? STATE.shadowRoot.querySelector(sel) : null; }

    function updateJobInfoDisplay(info) {
        const div = $s("jobInfo");
        if (!div) return;
        const ats = Number.isFinite(Number(info && info.atsScore)) ? Number(info.atsScore) : STATE.lastAtsScore;
        div.innerHTML = `
            <div><strong style="color:#fff">📋 Role:</strong> <span style="color:#60a5fa">${info.title || "--"}</span></div>
            <div><strong style="color:#fff">🏢 Comp:</strong> <span style="color:#94a3b8">${info.company || "--"}</span></div>
            <div><strong style="color:#fff">📍 Loc:</strong>  <span style="color:#94a3b8">${info.location || "--"}</span></div>
            <div><strong style="color:#fff">💰 Sal:</strong>  <span style="color:#4ade80">${info.salaryDetails || "--"}</span></div>
            <div><strong style="color:#fff">✉️ Email:</strong><span style="color:#f472b6">${info.email || "--"}</span></div>
            <div><strong style="color:#fff">📞 Phone:</strong><span style="color:#fbbf24">${info.phone || "--"}</span></div>
            <div id="atsLine" style="padding-top:6px;border-top:1px solid rgba(255,255,255,0.06);font-weight:bold;color:#a78bfa;">
                📊 ATS Score: ${ats == null ? "--" : ats + "%"}
            </div>`;
    }

    function updateAtsDisplay(score) {
        STATE.lastAtsScore = Number.isFinite(Number(score)) ? Number(score) : null;
        if (STATE.currentJob) STATE.currentJob.atsScore = STATE.lastAtsScore;
        const ac = $s("atsCounter");
        if (ac) ac.textContent = STATE.lastAtsScore == null ? "ATS: --" : "ATS Score: " + STATE.lastAtsScore + "%";
        const al = $s("atsLine");
        if (al) al.innerHTML = "📊 <strong>ATS Score:</strong> " + (STATE.lastAtsScore == null ? "--" : STATE.lastAtsScore + "%");
    }

    function updateLiveCounter(count) {
        const v = Number(count);
        if (Number.isFinite(v)) STATE.totalAppliedCount = v;
    }

    function refreshLiveCounter() {
        if (STATE.isRefreshingCounter) return;
        STATE.isRefreshingCounter = true;
        GM_xmlhttpRequest({
            method: "GET", url: STATS_URL + "&_=" + Date.now(),
            headers: { "Accept": "application/json,text/plain,*/*" }, anonymous: true,
            onload: function (r) {
                STATE.isRefreshingCounter = false;
                const d = parseJsonSafe(r.responseText || "");
                const total = d && d.totalAppliedEver != null ? Number(d.totalAppliedEver) : NaN;
                if (Number.isFinite(total)) updateLiveCounter(total);
            },
            onerror: function () { STATE.isRefreshingCounter = false; }
        });
    }

    function normalizeJobPortalLink(v) {
        const t = String(v || "").trim();
        if (!t) return "";
        try { const u = new URL(/^https?:\/\//i.test(t) ? t : "https://x.com" + t); u.hash = ""; return u.toString().replace(/\/$/, ""); }
        catch (e) { return t.split("#")[0].replace(/\/$/, ""); }
    }

    function getJobLookupLink(info) {
        return normalizeJobPortalLink((info && (info.pageUrl || info.link)) || location.href);
    }
    function getJobStorageKey(info) {
        const k = getJobLookupLink(info); return k ? `jobassistant:logged:${k}` : "";
    }
    function isJobLoggedInSession(info) {
        const k = getJobStorageKey(info); if (!k) return false;
        try { return sessionStorage.getItem(k) === "1"; } catch (e) { return false; }
    }
    function markJobLoggedInSession(info) {
        const k = getJobStorageKey(info); if (!k) return;
        try { sessionStorage.setItem(k, "1"); } catch (e) { }
        STATE.currentLoggedLookupKey = k; STATE.currentJobAlreadyLogged = true;
    }
    function updateLoggedIndicator(v) { /* no log button in this layout */ }

    function syncLoggedStateForCurrentJob(info, force) {
        const k = getJobStorageKey(info);
        if (!k) return;
        if (isJobLoggedInSession(info)) { STATE.currentLoggedLookupKey = k; STATE.currentJobAlreadyLogged = true; return; }
        STATE.currentJobAlreadyLogged = false;
        if (!force && STATE.currentLoggedLookupKey === k) return;
        if (STATE.loggedLookupPendingKey === k) return;
        STATE.loggedLookupPendingKey = k;
        GM_xmlhttpRequest({
            method: "GET", url: `${SHEET_URL}?view=lookup&link=${encodeURIComponent(getJobLookupLink(info))}&_=${Date.now()}`,
            headers: { "Accept": "application/json,text/plain,*/*" }, anonymous: true,
            onload: function (r) {
                STATE.loggedLookupPendingKey = ""; STATE.currentLoggedLookupKey = k;
                const d = parseJsonSafe(r.responseText || "");
                if (d && (d.exists || d.duplicate)) markJobLoggedInSession(info);
                else { STATE.currentJobAlreadyLogged = false; }
            },
            onerror: function () { STATE.loggedLookupPendingKey = ""; STATE.currentLoggedLookupKey = k; }
        });
    }

    const emailBody = i => `Dear Hiring Manager,

I am writing to express my strong interest in the ${i.title} position at ${i.company}. With over eight years of experience as a Relationship Manager and Customer Specialist, I have a proven track record of driving long-term retention and optimizing service delivery.

Key Strengths:
* Strategic Relationship Management: 97% satisfaction, 95% retention.
* Customer-Centric Problem Solving: 90% first-contact resolution.
* CRM Automation: 95% efficiency improvement.
* Program Delivery: 20% faster timelines.

🔗 LinkedIn: ${PROFILE.linkedin}
🌐 Portfolio: ${PROFILE.portfolio}
📄 Resume: ${PROFILE.resume}

Best regards, Mohammed Ahmed | ${PROFILE.phone}`;

    const waBody = i => `Dear Hiring Manager,
I'm Mohammed Ahmed, reaching out regarding the ${i.title} role at ${i.company}.

Key Achievements:
- 97% client satisfaction & 95% retention
- 95% communication efficiency via CRM automations
- 20% faster program delivery
- MCA qualified, 90% first-contact issue resolution

🔗 LinkedIn: ${PROFILE.linkedin}
📄 Resume: ${PROFILE.resume}
🌐 Portfolio: ${PROFILE.portfolio}

Best regards, Mohammed Ahmed | ${PROFILE.phone}`;

    const coverLetter = i => {
        const d = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
        return `Mohammed Ahmed | Hyderabad, Telangana | ${PROFILE.phone} | ${PROFILE.email}
LinkedIn: ${PROFILE.linkedin} | Portfolio: ${PROFILE.portfolio}
${d}

Dear Hiring Manager,

I am writing to express my strong interest in the ${i.title} position at ${i.company}. With 8+ years in EdTech and SaaS Client Relationship Management, I have a proven track record in program delivery, client retention, and CRM automation.

At Iamneo.ai, I improved delivery timelines by 20%. At Turito Inc., I achieved 97% satisfaction and 95% retention. At Vedantu, I managed 300+ student accounts with 95% renewal rates.

Sincerely, Mohammed Ahmed`;
    };

    function buildDirectWhatsappLink(info, phone) {
        const cp = String(phone || "").replace(/\D/g, "");
        return cp ? `https://wa.me/${cp}?text=${encodeURIComponent(waBody(info))}` : `https://wa.me/?text=${encodeURIComponent(waBody(info))}`;
    }
    function buildDirectEmailLink(info, hrEmail) {
        if (!hrEmail) return "";
        return `mailto:${hrEmail}?subject=${encodeURIComponent("Application for " + info.title)}&body=${encodeURIComponent(emailBody(info))}`;
    }

    function buildSheetPayload(info, extras) {
        const recruiter = STATE.lastRecruiterContact || {};
        const hrEmail = (extras && extras.hrEmail) || ((recruiter.emails && recruiter.emails[0]) || info.email || "");
        const atsScore = (extras && Number.isFinite(Number(extras.atsScore))) ? Number(extras.atsScore) : (Number.isFinite(Number(info.atsScore)) ? Number(info.atsScore) : (STATE.lastAtsScore || calculateAtsScore(info.jdText)));
        const cleanJd = sanitizeJobDescriptionText(info.jobDescription || info.jdText || STATE.lastObservedJdText || "");
        return {
            portal: info.portal || getPortalName(), portalName: info.portal || getPortalName(),
            jobRole: info.title, role: info.title, title: info.title, company: info.company,
            salaryDetails: info.salaryDetails || "", location: info.location || "", experience: info.experience || "",
            atsScore, hrName: (extras && extras.hrName) || recruiter.name || "", hrEmail,
            jobPortalLink: normalizeJobPortalLink(info.pageUrl || location.href),
            jobApplyLink: normalizeJobPortalLink(info.pageUrl || location.href),
            link: normalizeJobPortalLink(info.pageUrl || location.href),
            url: normalizeJobPortalLink(info.pageUrl || location.href),
            applyStatus: (extras && extras.applyStatus) || "Logged",
            status: (extras && extras.applyStatus) || "Logged",
            emailBody: emailBody(info), whatsappMessage: waBody(info),
            jobDescription: cleanJd, jdText: cleanJd,
            email: info.email || "", phone: info.phone || "",
            directEmailLink: buildDirectEmailLink(info, hrEmail),
            directWhatsappLink: buildDirectWhatsappLink(info, info.phone)
        };
    }

    function uploadResumeToR2(fileBlob, fileName, onDone) {
        const formData = new FormData();
        formData.append("resume", fileBlob, fileName || "Mohammed_Ahmed_Resume.pdf");

        GM_xmlhttpRequest({
            method: "POST",
            url: WORKER_URL + "/api/upload-resume",
            data: formData,
            onload: function (r) {
                const res = parseJsonSafe(r.responseText);
                if (res && res.success) {
                    console.log("[Job Assistant] Uploaded to R2:", res.fileUrl);
                    if (typeof onDone === "function") onDone(res);
                } else {
                    console.error("[Job Assistant] R2 Upload failed:", res);
                }
            }
        });
    }

    function queueBackgroundLog(info, extras, onComplete) {
        const payload = buildSheetPayload(info, extras || {});

        // 1. Log to Cloudflare D1 Database
        GM_xmlhttpRequest({
            method: "POST",
            url: WORKER_URL + "/api/track",
            headers: { "Content-Type": "application/json" },
            anonymous: true,
            data: JSON.stringify({
                company: payload.company,
                jobTitle: payload.title || payload.jobRole,
                location: payload.location,
                applyLink: payload.jobPortalLink,
                resumeScore: payload.atsScore,
                status: payload.applyStatus || "Applied"
            }),
            onload: function (r) {
                console.log("[Job Assistant] Tracked in Cloudflare D1:", r.responseText);
            }
        });

        // 2. Log to Google Sheets
        GM_xmlhttpRequest({
            method: "POST", url: SHEET_URL,
            headers: { "Content-Type": "text/plain;charset=UTF-8", "Accept": "application/json,text/plain,*/*" },
            anonymous: true, data: JSON.stringify(payload),
            onload: function (r) {
                const d = parseJsonSafe(r.responseText || "");
                if (d && (d.success || d.duplicate)) {
                    markJobLoggedInSession(info);
                    const total = Number(d.totalAppliedEver);
                    if (Number.isFinite(total)) updateLiveCounter(total); else refreshLiveCounter();
                } else refreshLiveCounter();
                if (typeof onComplete === "function") onComplete(d, r);
            },
            onerror: function () { refreshLiveCounter(); if (typeof onComplete === "function") onComplete(null, null); }
        });
    }

    function ensureSilentLog(info, extras, onComplete) {
        const sk = getJobStorageKey(info);
        const dk = sk || buildJobSignature(info);
        if (!dk) { queueBackgroundLog(info, extras, onComplete); return; }
        if (isJobLoggedInSession(info) || (STATE.currentJobAlreadyLogged && STATE.currentLoggedLookupKey === sk)) {
            if (typeof onComplete === "function") onComplete({ success: true, duplicate: true }, null); return;
        }
        if (STATE.pendingLogRequests[dk]) { if (typeof onComplete === "function") STATE.pendingLogRequests[dk].push(onComplete); return; }
        STATE.pendingLogRequests[dk] = typeof onComplete === "function" ? [onComplete] : [];
        queueBackgroundLog(info, extras, function (d, r) {
            const cbs = STATE.pendingLogRequests[dk] || []; delete STATE.pendingLogRequests[dk];
            cbs.forEach(cb => { try { cb(d, r); } catch (e) { } });
        });
    }

    function refreshCurrentJob(force) {
        const info = getJobInfo();
        const sig = buildJobSignature(info);
        if (force || sig !== STATE.currentSignature) {
            STATE.currentSignature = sig; STATE.currentJob = info;
            if (info.jdText) STATE.lastObservedJdText = info.jdText;
            STATE.lastAtsScore = Number.isFinite(Number(info.atsScore)) ? Number(info.atsScore) : null;
            STATE.lastRecruiterContact = null;
            updateJobInfoDisplay(info); updateAtsDisplay(info.atsScore);
            syncLoggedStateForCurrentJob(info, force);
        }
        return STATE.currentJob || info;
    }

    function recalculateAtsForCurrentJob() {
        const info = refreshCurrentJob(false);
        const jd = extractJobDescriptionText() || info.jdText || STATE.lastObservedJdText || "";
        if (jd) { STATE.lastObservedJdText = jd; info.jdText = jd; info.jobDescription = jd; }
        const score = calculateAtsScore(jd);
        info.atsScore = score; STATE.currentJob = info; updateAtsDisplay(score);
        return score;
    }

    function handleLoggedAction(options, runAction) {
        const info = refreshCurrentJob();
        const jd = extractJobDescriptionText() || info.jdText || STATE.lastObservedJdText || "";
        if (jd) { STATE.lastObservedJdText = jd; info.jdText = jd; info.jobDescription = jd; }
        const ats = calculateAtsScore(jd); info.atsScore = ats; STATE.currentJob = info;
        const already = isJobLoggedInSession(info) || STATE.currentJobAlreadyLogged;
        const go = () => { if (typeof runAction === "function") runAction(info, ats); };
        if (!already) {
            ensureSilentLog(info, {
                applyStatus: options && options.applyStatus ? options.applyStatus : "Logged", ats,
                hrName: options && options.hrName ? options.hrName : "", hrEmail: options && options.hrEmail ? options.hrEmail : ""
            }, go);
        } else go();
    }

    // ── RECRUITER MODAL (appended to document.body, not shadow) ──
    function getLinkedInHiringTeam() {
        const results = [];
        for (const sel of ['.hirer-card__container', '[data-test-hiring-team-member]', '.hiring-team', '.artdeco-card .hirer-card']) {
            document.querySelectorAll(sel).forEach(card => {
                const nameEl = card.querySelector('span.artdeco-entity-lockup__title,.hirer-card__hirer-information strong,span[dir="ltr"]');
                const linkEl = card.querySelector('a[href*="linkedin.com/in/"]') || card.closest('a[href*="linkedin.com/in/"]');
                const name = nameEl?.innerText?.trim(), profileUrl = linkEl?.href;
                if (name && profileUrl) results.push({ name, profileUrl });
            });
        }
        if (!results.length) {
            document.querySelectorAll('section,div[class*="hir"],div[class*="hiring"]').forEach(node => {
                const t = node.innerText?.toLowerCase() || "";
                if (t.includes("hiring team") || t.includes("recruiter")) {
                    node.querySelectorAll('a[href*="linkedin.com/in/"],a[href*="/in/"]').forEach(link => {
                        const name = link.innerText?.trim() || link.getAttribute('aria-label') || "", profileUrl = link.href;
                        if (name && profileUrl && !results.find(r => r.profileUrl === profileUrl)) results.push({ name, profileUrl });
                    });
                }
            });
        }
        return results;
    }

    function fetchRecruiterContact(profileUrl, onResult) {
        onResult({ status: "loading", message: "🔄 Fetching profile..." });
        const cleanUrl = profileUrl.split("?")[0].replace(/\/$/, "");
        GM_xmlhttpRequest({
            method: "GET", url: cleanUrl + "/overlay/contact-info/",
            headers: { "Accept": "text/html,*/*", "Referer": profileUrl },
            onload: function (r) {
                const html = r.responseText || "";
                const emails = [...html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)].map(m => m[0]).filter(e => !e.includes("linkedin") && !e.includes("example"));
                const phones = [...html.matchAll(/(\+?\d[\d\s\-().]{7,}\d)/g)].map(m => m[0].trim()).filter(p => p.replace(/\D/g, "").length >= 8);
                const nm = html.match(/<title[^>]*>([^<|]+)/i);
                onResult({ status: emails.length || phones.length ? "found" : "not_found", name: nm ? nm[1].trim() : "Recruiter", emails: [...new Set(emails)], phones: [...new Set(phones)], profileUrl: cleanUrl });
            },
            onerror: () => onResult({ status: "error", message: "❌ Could not fetch profile." })
        });
    }

    function showRecruiterModal(recruiters) {
        const old = document.getElementById("recruiter-modal"); if (old) old.remove();
        const modal = document.createElement("div"); modal.id = "recruiter-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;max-height:80vh;overflow-y:auto;background:#0f172a;border:1px solid #334155;border-radius:14px;z-index:2147483647;color:#fff;font-size:12px;box-shadow:0 20px 60px rgba(0,0,0,0.8);font-family:system-ui,sans-serif;";
        if (!recruiters || !recruiters.length) {
            modal.innerHTML = `<div style="padding:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><strong>🔍 Recruiter Finder</strong><span id="cM" style="cursor:pointer">✖</span></div><div style="color:#94a3b8;text-align:center;padding:20px">⚠️ No Hiring Team section found.</div></div>`;
            document.body.appendChild(modal); modal.querySelector("#cM").onclick = () => modal.remove(); return;
        }
        const info = STATE.currentJob || {};
        modal.innerHTML = `<div style="padding:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><strong>🔍 Hiring Team (${recruiters.length})</strong><span id="cM" style="cursor:pointer">✖</span></div>${recruiters.map((r, idx) => `<div style="background:rgba(255,255,255,0.05);border:1px solid #1e293b;border-radius:10px;padding:10px;margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div><strong>👤 ${r.name}</strong><br><a href="${r.profileUrl}" target="_blank" style="color:#60a5fa;font-size:10px">View Profile →</a></div><button data-idx="${idx}" style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:7px;padding:5px 10px;cursor:pointer;font-size:11px;">🔍 Find</button></div><div id="rr-${idx}" style="color:#94a3b8;font-size:11px;min-height:20px"></div></div>`).join("")}</div>`;
        document.body.appendChild(modal);
        modal.querySelector("#cM").onclick = () => modal.remove();
        modal.querySelectorAll("button[data-idx]").forEach(btn => {
            btn.onclick = function () {
                const idx = parseInt(this.getAttribute("data-idx"));
                const r = recruiters[idx], rd = modal.querySelector(`#rr-${idx}`);
                this.disabled = true; this.textContent = "⏳"; const self = this;
                fetchRecruiterContact(r.profileUrl, data => {
                    self.disabled = false; self.textContent = "🔍 Find";
                    if (data.status === "loading") { rd.innerHTML = `<span style="color:#60a5fa">${data.message}</span>`; return; }
                    if (data.status === "error") { rd.innerHTML = `<span style="color:#f87171">${data.message}</span>`; return; }
                    if (data.status === "not_found") { rd.innerHTML = `<span style="color:#fbbf24">⚠️ No contact found. <a href="${r.profileUrl}" target="_blank" style="color:#60a5fa">Open Profile</a></span>`; return; }
                    STATE.lastRecruiterContact = data;
                    let h = `<div style="color:#4ade80;font-weight:600;margin-bottom:4px">✅ Found!</div>`;
                    (data.emails || []).forEach(e => { h += `<div style="display:flex;justify-content:space-between;background:rgba(59,130,246,0.1);border-radius:4px;padding:3px 6px;margin-bottom:3px"><span style="color:#e2e8f0">${e}</span><button onclick="navigator.clipboard.writeText('${e}')" style="background:#1e40af;color:#fff;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px">Copy</button></div>`; });
                    (data.phones || []).forEach(p => { h += `<div style="display:flex;justify-content:space-between;background:rgba(59,130,246,0.1);border-radius:4px;padding:3px 6px;margin-bottom:3px"><span style="color:#e2e8f0">${p}</span><div style="display:flex;gap:4px"><button onclick="navigator.clipboard.writeText('${p}')" style="background:#1e40af;color:#fff;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px">Copy</button><button onclick="window.open('https://wa.me/${p.replace(/\D/g, '')}','_blank')" style="background:#166534;color:#fff;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px">WA</button></div></div>`; });
                    rd.innerHTML = h;
                });
            };
        });
    }

    // ── SPA OBSERVERS ──
    function installSPAObservers() {
        if (STATE.observerInstalled) return; STATE.observerInstalled = true;
        let debT;
        const triggerRefresh = (force = false) => {
            clearTimeout(debT); debT = setTimeout(() => {
                const jd = extractJobDescriptionText(); if (jd) STATE.lastObservedJdText = jd;
                const inf = refreshCurrentJob(force);
                if (inf && STATE.shadowRoot) { updateJobInfoDisplay(inf); updateAtsDisplay(inf.atsScore); syncLoggedStateForCurrentJob(inf, false); }
            }, 800);
        };
        const obs = new MutationObserver(() => triggerRefresh(true));
        if (document.body) obs.observe(document.body, { childList: true, subtree: true });
        let lastUrl = location.href;
        setInterval(() => { if (location.href !== lastUrl) { lastUrl = location.href; triggerRefresh(true); } }, 1000);
        ["pushState", "replaceState"].forEach(m => { const o = history[m]; history[m] = function () { const r = o.apply(this, arguments); triggerRefresh(true); return r; }; });
    }

    // ── MAIN INIT ──
    function init() {
        if (!document.body) { setTimeout(init, 500); return; }

        // Remove existing host if re-running
        const oldHost = document.getElementById("job-assistant-host");
        if (oldHost) {
            // Panel already exists — just refresh data
            try {
                const inf = refreshCurrentJob(true);
                updateJobInfoDisplay(inf); updateAtsDisplay(inf.atsScore);
            } catch (e) { }
            if (!hasMeaningfulJobData(STATE.currentJob) && STATE.startupRetryCount < 8) {
                STATE.startupRetryCount++; setTimeout(init, 1500);
            } else STATE.startupRetryCount = 0;
            return;
        }

        const isLinkedIn = isLinkedInPortal();

        // ── CREATE SHADOW HOST ──
        // The host sits in document.body but LinkedIn CSS cannot pierce the shadow boundary
        const host = document.createElement("div");
        host.id = "job-assistant-host";
        host.style.cssText = "all:initial;position:fixed;bottom:20px;left:20px;z-index:2147483647;display:block;";
        document.body.appendChild(host);

        const shadow = host.attachShadow({ mode: "open" });
        STATE.shadowRoot = shadow;

        // Inject scoped CSS into shadow
        const styleEl = document.createElement("style");
        styleEl.textContent = SHADOW_CSS;
        shadow.appendChild(styleEl);

        // ── BUILD PANEL INSIDE SHADOW ──
        const panel = document.createElement("div");
        panel.id = "panel";
        STATE.panel = panel;

        // Header
        const hdr = document.createElement("div"); hdr.id = "hdr";
        hdr.innerHTML = `<strong>📋 Job Assistant Premium V1.1</strong><div class="hdr-btns"><span id="minBtn">➖</span><span id="clsBtn">✖</span></div>`;
        panel.appendChild(hdr);

        // Body
        const body = document.createElement("div"); body.id = "panelBody";

        // Job info
        const jobInfo = document.createElement("div"); jobInfo.id = "jobInfo"; jobInfo.className = "";
        jobInfo.style.cssText = "font-size:11.5px;line-height:1.5;margin-bottom:12px;padding:10px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.06);";
        jobInfo.innerHTML = `<div>📋 <strong>Role:</strong> <span style="color:#60a5fa">Loading...</span></div>`;
        body.appendChild(jobInfo);
        STATE.jobInfoDiv = jobInfo;

        // Section helper
        function makeSection(labelClass, labelText, btns) {
            const sec = document.createElement("div"); sec.className = "section";
            const lbl = document.createElement("div"); lbl.className = `section-label ${labelClass}`; lbl.textContent = labelText;
            sec.appendChild(lbl);
            const row = document.createElement("div"); row.className = "btn-row";
            btns.forEach(b => {
                const btn = document.createElement("button");
                btn.id = b.id; btn.className = "gbtn" + (b.full ? " gbtn-full" : ""); btn.textContent = b.text;
                row.appendChild(btn);
            });
            sec.appendChild(row);
            return sec;
        }

        // Section 1 — Contacts
        body.appendChild(makeSection("s1-label", "1. Contacts", [
            { id: "waBtn", text: "💬 WhatsApp" },
            { id: "mailBtn", text: "✉️ Email" }
        ]));

        // Section 2 — Candidate Info & Cloudflare R2 Storage
        const sec2 = makeSection("s2-label", "2. Candidate Info & R2 Storage", [
            { id: "cvBtn", text: "📎 Copy Link" },
            { id: "coverBtn", text: "📄 Cover" },
            { id: "uploadR2Btn", text: "📤 Upload R2" },
            { id: "viewR2Btn", text: "👁️ View R2" },
            { id: "atsBtn", text: "📊 Check ATS Score", full: true }
        ]);
        const atsCounter = document.createElement("div"); atsCounter.id = "atsCounter"; atsCounter.style.cssText = "padding-top:4px;font-size:9.5px;color:#a78bfa;text-align:center;opacity:0.8;"; atsCounter.textContent = "ATS: --";
        sec2.appendChild(atsCounter);
        STATE.atsCounter = atsCounter;
        body.appendChild(sec2);

        // Hidden File Input for Resume Upload
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.id = "resumeFileInput";
        fileInput.accept = ".pdf,.doc,.docx";
        fileInput.style.display = "none";
        shadow.appendChild(fileInput);

        // Section 3 — HR Info (LinkedIn only)
        if (isLinkedIn) {
            body.appendChild(makeSection("s3-label", "3. HR Info", [
                { id: "recruiterBtn", text: "🔍 HR Info", full: true }
            ]));
        }

        panel.appendChild(body);
        shadow.appendChild(panel);

        // Bubble (minimised) — also inside shadow
        const bubble = document.createElement("div"); bubble.id = "bubble";
        bubble.textContent = "📋"; bubble.style.display = "none";
        shadow.appendChild(bubble);

        // ── WIRE EVENTS ──
        // Drag
        let drag = false, ox = 0, oy = 0;
        hdr.addEventListener("mousedown", e => { drag = true; ox = e.clientX - host.offsetLeft; oy = e.clientY - host.offsetTop; });
        document.addEventListener("mousemove", e => { if (!drag) return; host.style.left = e.clientX - ox + "px"; host.style.top = e.clientY - oy + "px"; host.style.bottom = "auto"; });
        document.addEventListener("mouseup", () => { drag = false; });

        shadow.getElementById("minBtn").onclick = () => { panel.style.display = "none"; bubble.style.display = "flex"; };
        bubble.onclick = () => { bubble.style.display = "none"; panel.style.display = "block"; };
        shadow.getElementById("clsBtn").onclick = () => { host.remove(); STATE.shadowRoot = null; STATE.panel = null; };

        shadow.getElementById("waBtn").onclick = () => {
            const waBtnEl = shadow.getElementById("waBtn");
            const originalText = waBtnEl.textContent;
            handleLoggedAction({ applyStatus: "Applied on WhatsApp" }, job => {
                waBtnEl.disabled = true; waBtnEl.textContent = "\u23F3 Writing...";
                generateAiMessage(job, "whatsapp", (text, usedFallback) => {
                    waBtnEl.disabled = false; waBtnEl.textContent = originalText;
                    if (usedFallback) console.warn("[Job Assistant] WhatsApp message used static fallback (Gemini unavailable).");
                    const cp = String(job.phone || "").replace(/\D/g, "");
                    const link = cp ? `https://wa.me/${cp}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
                    window.open(link);
                });
            });
        };
        shadow.getElementById("mailBtn").onclick = () => {
            const mailBtnEl = shadow.getElementById("mailBtn");
            const originalText = mailBtnEl.textContent;
            handleLoggedAction({ applyStatus: "Applied on Email" }, job => {
                mailBtnEl.disabled = true; mailBtnEl.textContent = "\u23F3 Writing...";
                generateAiMessage(job, "email", (text, usedFallback) => {
                    mailBtnEl.disabled = false; mailBtnEl.textContent = originalText;
                    if (usedFallback) console.warn("[Job Assistant] Email used static fallback (Gemini unavailable).");
                    window.location.href = `mailto:${job.email}?subject=${encodeURIComponent("Application for " + job.title)}&body=${encodeURIComponent(text)}`;
                });
            });
        };
        shadow.getElementById("cvBtn").onclick = () => {
            handleLoggedAction({ applyStatus: "Applied on Portal" }, () => { GM_setClipboard(PROFILE.resume); alert("Resume link copied!"); });
        };
        shadow.getElementById("coverBtn").onclick = () => {
            handleLoggedAction({ applyStatus: "Applied on Portal" }, job => { GM_setClipboard(coverLetter(job)); alert("Cover Letter copied!"); });
        };
        shadow.getElementById("uploadR2Btn").onclick = () => {
            shadow.getElementById("resumeFileInput").click();
        };
        shadow.getElementById("resumeFileInput").onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const uploadBtn = shadow.getElementById("uploadR2Btn");
            const origText = uploadBtn.textContent;
            uploadBtn.disabled = true;
            uploadBtn.textContent = "⏳ Uploading...";

            uploadResumeToR2(file, file.name, (res) => {
                uploadBtn.disabled = false;
                uploadBtn.textContent = origText;
                if (res && res.success) {
                    const fullUrl = res.fileUrl.startsWith("http") ? res.fileUrl : WORKER_URL + res.fileUrl;
                    if (typeof GM_setValue === "function") {
                        GM_setValue("lastUploadedResumeUrl", fullUrl);
                    } else {
                        localStorage.setItem("lastUploadedResumeUrl", fullUrl);
                    }
                    alert("✅ Resume uploaded successfully to Cloudflare R2!\n\nView URL:\n" + fullUrl);
                } else {
                    alert("❌ Upload failed. Please try again.");
                }
            });
        };
        shadow.getElementById("viewR2Btn").onclick = () => {
            let savedUrl = typeof GM_getValue === "function" ? GM_getValue("lastUploadedResumeUrl", "") : localStorage.getItem("lastUploadedResumeUrl");
            if (!savedUrl) {
                alert("ℹ️ No custom uploaded resume found yet. Showing active default resume.");
                savedUrl = PROFILE.resume;
            }
            if (typeof GM_openInTab === "function") {
                GM_openInTab(savedUrl, { active: true });
            } else {
                window.open(savedUrl, "_blank");
            }
        };
        shadow.getElementById("atsBtn").onclick = () => { recalculateAtsForCurrentJob(); };
        if (isLinkedIn) {
            shadow.getElementById("recruiterBtn").onclick = () => {
                handleLoggedAction({ applyStatus: "Applied on Portal" }, () => showRecruiterModal(getLinkedInHiringTeam()));
            };
        }

        // Initial data load
        let i = { title: "Job Role", company: "", location: "", salaryDetails: "", email: "", phone: "", jdText: "", jobDescription: "", atsScore: null, portal: getPortalName(), pageUrl: location.href.split("#")[0] };
        try { i = refreshCurrentJob(true) || i; } catch (e) { console.error("[Job Assistant] Initial extraction failed", e); }

        refreshLiveCounter();
        installSPAObservers();

        if (!hasMeaningfulJobData(i) && STATE.startupRetryCount < 8) {
            STATE.startupRetryCount++; setTimeout(init, 1500);
        } else STATE.startupRetryCount = 0;
    }

    if (document.readyState === "complete") { refreshLiveCounter(); }
    else { window.addEventListener("load", () => refreshLiveCounter(), { once: true }); }

    function waitForBodyThenInit() {
        if (!document.body) { setTimeout(waitForBodyThenInit, 200); return; }
        const isLI = location.hostname.includes("linkedin.com");
        setTimeout(init, isLI ? 6000 : 3000);
        if (isLI) setTimeout(init, 12000);
    }
    waitForBodyThenInit();

})();