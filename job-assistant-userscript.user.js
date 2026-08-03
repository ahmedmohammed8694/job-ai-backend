// ==UserScript==
// @name         Job Assistant Premium Naukri & LinkedIn V01.38
// @namespace    http://tampermonkey.net/
// @version      01.38
// @description  Multi-AI Provider vault (Gemini, ChatGPT, Grok, OpenRouter, OmniRoute, Claude) with multi-key auto-rotation & Cloudflare D1 storage.
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
// @connect      api.openai.com
// @connect      api.x.ai
// @connect      openrouter.ai
// @connect      api.anthropic.com
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    const SCRIPT_VERSION = "V01.38";
    const WORKER_URL = "https://job-ai-backend.ahmed-mohammed8694.workers.dev";
    const SHEET_URL = "https://script.google.com/macros/s/AKfycbzXY-3b4OrJnYzfq3W9AVnBP9oc9pzQaaCZdI1ysTUk-635jQrrXpnQPXjRq53eKitO/exec";
    const DASHBOARD_URL = SHEET_URL + "?view=dashboard";
    const STATS_URL = SHEET_URL + "?view=stats";
    const RESUME_LINK = "https://drive.google.com/file/d/1SHDFALAim2uSemURa-PQ8K7IoTPMf0U3/view";

    function getWorkerUrl() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("customWorkerUrl", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("customWorkerUrl") : "";
            return (gm || ls || "").trim() || WORKER_URL;
        } catch(e) { return WORKER_URL; }
    }

    function showCloudflareSettingsModal() {
        const old = document.getElementById("cf-settings-modal");
        if (old) old.remove();

        const currentEndpoint = getWorkerUrl();
        const currentD1Id = (typeof GM_getValue === "function" ? GM_getValue("customD1Id", "") : (typeof localStorage !== "undefined" ? localStorage.getItem("customD1Id") : "")) || "5d6e5a34-b240-463a-a14a-519538fd2fc4";
        const currentR2Bucket = (typeof GM_getValue === "function" ? GM_getValue("customR2Bucket", "") : (typeof localStorage !== "undefined" ? localStorage.getItem("customR2Bucket") : "")) || "jobassistantpremium";

        const modal = document.createElement("div");
        modal.id = "cf-settings-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;max-height:92vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:16px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 60px rgba(0,0,0,0.85);font-family:system-ui,-apple-system,sans-serif;";

        const sqlSchema = `CREATE TABLE IF NOT EXISTS job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT,
  portal TEXT,
  company TEXT,
  title TEXT,
  page_url TEXT,
  apply_status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

        modal.innerHTML = `
            <div style="padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:10px;">
                    <strong style="color:#f97316;font-size:14px;">☁️ Cloudflare D1 Database & R2 Storage Setup</strong>
                    <span id="closeCfModal" style="cursor:pointer;font-size:16px;color:#8b949e;">✖</span>
                </div>

                <!-- STEP BY STEP GUIDE -->
                <div style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.25);border-radius:10px;padding:12px;margin-bottom:14px;font-size:11px;line-height:1.55;">
                    <strong style="color:#fb923c;font-size:11.5px;display:block;margin-bottom:6px;">📖 STEP-BY-STEP: HOW TO CREATE YOUR DATABASE IN CLOUDFLARE:</strong>
                    <ol style="margin:0;padding-left:18px;color:#8b949e;">
                        <li style="margin-bottom:4px;">
                            Log in to your Cloudflare account:
                            <div style="margin-top:4px;">
                                <a href="https://dash.cloudflare.com/" target="_blank" style="display:inline-block;background:#f97316;color:#fff;text-decoration:none;padding:5px 10px;border-radius:6px;font-weight:600;font-size:10.5px;">🚀 Open Cloudflare Dashboard (dash.cloudflare.com) →</a>
                            </div>
                        </li>
                        <li style="margin-bottom:4px;">
                            <strong>Create D1 Database:</strong> Go to <code>Workers & Pages</code> ➔ <code>D1 SQL Database</code> ➔ Click <code>Create Database</code> ➔ Name it <code>job-ai-db</code>.
                        </li>
                        <li style="margin-bottom:4px;">
                            <strong>Run Table Schema SQL:</strong> Open the Console tab of your database and run this query:
                            <div style="margin-top:4px;display:flex;gap:6px;align-items:center;">
                                <textarea id="sqlQueryTextarea" readonly style="flex:1;height:55px;background:#161b22;border:1px solid #30363d;border-radius:6px;color:#f2cc60;font-family:monospace;font-size:10px;padding:6px;outline:none;resize:none;">${sqlSchema}</textarea>
                                <button id="copySqlBtn" style="background:#21262d;color:#58a6ff;border:1px solid #30363d;border-radius:6px;padding:8px 10px;cursor:pointer;font-size:10px;white-space:nowrap;">📋 Copy SQL</button>
                            </div>
                        </li>
                        <li style="margin-bottom:4px;">
                            <strong>Create R2 Storage Bucket:</strong> Go to <code>R2 Object Storage</code> ➔ Click <code>Create Bucket</code> ➔ Name it <code>jobassistantpremium</code>.
                        </li>
                        <li>
                            <strong>Deploy Worker Script:</strong> In your terminal run <code>npx wrangler deploy</code> and paste your deployed Worker URL below!
                        </li>
                    </ol>
                </div>

                <!-- INPUT FIELDS -->
                <div style="margin-bottom:10px;">
                    <label style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:4px;font-size:11px;">
                        1. Cloudflare Worker Endpoint URL:
                    </label>
                    <input type="text" id="cfWorkerUrlInput" value="${currentEndpoint}" placeholder="https://job-ai-backend.ahmed-mohammed8694.workers.dev" style="width:100%;padding:9px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#f97316;font-family:monospace;font-size:11.5px;outline:none;" />
                </div>

                <div style="margin-bottom:10px;">
                    <label style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:4px;font-size:11px;">
                        2. Cloudflare D1 Database ID:
                    </label>
                    <input type="text" id="cfD1IdInput" value="${currentD1Id}" placeholder="e.g. 5d6e5a34-b240-463a-a14a-519538fd2fc4" style="width:100%;padding:9px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#58a6ff;font-family:monospace;font-size:11.5px;outline:none;" />
                </div>

                <div style="margin-bottom:14px;">
                    <label style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:4px;font-size:11px;">
                        3. Cloudflare R2 Bucket Name:
                    </label>
                    <input type="text" id="cfR2BucketInput" value="${currentR2Bucket}" placeholder="e.g. jobassistantpremium" style="width:100%;padding:9px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#79c0ff;font-family:monospace;font-size:11.5px;outline:none;" />
                </div>

                <div style="display:flex;gap:8px;">
                    <button id="saveCfUrlBtn" style="flex:1;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:11.5px;">
                        💾 Save Settings
                    </button>
                    <button id="resetCfUrlBtn" style="background:#21262d;color:#f85149;border:1px solid #30363d;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:500;font-size:11.5px;">
                        🔄 Reset Default
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector("#closeCfModal").onclick = () => modal.remove();

        modal.querySelector("#copySqlBtn").onclick = () => {
            const sqlText = modal.querySelector("#sqlQueryTextarea").value;
            if (typeof GM_setClipboard === "function") {
                GM_setClipboard(sqlText);
            }
            alert("📋 SQL Table Creation Schema copied to clipboard!");
        };

        modal.querySelector("#saveCfUrlBtn").onclick = () => {
            const newWorkerUrl = modal.querySelector("#cfWorkerUrlInput").value.trim();
            const newD1Id = modal.querySelector("#cfD1IdInput").value.trim();
            const newR2Bucket = modal.querySelector("#cfR2BucketInput").value.trim();

            if (typeof GM_setValue === "function") {
                GM_setValue("customWorkerUrl", newWorkerUrl);
                GM_setValue("customD1Id", newD1Id);
                GM_setValue("customR2Bucket", newR2Bucket);
            }
            try {
                localStorage.setItem("customWorkerUrl", newWorkerUrl);
                localStorage.setItem("customD1Id", newD1Id);
                localStorage.setItem("customR2Bucket", newR2Bucket);
            } catch(e) {}

            alert("✅ Cloudflare Database & R2 Bucket Settings saved successfully!");
            modal.remove();
        };

        modal.querySelector("#resetCfUrlBtn").onclick = () => {
            modal.querySelector("#cfWorkerUrlInput").value = WORKER_URL;
            modal.querySelector("#cfD1IdInput").value = "5d6e5a34-b240-463a-a14a-519538fd2fc4";
            modal.querySelector("#cfR2BucketInput").value = "jobassistantpremium";

            if (typeof GM_setValue === "function") {
                GM_setValue("customWorkerUrl", "");
                GM_setValue("customD1Id", "");
                GM_setValue("customR2Bucket", "");
            }
            try {
                localStorage.setItem("customWorkerUrl", "");
                localStorage.setItem("customD1Id", "");
                localStorage.setItem("customR2Bucket", "");
            } catch(e) {}

            alert("🔄 Cloudflare Settings reset to default.");
        };
    }

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

    // ── GEMINI AI CONFIG & FALLBACK CHAIN ──
    const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-2.0-flash-exp"];

    function getSelectedGeminiModel() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("selectedGeminiModel", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("selectedGeminiModel") : "";
            return (gm || ls || "").trim() || "gemini-2.0-flash";
        } catch(e) { return "gemini-2.0-flash"; }
    }

    function getGoogleAccessToken() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("googleAccessToken", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("googleAccessToken") : "";
            return (gm || ls || "").trim();
        } catch(e) { return ""; }
    }

    function callGeminiApi(prompt, apiKey, maxTokens, onSuccess, onError, modelIndex = 0) {
        let modelsToTry = GEMINI_MODELS.slice();
        const preferred = getSelectedGeminiModel();
        if (preferred && modelsToTry.includes(preferred)) {
            modelsToTry = [preferred].concat(modelsToTry.filter(m => m !== preferred));
        }

        if (modelIndex >= modelsToTry.length) {
            onError("All Gemini model endpoints failed.");
            return;
        }

        const modelName = modelsToTry[modelIndex];
        const accessToken = getGoogleAccessToken();
        const effectiveKey = apiKey || getGeminiApiKey();

        let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
        const headers = { "Content-Type": "application/json" };

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        } else if (effectiveKey) {
            apiUrl += `?key=${encodeURIComponent(effectiveKey)}`;
            headers["X-goog-api-key"] = effectiveKey;
        } else {
            apiUrl += `?key=${encodeURIComponent("AIzaSyDummyKey")}`;
        }

        GM_xmlhttpRequest({
            method: "POST",
            url: apiUrl,
            headers: headers,
            anonymous: false,
            data: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: maxTokens || 8192 }
            }),
            onload: function (response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.candidates && data.candidates[0] && data.candidates[0].content
                    && data.candidates[0].content.parts && data.candidates[0].content.parts[0]
                    ? String(data.candidates[0].content.parts[0].text || "").trim() : "";

                if (text) {
                    onSuccess(text, modelName);
                } else if (response.status === 404 && modelIndex + 1 < modelsToTry.length) {
                    console.warn(`[Job Assistant] Model ${modelName} returned 404. Retrying with ${modelsToTry[modelIndex + 1]}...`);
                    callGeminiApi(prompt, apiKey, maxTokens, onSuccess, onError, modelIndex + 1);
                } else {
                    onError(response.responseText || `HTTP Status ${response.status}`, response.status);
                }
            },
            onerror: function (err) {
                if (modelIndex + 1 < modelsToTry.length) {
                    callGeminiApi(prompt, apiKey, maxTokens, onSuccess, onError, modelIndex + 1);
                } else {
                    onError("Network error calling Gemini API.");
                }
            }
        });
    }

    // ── MULTI-AI PROVIDERS (GEMINI, OPENAI CHATGPT, XAI GROK) ──

    function getOpenAiApiKey() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("openAiApiKey", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("openAiApiKey") : "";
            return (gm || ls || "").trim();
        } catch(e) { return ""; }
    }

    function getGrokApiKey() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("grokApiKey", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("grokApiKey") : "";
            return (gm || ls || "").trim();
        } catch(e) { return ""; }
    }

    function getSelectedAiProvider() {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue("selectedAiProvider", "") : "";
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem("selectedAiProvider") : "";
            return (gm || ls || "").trim() || "auto";
        } catch(e) { return "auto"; }
    }

    function getSelectedProviderLabel() {
        const pref = (gmGet("selectedAiProvider", "gemini") || "gemini").toLowerCase();
        const pDef = AI_PROVIDERS.find(p => p.id === pref);
        return pDef ? pDef.label : "AI";
    }


    function callOpenAiApi(prompt, apiKey, maxTokens, onSuccess, onError, modelName = "gpt-4o-mini") {
        const key = apiKey || getOpenAiApiKey();
        if (!key) {
            onError("No OpenAI API key configured.");
            return;
        }

        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.openai.com/v1/chat/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            anonymous: false,
            data: JSON.stringify({
                model: modelName || "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                max_tokens: maxTokens || 4000,
                temperature: 0.7
            }),
            onload: function (response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.choices && data.choices[0] && data.choices[0].message
                    ? String(data.choices[0].message.content || "").trim() : "";

                if (text) {
                    onSuccess(text, modelName || "gpt-4o-mini");
                } else {
                    onError(response.responseText || `OpenAI HTTP Status ${response.status}`, response.status);
                }
            },
            onerror: function (err) {
                onError("Network error calling OpenAI API.");
            }
        });
    }

    function callGrokApi(prompt, apiKey, maxTokens, onSuccess, onError, modelName = "grok-2-latest") {
        const key = apiKey || getGrokApiKey();
        if (!key) {
            onError("No xAI Grok API key configured.");
            return;
        }

        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.x.ai/v1/chat/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            anonymous: false,
            data: JSON.stringify({
                model: modelName || "grok-2-latest",
                messages: [{ role: "user", content: prompt }],
                max_tokens: maxTokens || 4000,
                temperature: 0.7
            }),
            onload: function (response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.choices && data.choices[0] && data.choices[0].message
                    ? String(data.choices[0].message.content || "").trim() : "";

                if (text) {
                    onSuccess(text, modelName || "grok-2-latest");
                } else {
                    onError(response.responseText || `xAI Grok HTTP Status ${response.status}`, response.status);
                }
            },
            onerror: function (err) {
                onError("Network error calling xAI Grok API.");
            }
        });
    }

    // Smart Multi-AI Provider Failover Chain — uses vault keys with auto-rotation
    function callMultiProviderAiApi(prompt, maxTokens, onSuccess, onError) {
        // Build ordered list of providers: user-selected first, then rest
        const ALL_ORDER = ["gemini", "openai", "grok", "openrouter", "claude"];
        const userPick  = (gmGet("selectedAiProvider", "gemini") || "gemini").toLowerCase();
        const PROVIDER_ORDER = [userPick];

        // Try a specific provider's vault keys in sequence
        async function tryProviderVault(providerId, remainingKeys, onProviderFail) {
            if (!remainingKeys || remainingKeys.length === 0) {
                onProviderFail(`No active keys for ${providerId}`);
                return;
            }

            const keyEntry = remainingKeys[0];
            const restKeys = remainingKeys.slice(1);
            // Prefer user-selected model from the dropdown, then key's saved model, then default
            const userModel = gmGet("selectedModel_" + providerId, null);
            const model = userModel || keyEntry.model || null;

            function onKeyFail(err, status) {
                const is429 = (status === 429 || (err && err.toLowerCase && err.toLowerCase().includes("quota")));
                console.warn(`[Job Assistant] ${providerId} key #${keyEntry.accountEmail || "?"} failed (${status || err}). Rotating...`);
                if (is429 || status === 403) {
                    rotateKeyOnFailure(providerId, keyEntry.key);
                }
                tryProviderVault(providerId, restKeys, onProviderFail);
            }

            if (providerId === "gemini") {
                callGeminiApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail);
            } else if (providerId === "openai") {
                callOpenAiApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail, model || "gpt-4o-mini");
            } else if (providerId === "grok") {
                callGrokApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail, model || "grok-2-latest");
            } else if (providerId === "openrouter") {
                callOpenRouterApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail, model || "meta-llama/llama-3.3-70b-instruct:free");
            } else if (providerId === "claude") {
                callClaudeApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail, model || "claude-haiku-3-5");
            } else if (providerId === "omniroute") {
                callOmniRouteApi(prompt, keyEntry.key, maxTokens, onSuccess, onKeyFail, model || "auto");
            } else {
                onProviderFail("Unknown provider: " + providerId);
            }
        }

        // Try providers in order
        async function tryNextProvider(providerIdx) {
            if (providerIdx >= PROVIDER_ORDER.length) {
                onError(`All API keys for your active provider (${userPick.toUpperCase()}) are exhausted or rate-limited. Please add more API keys to the vault.`);
                return;
            }
            const pid = PROVIDER_ORDER[providerIdx];
            const keys = getLocalKeysForProvider(pid).filter(k => k.active !== false);
            if (keys.length === 0) {
                tryNextProvider(providerIdx + 1);
                return;
            }
            tryProviderVault(pid, keys, () => tryNextProvider(providerIdx + 1));
        }

        // Also respect legacy single-key fallbacks for backward compat
        const legacyGemini  = [getGeminiApiKey()].filter(Boolean).map(k => ({ key: k, accountEmail: "", model: getSelectedGeminiModel(), active: true, failCount: 0 }));
        const legacyOpenAi  = [getOpenAiApiKey()].filter(Boolean).map(k => ({ key: k, accountEmail: "", model: "gpt-4o-mini", active: true, failCount: 0 }));
        const legacyGrok    = [getGrokApiKey()].filter(Boolean).map(k => ({ key: k, accountEmail: "", model: "grok-2-latest", active: true, failCount: 0 }));

        // Merge vault keys + legacy keys (dedup by key value)
        function mergeKeys(pid, legacy) {
            const vault = getLocalKeysForProvider(pid).filter(k => k.active !== false);
            const all = [...vault];
            legacy.forEach(lk => { if (!all.find(v => v.key === lk.key)) all.push(lk); });
            return all;
        }

        const geminiKeys    = mergeKeys("gemini", legacyGemini);
        const openaiKeys    = mergeKeys("openai", legacyOpenAi);
        const grokKeys      = mergeKeys("grok", legacyGrok);
        const openrouterKeys = getLocalKeysForProvider("openrouter").filter(k => k.active !== false);
        const claudeKeys    = getLocalKeysForProvider("claude").filter(k => k.active !== false);
        const omnirouteKeys  = getLocalKeysForProvider("omniroute").filter(k => k.active !== false);

        const allProviderKeys = { gemini: geminiKeys, openai: openaiKeys, grok: grokKeys, openrouter: openrouterKeys, claude: claudeKeys, omniroute: omnirouteKeys };

        async function tryNextProviderMerged(providerIdx) {
            if (providerIdx >= PROVIDER_ORDER.length) {
                onError(`All API keys for your active provider (${userPick.toUpperCase()}) are exhausted or rate-limited. Please add more API keys to the vault.`);
                return;
            }
            const pid = PROVIDER_ORDER[providerIdx];
            const keys = allProviderKeys[pid] || [];
            if (keys.length === 0) {
                tryNextProviderMerged(providerIdx + 1);
                return;
            }
            tryProviderVault(pid, keys, () => tryNextProviderMerged(providerIdx + 1));
        }


        tryNextProviderMerged(0);
    }

    // ── OpenRouter API (access 200+ models) ──────────────────────────────────
    function callOpenRouterApi(prompt, apiKey, maxTokens, onSuccess, onError, modelName = "meta-llama/llama-3.3-70b-instruct:free") {
        if (!apiKey) { onError("No OpenRouter API key configured."); return; }
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://openrouter.ai/api/v1/chat/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://job-ai-backend.ahmed-mohammed8694.workers.dev",
                "X-Title": "Job Assistant Premium"
            },
            anonymous: false,
            data: JSON.stringify({ model: modelName, messages: [{ role: "user", content: prompt }], max_tokens: maxTokens || 4000 }),
            onload: function(response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.choices && data.choices[0] && data.choices[0].message
                    ? String(data.choices[0].message.content || "").trim() : "";
                if (text) { onSuccess(text, modelName); }
                else { onError(response.responseText || `OpenRouter HTTP ${response.status}`, response.status); }
            },
            onerror: () => onError("Network error calling OpenRouter API.")
        });
    }

    // ── Anthropic Claude API ────────────────────────────────────────────────
    function callClaudeApi(prompt, apiKey, maxTokens, onSuccess, onError, modelName = "claude-haiku-3-5") {
        if (!apiKey) { onError("No Claude API key configured."); return; }
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.anthropic.com/v1/messages",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01"
            },
            anonymous: false,
            data: JSON.stringify({ model: modelName, max_tokens: maxTokens || 4000, messages: [{ role: "user", content: prompt }] }),
            onload: function(response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.content && data.content[0] && data.content[0].text
                    ? String(data.content[0].text || "").trim() : "";
                if (text) { onSuccess(text, modelName); }
                else { onError(response.responseText || `Claude HTTP ${response.status}`, response.status); }
            },
            onerror: () => onError("Network error calling Claude API.")
        });
    }

    function callOmniRouteApi(prompt, apiKey, maxTokens, onSuccess, onError, modelName = "auto") {
        const key = apiKey || "";
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://localhost:20128/v1/chat/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": key ? `Bearer ${key}` : ""
            },
            anonymous: false,
            data: JSON.stringify({
                model: modelName || "auto",
                messages: [{ role: "user", content: prompt }],
                max_tokens: maxTokens || 4000,
                temperature: 0.7
            }),
            onload: function (response) {
                const data = parseJsonSafe(response.responseText || "");
                const text = data && data.choices && data.choices[0] && data.choices[0].message
                    ? String(data.choices[0].message.content || "").trim() : "";

                if (text) {
                    onSuccess(text, modelName || "auto");
                } else {
                    onError(response.responseText || `OmniRoute HTTP Status ${response.status}`, response.status);
                }
            },
            onerror: function (err) {
                onError("Network error calling OmniRoute API. Make sure OmniRoute is running locally on http://localhost:20128");
            }
        });
    }


    function getGeminiApiKey() {
        try {
            const gmKey = typeof GM_getValue === "function" ? GM_getValue("geminiApiKey", "") : "";
            const lsKey = typeof localStorage !== "undefined" ? localStorage.getItem("geminiApiKey") : "";
            return (gmKey || lsKey || "").trim();
        } catch (e) { return ""; }
    }

    function getSelectedGeminiModel() {
        return gmGet("selectedModel_gemini", "gemini-2.0-flash") || "gemini-2.0-flash";
    }

    // Alias for backward-compat (keyBtn wires to this)
    function showGeminiKeyModal() { showAiProviderModal(); }

    // Persist selected provider + model
    function setSelectedProvider(pid) { gmSet("selectedAiProvider", pid); }
    function setSelectedModel(pid, model) { gmSet("selectedModel_" + pid, model); }

    // Get the active key email for a given provider
    function getActiveKeyEmail(pid) {
        const allKeys = getLocalKeysForProvider(pid);
        if (!allKeys.length) return "No key saved";
        const active = allKeys.filter(k => k.active !== false);
        if (!active.length) {
            return `${allKeys[0].accountEmail || "Key"} (Deactivated)`;
        }
        return active[0].accountEmail || "(no email saved)";
    }

    // ── AI PROVIDER CONFIG ────────────────────────────────────────────────────
    const AI_PROVIDERS = [
        { id: "gemini",     label: "Gemini",      icon: "✨", color: "#58a6ff", bg: "rgba(56,139,253,0.12)",  border: "rgba(56,139,253,0.35)",  models: ["gemini-2.0-flash","gemini-1.5-pro-latest","gemini-1.5-flash-latest","gemini-2.0-flash-exp"],               apiLink: "https://aistudio.google.com/app/apikey",           apiLinkLabel: "Get Free Gemini Key" },
        { id: "openai",     label: "ChatGPT",     icon: "🟢", color: "#3fb950", bg: "rgba(63,185,80,0.12)",   border: "rgba(63,185,80,0.35)",   models: ["gpt-4o","gpt-4o-mini","gpt-4-turbo","o3-mini","o1-mini"],                                                            apiLink: "https://platform.openai.com/api-keys",             apiLinkLabel: "Get OpenAI Key" },
        { id: "grok",       label: "Grok",        icon: "🚀", color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.35)",  models: ["grok-2-latest","grok-3-latest","grok-beta"],                                                                         apiLink: "https://console.x.ai/",                            apiLinkLabel: "Get Grok Key" },
        { id: "openrouter", label: "OpenRouter",  icon: "🔀", color: "#a371f7", bg: "rgba(163,113,247,0.12)", border: "rgba(163,113,247,0.35)", models: ["meta-llama/llama-3.3-70b-instruct:free","anthropic/claude-sonnet-4","google/gemini-2.0-flash-exp:free","deepseek/deepseek-chat","mistralai/mistral-large"], apiLink: "https://openrouter.ai/keys", apiLinkLabel: "Get OpenRouter Key" },
        { id: "omniroute",  label: "OmniRoute",   icon: "🌐", color: "#f2cc60", bg: "rgba(242,204,96,0.12)",  border: "rgba(242,204,96,0.35)",  models: ["auto","cheapest","fastest"],                                                                                         apiLink: "https://omniroute.ai",                             apiLinkLabel: "Get OmniRoute Key" },
        { id: "claude",     label: "Claude",      icon: "🧠", color: "#ff7b72", bg: "rgba(255,123,114,0.12)", border: "rgba(255,123,114,0.35)", models: ["claude-sonnet-4-5","claude-3-7-sonnet-latest","claude-haiku-3-5","claude-opus-4-5"],                                    apiLink: "https://console.anthropic.com/settings/keys",       apiLinkLabel: "Get Claude Key" }
    ];

    // Helper: read a value from GM storage or localStorage
    function gmGet(key, def) {
        try {
            const gm = typeof GM_getValue === "function" ? GM_getValue(key, def) : def;
            const ls = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
            if (gm !== def && gm !== null && gm !== undefined) return gm;
            if (ls !== null && ls !== undefined) return ls;
        } catch(e) {}
        return def;
    }
    function gmSet(key, val) {
        try { if (typeof GM_setValue === "function") GM_setValue(key, val); } catch(e) {}
        try { localStorage.setItem(key, val); } catch(e) {}
    }

    // Get all locally stored keys for a provider (array)
    function getLocalKeysForProvider(providerId) {
        try {
            const raw = gmGet("aiKeys_" + providerId, "");
            return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
    }
    function setLocalKeysForProvider(providerId, keysArr) {
        gmSet("aiKeys_" + providerId, JSON.stringify(keysArr));
    }

    // Get next active key for a provider (local first, then tries DB rotation)
    async function getNextActiveKey(providerId) {
        const keys = getLocalKeysForProvider(providerId);
        const active = keys.filter(k => k.active !== false);
        if (active.length > 0) return active[0];
        return null;
    }

    // Mark a key as failed locally, then call DB rotate
    async function rotateKeyOnFailure(providerId, failedApiKey) {
        let keys = getLocalKeysForProvider(providerId);
        keys = keys.map(k => {
            if (k.key === failedApiKey) {
                k.failCount = (k.failCount || 0) + 1;
                if (k.failCount >= 3) k.active = false;
            }
            return k;
        });
        // Move failed key to end
        const failed = keys.filter(k => k.key === failedApiKey);
        const rest   = keys.filter(k => k.key !== failedApiKey);
        setLocalKeysForProvider(providerId, [...rest, ...failed]);

        // Notify Cloudflare D1 via /api/keys/rotate (best-effort)
        try {
            const ownerEmail = gmGet("ownerEmail", "");
            const keyEntry = keys.find(k => k.key === failedApiKey);
            if (ownerEmail && keyEntry && keyEntry.dbId) {
                await fetch(`${getWorkerUrl()}/api/keys/rotate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ keyId: keyEntry.dbId, ownerEmail, provider: providerId })
                });
            }
        } catch(e) {}

        // Return next active key
        const updated = getLocalKeysForProvider(providerId);
        const next = updated.filter(k => k.active !== false && k.key !== failedApiKey);
        return next.length > 0 ? next[0] : null;
    }

    function getConnectedUserName() {
        return gmGet("connectedUserName", PROFILE.name) || PROFILE.name;
    }

    function getConnectedUserEmail() {
        const email = gmGet("connectedUserEmail", PROFILE.email) || PROFILE.email;
        return (email || "").toLowerCase().trim();
    }

    // ── showAiProviderModal — Step 1: Provider Grid ────────────────────────────
    function showAiProviderModal() {
        // Alias: clicking the 🔑 API Key button now opens this
        const old = document.getElementById("ai-provider-modal");
        if (old) old.remove();

        // Also remove legacy modal if open
        const legacyOld = document.getElementById("gemini-key-modal");
        if (legacyOld) legacyOld.remove();

        const modal = document.createElement("div");
        modal.id = "ai-provider-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;max-height:92vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:18px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 70px rgba(0,0,0,0.9);font-family:system-ui,-apple-system,sans-serif;";

        // Build provider grid
        const providerCards = AI_PROVIDERS.map(p => {
            const keys = getLocalKeysForProvider(p.id);
            const count = keys.length;
            const active = keys.filter(k => k.active !== false).length;
            return `<div id="pCard_${p.id}" data-pid="${p.id}" style="background:${p.bg};border:1px solid ${p.border};border-radius:14px;padding:14px 10px;cursor:pointer;text-align:center;transition:all .2s;user-select:none;position:relative;">
                <div style="font-size:26px;margin-bottom:6px;">${p.icon}</div>
                <div style="font-weight:700;color:${p.color};font-size:12px;">${p.label}</div>
                <div style="font-size:10px;color:#8b949e;margin-top:4px;">${count > 0 ? `<span style="color:${p.color};">${active}/${count} keys</span>` : "No keys"}</div>
                ${count > 0 ? `<div style="position:absolute;top:6px;right:8px;width:8px;height:8px;border-radius:50%;background:${active > 0 ? "#3fb950" : "#f85149"};"></div>` : ""}
            </div>`;
        }).join("");

        modal.innerHTML = `
            <div style="padding:20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <strong style="color:#f2cc60;font-size:15px;">🤖 AI Provider Vault</strong>
                    <span id="closeAiProviderModal" style="cursor:pointer;font-size:18px;color:#8b949e;line-height:1;">✖</span>
                </div>
                <p style="color:#8b949e;font-size:11px;margin:0 0 16px;">Select a provider to manage API keys. Keys auto-rotate when quota is hit.</p>

                <!-- Owner Email -->
                <div style="margin-bottom:14px;">
                    <label style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:4px;font-size:11px;">👤 Your Email (for key vault sync):</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="ownerEmailInput" value="${gmGet("ownerEmail", PROFILE.email)}" placeholder="your@email.com" style="flex:1;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#58a6ff;font-size:11.5px;outline:none;" />
                        <button id="saveOwnerEmailBtn" style="background:#238636;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer;font-weight:600;font-size:11px;">💾 Save</button>
                    </div>
                </div>

                <!-- Provider Grid -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
                    ${providerCards}
                </div>

                <div style="background:#161b22;border:1px solid #21262d;border-radius:10px;padding:10px;font-size:10.5px;color:#8b949e;line-height:1.6;">
                    💡 <strong style="color:#f2cc60;">How it works:</strong> Add multiple API keys per provider. When one key hits its token limit (Error 429), the script automatically switches to your next available key — no manual action needed.
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.querySelector("#closeAiProviderModal").onclick = () => modal.remove();

        modal.querySelector("#saveOwnerEmailBtn").onclick = () => {
            const em = modal.querySelector("#ownerEmailInput").value.trim();
            if (em) {
                gmSet("ownerEmail", em);
                gmSet("connectedUserEmail", em);
                PROFILE.email = em;
                modal.querySelector("#saveOwnerEmailBtn").textContent = "✅ Saved!";
                setTimeout(() => { if (modal.querySelector("#saveOwnerEmailBtn")) modal.querySelector("#saveOwnerEmailBtn").textContent = "💾 Save"; }, 1500);
            }
        };

        // Provider card click → show config panel
        AI_PROVIDERS.forEach(p => {
            const card = modal.querySelector(`#pCard_${p.id}`);
            if (card) {
                card.onmouseenter = () => { card.style.transform = "translateY(-3px)"; card.style.boxShadow = `0 8px 24px rgba(0,0,0,0.5)`; };
                card.onmouseleave = () => { card.style.transform = ""; card.style.boxShadow = ""; };
                card.onclick = () => {
                    const em = modal.querySelector("#ownerEmailInput").value.trim();
                    if (em) { gmSet("ownerEmail", em); gmSet("connectedUserEmail", em); PROFILE.email = em; }
                    modal.remove();
                    showProviderConfigPanel(p.id);
                };
            }
        });
    }

    // Alias for backward compat (old code references showGeminiKeyModal)
    function showGeminiKeyModal() { showAiProviderModal(); }

    // ── showProviderConfigPanel — Step 2: Per-Provider Key Management ──────────
    function showProviderConfigPanel(providerId) {
        const old = document.getElementById("ai-provider-config-modal");
        if (old) old.remove();

        const p = AI_PROVIDERS.find(x => x.id === providerId);
        if (!p) return;

        let keys = getLocalKeysForProvider(providerId);
        const ownerEmail = gmGet("ownerEmail", PROFILE.email);

        function renderModal() {
            const existMod = document.getElementById("ai-provider-config-modal");
            if (existMod) existMod.remove();

            const mod = document.createElement("div");
            mod.id = "ai-provider-config-modal";
            mod.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:92vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:18px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 70px rgba(0,0,0,0.9);font-family:system-ui,-apple-system,sans-serif;";

            // Build key list rows
            const keyRows = keys.length === 0
                ? `<div style="text-align:center;color:#8b949e;padding:18px;font-size:11px;">No keys saved yet. Add your first key below.</div>`
                : keys.map((k, i) => `
                <div style="display:flex;align-items:center;gap:6px;background:${k.active === false ? "rgba(248,81,73,0.07)" : "rgba(56,139,253,0.07)"};border:1px solid ${k.active === false ? "rgba(248,81,73,0.25)" : "rgba(56,139,253,0.2)"};border-radius:10px;padding:9px 10px;margin-bottom:6px;">
                    <span style="color:#8b949e;font-size:10px;min-width:22px;">#${i + 1}</span>
                    <div style="flex:1;min-width:0;">
                        <div style="color:${p.color};font-family:monospace;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k.key.slice(0, 6)}...${k.key.slice(-4)}</div>
                        <div style="color:#8b949e;font-size:10px;margin-top:2px;">${k.accountEmail || "No email"} · ${k.model || "Default model"} · Fails: ${k.failCount || 0}</div>
                    </div>
                    <span style="width:8px;height:8px;border-radius:50%;background:${k.active === false ? "#f85149" : "#3fb950"};flex-shrink:0;"></span>
                    <button data-kidx="${i}" data-action="toggle" style="background:#21262d;color:#8b949e;border:1px solid #30363d;border-radius:6px;padding:4px 7px;cursor:pointer;font-size:10px;">${k.active === false ? "Enable" : "Pause"}</button>
                    <button data-kidx="${i}" data-action="delete" style="background:rgba(248,81,73,0.15);color:#f85149;border:1px solid rgba(248,81,73,0.3);border-radius:6px;padding:4px 7px;cursor:pointer;font-size:10px;">🗑</button>
                </div>`).join("");

            // Model options
            const modelOpts = p.models.map(m => `<option value="${m}">${m}</option>`).join("");

            const currentSelectedModel = gmGet("selectedModel_" + p.id, p.models[0]);

            mod.innerHTML = `
                <div style="padding:20px;">
                    <!-- Header -->
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <button id="backToProviderGrid" style="background:#21262d;color:#8b949e;border:1px solid #30363d;border-radius:7px;padding:5px 10px;cursor:pointer;font-size:11px;">← Back</button>
                            <strong style="color:${p.color};font-size:14px;">${p.icon} ${p.label} API Keys</strong>
                        </div>
                        <span id="closeProviderConfigModal" style="cursor:pointer;font-size:18px;color:#8b949e;">✖</span>
                    </div>
                    <p style="color:#8b949e;font-size:10.5px;margin:0 0 14px;">Keys are tried in order #1 → #2 → #3. On 429/quota error the next key is used automatically.</p>

                    <!-- Default Model -->
                    <div style="margin-bottom:12px;">
                        <label style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:4px;font-size:11px;">🎯 Default Model for ${p.label}:</label>
                        <select id="providerModelSelect" style="width:100%;padding:9px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:${p.color};font-size:11.5px;font-weight:600;outline:none;cursor:pointer;">
                            ${modelOpts}
                        </select>
                    </div>

                    <!-- Saved Keys List -->
                    <div style="margin-bottom:12px;">
                        <div style="font-weight:600;color:#c9d1d9;font-size:11px;margin-bottom:8px;">🔑 Saved Keys (${keys.length}):</div>
                        <div id="keyListContainer">${keyRows}</div>
                    </div>

                    <!-- Add New Key -->
                    <div style="background:rgba(56,139,253,0.05);border:1px solid rgba(56,139,253,0.2);border-radius:12px;padding:14px;margin-bottom:14px;">
                        <div style="font-weight:600;color:#79c0ff;font-size:11.5px;margin-bottom:10px;">➕ Add New Key:</div>
                        <div style="margin-bottom:8px;">
                            <label style="display:block;font-size:10.5px;color:#8b949e;margin-bottom:4px;">Account Email (for this key):</label>
                            <input type="email" id="newKeyEmail" placeholder="account@gmail.com" style="width:100%;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:7px;color:#e6edf3;font-size:11px;outline:none;" />
                        </div>
                        <div style="margin-bottom:10px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                                <label style="font-size:10.5px;color:#8b949e;">API Key:</label>
                                <a href="${p.apiLink}" target="_blank" style="color:${p.color};font-size:10px;text-decoration:none;">${p.apiLinkLabel} →</a>
                            </div>
                            <input type="text" id="newKeyValue" placeholder="Paste your ${p.label} API key here..." style="width:100%;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:7px;color:${p.color};font-family:monospace;font-size:11px;outline:none;" />
                        </div>
                        <div style="display:flex;gap:8px;">
                            <button id="addKeyToVaultBtn" style="flex:1;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:700;font-size:11.5px;">+ Add Key to Vault</button>
                            <button id="syncToD1Btn" style="background:#21262d;color:#58a6ff;border:1px solid #30363d;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:600;font-size:11px;">☁ Sync All to D1</button>
                        </div>
                    </div>

                    <!-- Status -->
                    <div id="providerConfigStatus" style="min-height:24px;text-align:center;font-size:11px;color:#3fb950;"></div>
                </div>
            `;

            document.body.appendChild(mod);

            // Set current model selection
            const sel = mod.querySelector("#providerModelSelect");
            if (sel) {
                sel.value = currentSelectedModel;
                sel.onchange = () => gmSet("selectedModel_" + p.id, sel.value);
            }

            const status = mod.querySelector("#providerConfigStatus");
            function showStatus(msg, color = "#3fb950") {
                if (status) { status.style.color = color; status.textContent = msg; setTimeout(() => { if (status) status.textContent = ""; }, 3000); }
            }

            mod.querySelector("#closeProviderConfigModal").onclick = () => mod.remove();
            mod.querySelector("#backToProviderGrid").onclick = () => { mod.remove(); showAiProviderModal(); };

            // Toggle / Delete key buttons
            mod.querySelectorAll("[data-action=toggle]").forEach(btn => {
                btn.onclick = () => {
                    const idx = parseInt(btn.dataset.kidx);
                    keys[idx].active = keys[idx].active === false ? true : false;
                    if (keys[idx].active === true) {
                        keys[idx].failCount = 0;
                    }
                    setLocalKeysForProvider(providerId, keys);
                    renderModal();
                };
            });
            mod.querySelectorAll("[data-action=delete]").forEach(btn => {
                btn.onclick = async () => {
                    const idx = parseInt(btn.dataset.kidx);
                    const k = keys[idx];
                    keys.splice(idx, 1);
                    setLocalKeysForProvider(providerId, keys);
                    // Delete from D1 if we have a DB id
                    if (k.dbId && ownerEmail) {
                        try { await fetch(`${getWorkerUrl()}/api/keys/delete/${k.dbId}?ownerEmail=${encodeURIComponent(ownerEmail)}`, { method: "DELETE" }); } catch(e) {}
                    }
                    renderModal();
                };
            });

            // Add new key
            mod.querySelector("#addKeyToVaultBtn").onclick = () => {
                const newEmail = mod.querySelector("#newKeyEmail").value.trim();
                const newKey   = mod.querySelector("#newKeyValue").value.trim();
                const model    = mod.querySelector("#providerModelSelect").value;
                if (!newKey) { showStatus("⚠️ Please paste an API key first.", "#f85149"); return; }
                // Avoid duplicates
                if (keys.find(k => k.key === newKey)) { showStatus("⚠️ This key is already in your vault.", "#f97316"); return; }
                keys.push({ key: newKey, accountEmail: newEmail, model, active: true, failCount: 0, dbId: null });
                setLocalKeysForProvider(providerId, keys);
                // Also update legacy storage for backward compat
                if (providerId === "gemini") gmSet("geminiApiKey", newKey);
                if (providerId === "openai") gmSet("openAiApiKey", newKey);
                if (providerId === "grok")   gmSet("grokApiKey",   newKey);
                gmSet("selectedModel_" + providerId, model);
                mod.querySelector("#newKeyEmail").value = "";
                mod.querySelector("#newKeyValue").value = "";
                showStatus(`✅ Key added! You now have ${keys.length} key(s) for ${p.label}.`);
                renderModal();
            };

            // Sync all keys to Cloudflare D1
            mod.querySelector("#syncToD1Btn").onclick = async () => {
                if (!ownerEmail) { showStatus("⚠️ Set your email first on the provider selection screen.", "#f85149"); return; }
                showStatus("⏳ Syncing to Cloudflare D1...", "#f2cc60");
                let synced = 0;
                for (const k of keys) {
                    try {
                        const res = await fetch(`${getWorkerUrl()}/api/keys/save`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ ownerEmail, provider: p.id, apiKey: k.key, accountEmail: k.accountEmail, modelName: k.model })
                        });
                        if (res.ok) synced++;
                    } catch(e) {}
                }
                showStatus(`✅ Synced ${synced}/${keys.length} keys to Cloudflare D1 Vault.`);
            };
        }

        renderModal();
    }

    function getDefaultAiPromptTemplate(type = "email") {
        if (type === "whatsapp") {
            return `You are an elite executive career advisor writing a concise, high-converting WHATSAPP message for a candidate applying for the {JOB_TITLE} position at {COMPANY_NAME}.

CANDIDATE RESUME SUMMARY:
{RESUME_TEXT}

TARGET JOB DETAILS:
- Role Title: {JOB_TITLE}
- Company Name: {COMPANY_NAME}

TARGET JOB DESCRIPTION:
{JOB_DESCRIPTION}

PROMPT INSTRUCTIONS:
1. Deeply analyze the TARGET JOB DESCRIPTION against the CANDIDATE RESUME SUMMARY above.
2. Craft a short, high-converting WhatsApp message under 110 words (plain text only, no bold asterisks or markdown formatting).
3. Highlight 2-3 key metrics/achievements from the resume that directly match this job's core requirements.
4. EXCLUSIVELY extract candidate's Contact Name, Phone, Email, LinkedIn URL, and Portfolio URL directly from the CANDIDATE RESUME SUMMARY text above. DO NOT use any default values. If any contact detail is missing, leave that line blank.

STRICT SIGNATURE & LAYOUT FORMAT:

Dear Hiring Manager,

[Concise, high-converting pitch explaining why candidate matches {JOB_TITLE} at {COMPANY_NAME}]

Key Highlights:
- [Metric 1]
- [Metric 2]

Best regards,
[Candidate Full Name extracted strictly from Resume]
[Candidate Phone extracted strictly from Resume, or leave blank if missing]
[Candidate Email extracted strictly from Resume, or leave blank if missing]
LinkedIn: [Candidate LinkedIn URL extracted strictly from Resume, or leave blank if missing]
Portfolio: [Candidate Portfolio URL extracted strictly from Resume, or leave blank if missing]
Resume: {RESUME_URL}

Return ONLY the clean plain text message without markdown, code blocks, or preamble.`;
        }

        if (type === "cover") {
            return `You are an elite executive career advisor writing a highly persuasive, customized COVER LETTER for a candidate applying for the {JOB_TITLE} position at {COMPANY_NAME}.

CANDIDATE RESUME SUMMARY:
{RESUME_TEXT}

TARGET JOB DETAILS:
- Role Title: {JOB_TITLE}
- Company Name: {COMPANY_NAME}

TARGET JOB DESCRIPTION:
{JOB_DESCRIPTION}

PROMPT INSTRUCTIONS:
1. Deeply analyze the TARGET JOB DESCRIPTION against the CANDIDATE RESUME SUMMARY above.
2. Write a formal, 3-paragraph executive Cover Letter (250-350 words) that articulates why candidate matches {COMPANY_NAME}'s {JOB_TITLE} role, grabbing HR's attention immediately.
3. Include a bulleted section ("Key Highlights & Relevant Achievements:") highlighting 3-4 quantified achievements from the resume that directly solve the requirements in the JD.
4. EXCLUSIVELY extract candidate's Contact Name, Phone, Email, LinkedIn URL, and Portfolio URL directly from the CANDIDATE RESUME SUMMARY text above. DO NOT use default values. If any contact detail is missing, leave that line blank.

STRICT COVER LETTER LAYOUT & SIGNATURE FORMAT:

[Candidate Full Name extracted strictly from Resume]
[Candidate Phone extracted strictly from Resume, or leave blank if missing] | [Candidate Email extracted strictly from Resume, or leave blank if missing]
LinkedIn: [Candidate LinkedIn URL extracted strictly from Resume] | Portfolio: [Candidate Portfolio URL extracted strictly from Resume] | Resume: {RESUME_URL}

Dear Hiring Manager,

[High-converting opening paragraph analyzing JD + Resume to attract HR]

Key Highlights & Relevant Achievements:
• [Achievement 1 with metric tailored to JD]
• [Achievement 2 with metric tailored to JD]
• [Achievement 3 with metric tailored to JD]

[Closing paragraph requesting an interview/discussion]

Best regards,
[Candidate Full Name extracted strictly from Resume]
[Candidate Phone extracted strictly from Resume, or leave blank if missing]
[Candidate Email extracted strictly from Resume, or leave blank if missing]
LinkedIn: [Candidate LinkedIn URL extracted strictly from Resume, or leave blank if missing]
Portfolio: [Candidate Portfolio URL extracted strictly from Resume, or leave blank if missing]
Resume: {RESUME_URL}

Return ONLY the clean body text without markdown code backticks (\`\`\`), without preamble.`;
        }

        return `You are an elite executive career advisor writing a highly persuasive, customized job application email for a candidate applying for the {JOB_TITLE} position at {COMPANY_NAME}.

CANDIDATE RESUME SUMMARY:
{RESUME_TEXT}

TARGET JOB DETAILS:
- Role Title: {JOB_TITLE}
- Company Name: {COMPANY_NAME}

TARGET JOB DESCRIPTION:
{JOB_DESCRIPTION}

PROMPT INSTRUCTIONS:
1. Deeply analyze the TARGET JOB DESCRIPTION against the CANDIDATE RESUME SUMMARY above.
2. Craft 2-3 compelling, highly persuasive paragraphs that explain exactly why the candidate is the ideal match for {COMPANY_NAME}'s {JOB_TITLE} role, grabbing HR's attention immediately.
3. Highlight 3-4 key achievements, skills, and metrics extracted from the resume that directly align with the core requirements of this role.
4. Maintain a warm, confident, highly professional tone designed to impress HR/Recruiters.
5. EXCLUSIVELY extract candidate's Contact Name, Phone, Email, LinkedIn URL, and Portfolio URL directly from the CANDIDATE RESUME SUMMARY text above. DO NOT use any default values. If any contact detail (such as phone, email, linkedin, or portfolio) is missing from the resume text, leave that specific line completely blank.

STRICT SIGNATURE & LAYOUT FORMAT (Follow this exact signature format at the end):

Dear Hiring Manager,

[High-converting introductory paragraph analyzing JD + Resume to attract HR]

Key Highlights & Relevant Achievements:
• [Achievement 1 with metric tailored to JD]
• [Achievement 2 with metric tailored to JD]
• [Achievement 3 with metric tailored to JD]

[Closing paragraph requesting an interview/discussion]

Best regards,
[Candidate Full Name extracted strictly from Resume]
[Candidate Phone extracted strictly from Resume, or leave blank if missing]
[Candidate Email extracted strictly from Resume, or leave blank if missing]
LinkedIn: [Candidate LinkedIn URL extracted strictly from Resume, or leave blank if missing]
Portfolio: [Candidate Portfolio URL extracted strictly from Resume, or leave blank if missing]
Resume: {RESUME_URL}

Return ONLY the clean body text without markdown code backticks (\`\`\`), without subject line header, without preamble.`;
    }

    function getCustomAiPromptTemplate(type = "email") {
        try {
            const key = type === "whatsapp" ? "customAiPrompt_whatsapp" : (type === "cover" ? "customAiPrompt_cover" : "customAiPrompt_email");
            let val = typeof GM_getValue === "function" ? GM_getValue(key, "") : "";
            if (!val && type === "email") {
                val = typeof GM_getValue === "function" ? GM_getValue("customAiPrompt", "") : "";
            }
            if (!val && typeof localStorage !== "undefined") {
                val = localStorage.getItem(key) || (type === "email" ? localStorage.getItem("customAiPrompt") : "");
            }
            return (val || "").trim() || getDefaultAiPromptTemplate(type);
        } catch (e) { return getDefaultAiPromptTemplate(type); }
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

        const providerPref = (gmGet("selectedAiProvider", "gemini") || "gemini").toLowerCase();
        console.log(`[Job Assistant][${providerPref.toUpperCase()}] Generating`, type, "for:", freshTitle, "@", freshCompany, "| JD length:", freshJd.length);

        const hasKeys = getLocalKeysForProvider(providerPref).some(k => k.active !== false) ||
                        (providerPref === "gemini" && getGeminiApiKey()) ||
                        (providerPref === "openai" && getOpenAiApiKey()) ||
                        (providerPref === "grok" && getGrokApiKey());

        const infoForFallback = Object.assign({}, info, { title: freshTitle, company: freshCompany, jdText: freshJd, jobDescription: freshJd });
        const staticFallback = type === "email" ? emailBody(infoForFallback) : (type === "cover" ? coverLetter(infoForFallback) : waBody(infoForFallback));

        if (!hasKeys) {
            alert(`🔑 Please configure an API key for your selected provider (${providerPref.toUpperCase()}) in the 🤖 AI Provider Vault.`);
            showAiProviderModal();
            onDone(staticFallback, true);
            return;
        }


        const activeResumeLink = getActiveResumeLink();

        const styleNote = type === "email"
            ? "Write it as a formal, highly compelling application EMAIL (no subject line, just the body text). 180-250 words."
            : (type === "cover" ? "Write it as a formal, 3-paragraph executive COVER LETTER. 250-350 words." : "Write it as a concise, high-converting WHATSAPP message. Under 110 words, plain text only (no markdown, no bold asterisks).");

        const template = getCustomAiPromptTemplate(type);
        const prompt = template
            .replace(/\{RESUME_TEXT\}/g, RESUME_TEXT)
            .replace(/\{RESUME_URL\}/g, activeResumeLink)
            .replace(/\{JOB_TITLE\}/g, freshTitle)
            .replace(/\{COMPANY_NAME\}/g, freshCompany)
            .replace(/\{JOB_DESCRIPTION\}/g, freshJd || "Job Description not fully available — customize based on Job Title and Company.")
            .replace(/\{STYLE_INSTRUCTIONS\}/g, styleNote);

        callMultiProviderAiApi(prompt, 1200, (text, modelUsed) => {
            console.log("[Job Assistant][Multi-AI] Generated fresh", type, "message via", modelUsed, "(", text.length, "chars ) for", freshTitle);
            if (!STATE.currentGenerated) {
                STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
            }
            STATE.currentGenerated[type] = text;
            onDone(text, false);
        }, (err) => {
            console.error("[Job Assistant] Multi-AI call failed, falling back to static template.", err);
            if (!STATE.currentGenerated) {
                STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
            }
            STATE.currentGenerated[type] = staticFallback;
            onDone(staticFallback, true);
        });
    }

    function getCustomAiPromptTemplate() {
        try {
            const gmPrompt = typeof GM_getValue === "function" ? GM_getValue("customAiPrompt", "") : "";
            const lsPrompt = typeof localStorage !== "undefined" ? localStorage.getItem("customAiPrompt") : "";
            return (gmPrompt || lsPrompt || "").trim() || getDefaultAiPromptTemplate();
        } catch (e) { return getDefaultAiPromptTemplate(); }
    }

    function showPromptManagerModal() {
        const old = document.getElementById("ai-prompt-modal");
        if (old) old.remove();

        let activeTab = "email";

        const modal = document.createElement("div");
        modal.id = "ai-prompt-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:90vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:16px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 60px rgba(0,0,0,0.85);font-family:system-ui,-apple-system,sans-serif;";

        modal.innerHTML = `
            <div style="padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:10px;">
                    <strong style="color:#58a6ff;font-size:14px;">✏️ AI Prompt Template Manager</strong>
                    <span id="closePromptModal" style="cursor:pointer;font-size:16px;color:#8b949e;">✖</span>
                </div>

                <!-- Tabs -->
                <div style="display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:8px;">
                    <button id="emailPromptTabBtn" style="flex:1;background:#1f6feb;color:#fff;border:none;border-radius:6px;padding:7px 4px;cursor:pointer;font-weight:600;font-size:11px;">
                        ✉️ Email
                    </button>
                    <button id="waPromptTabBtn" style="flex:1;background:#21262d;color:#8b949e;border:1px solid #30363d;border-radius:6px;padding:7px 4px;cursor:pointer;font-weight:600;font-size:11px;">
                        💬 WhatsApp
                    </button>
                    <button id="coverPromptTabBtn" style="flex:1;background:#21262d;color:#8b949e;border:1px solid #30363d;border-radius:6px;padding:7px 4px;cursor:pointer;font-weight:600;font-size:11px;">
                        📄 Cover Letter
                    </button>
                </div>

                <div style="background:rgba(56,139,253,0.08);border:1px solid rgba(56,139,253,0.25);border-radius:10px;padding:10px;margin-bottom:12px;font-size:11px;color:#8b949e;line-height:1.5;">
                    <strong style="color:#79c0ff;">💡 Available Dynamic Placeholders:</strong><br>
                    <code style="color:#f2cc60;">{RESUME_TEXT}</code>, <code style="color:#f2cc60;">{RESUME_URL}</code>, <code style="color:#f2cc60;">{JOB_TITLE}</code>, <code style="color:#f2cc60;">{COMPANY_NAME}</code>, <code style="color:#f2cc60;">{JOB_DESCRIPTION}</code>, <code style="color:#f2cc60;">{STYLE_INSTRUCTIONS}</code>
                </div>

                <!-- AI Prompt Refiner Chat Box -->
                <div style="background:#161b22;border:1px solid #30363d;border-radius:10px;padding:10px;margin-bottom:12px;">
                    <label style="display:block;font-weight:600;color:#79c0ff;margin-bottom:4px;font-size:11px;">
                        🤖 Ask Gemini to Refine / Generate Prompt:
                    </label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="aiRefineInput" placeholder="e.g. Make it shorter, focus more on sales metrics, make it aggressive..." style="flex:1;padding:8px 10px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#e6edf3;font-size:11.5px;outline:none;" />
                        <button id="aiRefineBtn" style="background:#238636;color:#fff;border:none;border-radius:6px;padding:8px 12px;cursor:pointer;font-weight:600;font-size:11px;white-space:nowrap;">
                            ✨ Generate
                        </button>
                    </div>
                </div>

                <div style="margin-bottom:14px;">
                    <label id="promptTextareaLabel" style="display:block;font-weight:600;color:#c9d1d9;margin-bottom:6px;font-size:11px;">
                        Active Email System Prompt:
                    </label>
                    <textarea id="aiPromptTextarea" style="width:100%;height:250px;padding:10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#58a6ff;font-family:monospace;font-size:11px;line-height:1.45;outline:none;resize:vertical;"></textarea>
                </div>

                <div style="display:flex;gap:8px;">
                    <button id="savePromptBtn" style="flex:1;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:11.5px;">
                        💾 Save Active Prompt
                    </button>
                    <button id="resetPromptBtn" style="background:#21262d;color:#f85149;border:1px solid #30363d;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:500;font-size:11.5px;">
                        🔄 Reset Default
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const textarea = modal.querySelector("#aiPromptTextarea");
        const textareaLabel = modal.querySelector("#promptTextareaLabel");
        const emailTabBtn = modal.querySelector("#emailPromptTabBtn");
        const waTabBtn = modal.querySelector("#waPromptTabBtn");
        const coverTabBtn = modal.querySelector("#coverPromptTabBtn");

        function loadTabPrompt(type) {
            activeTab = type;
            [emailTabBtn, waTabBtn, coverTabBtn].forEach(b => {
                b.style.background = "#21262d";
                b.style.color = "#8b949e";
                b.style.border = "1px solid #30363d";
            });

            if (type === "email") {
                emailTabBtn.style.background = "#1f6feb";
                emailTabBtn.style.color = "#fff";
                emailTabBtn.style.border = "none";
                textareaLabel.textContent = "Active Email System Prompt:";
                textarea.value = getCustomAiPromptTemplate("email");
            } else if (type === "whatsapp") {
                waTabBtn.style.background = "#2ea043";
                waTabBtn.style.color = "#fff";
                waTabBtn.style.border = "none";
                textareaLabel.textContent = "Active WhatsApp System Prompt:";
                textarea.value = getCustomAiPromptTemplate("whatsapp");
            } else {
                coverTabBtn.style.background = "#8b5cf6";
                coverTabBtn.style.color = "#fff";
                coverTabBtn.style.border = "none";
                textareaLabel.textContent = "Active Cover Letter System Prompt:";
                textarea.value = getCustomAiPromptTemplate("cover");
            }
        }

        loadTabPrompt("email");

        emailTabBtn.onclick = () => loadTabPrompt("email");
        waTabBtn.onclick = () => loadTabPrompt("whatsapp");
        coverTabBtn.onclick = () => loadTabPrompt("cover");

        modal.querySelector("#closePromptModal").onclick = () => modal.remove();

        modal.querySelector("#savePromptBtn").onclick = () => {
            const newVal = textarea.value.trim();
            const key = activeTab === "whatsapp" ? "customAiPrompt_whatsapp" : (activeTab === "cover" ? "customAiPrompt_cover" : "customAiPrompt_email");
            if (typeof GM_setValue === "function") {
                GM_setValue(key, newVal);
                if (activeTab === "email") GM_setValue("customAiPrompt", newVal);
            }
            try {
                localStorage.setItem(key, newVal);
                if (activeTab === "email") localStorage.setItem("customAiPrompt", newVal);
            } catch (e) { }
            alert(`✅ ${activeTab === "whatsapp" ? "WhatsApp" : (activeTab === "cover" ? "Cover Letter" : "Email")} Custom AI Prompt saved!`);
            modal.remove();
        };

        modal.querySelector("#resetPromptBtn").onclick = () => {
            const defPrompt = getDefaultAiPromptTemplate(activeTab);
            textarea.value = defPrompt;
            const key = activeTab === "whatsapp" ? "customAiPrompt_whatsapp" : (activeTab === "cover" ? "customAiPrompt_cover" : "customAiPrompt_email");
            if (typeof GM_setValue === "function") {
                GM_setValue(key, "");
                if (activeTab === "email") GM_setValue("customAiPrompt", "");
            }
            try {
                localStorage.setItem(key, "");
                if (activeTab === "email") localStorage.setItem("customAiPrompt", "");
            } catch (e) { }
            alert(`🔄 ${activeTab === "whatsapp" ? "WhatsApp" : (activeTab === "cover" ? "Cover Letter" : "Email")} prompt reset to default template.`);
        };

        modal.querySelector("#aiRefineBtn").onclick = () => {
            const instruction = modal.querySelector("#aiRefineInput").value.trim();
            if (!instruction) {
                alert("⚠️ Please enter a command/instruction for refining (e.g. 'Make it shorter and emphasize sales metrics').");
                return;
            }

            const providerPref = (gmGet("selectedAiProvider", "gemini") || "gemini").toLowerCase();
            const hasKeys = getLocalKeysForProvider(providerPref).some(k => k.active !== false) ||
                            (providerPref === "gemini" && getGeminiApiKey()) ||
                            (providerPref === "openai" && getOpenAiApiKey()) ||
                            (providerPref === "grok" && getGrokApiKey());

            if (!hasKeys) {
                alert(`🔑 Please configure an API key for your selected provider (${providerPref.toUpperCase()}) in the 🤖 AI Provider Vault.`);
                showAiProviderModal();
                return;
            }

            const refineBtn = modal.querySelector("#aiRefineBtn");
            const origBtnText = refineBtn.textContent;
            refineBtn.disabled = true;
            const providerName = getSelectedProviderLabel();
            refineBtn.textContent = `⏳ ${providerName} is refining...`;

            const currentText = textarea.value.trim();
            const promptForRefiner = `You are an expert AI prompt engineer.
The user wants to update their AI system prompt for generating job application ${activeTab.toUpperCase()} messages.

CURRENT PROMPT TEMPLATE:
${currentText}

USER UPDATE COMMAND/INSTRUCTION:
${instruction}

REQUIREMENTS FOR NEW PROMPT TEMPLATE:
1. Revise and improve the system prompt template based on the user's instruction.
2. YOU MUST KEEP the dynamic placeholders intact so they can be replaced at runtime: {RESUME_TEXT}, {RESUME_URL}, {JOB_TITLE}, {COMPANY_NAME}, {JOB_DESCRIPTION}, {STYLE_INSTRUCTIONS}.
3. Return ONLY the new prompt template text without markdown code blocks, preamble, or commentary.`;

            callMultiProviderAiApi(promptForRefiner, 8192,
                (newPromptText, usedModel) => {
                    refineBtn.disabled = false;
                    refineBtn.textContent = origBtnText;
                    textarea.value = newPromptText;
                    modal.querySelector("#aiRefineInput").value = "";
                    alert(`✨ New ${activeTab === "whatsapp" ? "WhatsApp" : (activeTab === "cover" ? "Cover Letter" : "Email")} prompt template generated by ${providerName} (${usedModel})! Review and click 'Save Active Prompt'.`);
                },
                (errText) => {
                    refineBtn.disabled = false;
                    refineBtn.textContent = origBtnText;
                    console.error(`[Job Assistant][${providerName} Refiner Error]`, errText);
                    alert(`❌ Failed to generate refined prompt template.\n\nError details: ` + (errText || "Unknown error"));
                }
            );
        };

    }

    function showEmailPreviewModal(job, initialText) {
        const old = document.getElementById("email-preview-modal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.id = "email-preview-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;max-height:90vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:16px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 60px rgba(0,0,0,0.85);font-family:system-ui,-apple-system,sans-serif;";

        const defaultSubject = `Application for ${job.title || "Job Role"} - ${job.company || "Company"}`;
        const hrEmail = job.email || "";

        modal.innerHTML = `
            <div style="padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:10px;">
                    <strong style="color:#58a6ff;font-size:14px;">✉️ Preview Application Email</strong>
                    <span id="closeEmailPreviewModal" style="cursor:pointer;font-size:16px;color:#8b949e;">✖</span>
                </div>

                <div style="margin-bottom:10px;">
                    <label style="display:block;font-weight:600;color:#8b949e;margin-bottom:4px;font-size:11px;">
                        To (HR / Recruiter Email):
                    </label>
                    <input type="email" id="emailToInput" value="${hrEmail}" placeholder="hr@company.com (optional)" style="width:100%;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:6px;color:#58a6ff;font-size:12px;outline:none;" />
                </div>

                <div style="margin-bottom:10px;">
                    <label style="display:block;font-weight:600;color:#8b949e;margin-bottom:4px;font-size:11px;">
                        Subject:
                    </label>
                    <input type="text" id="emailSubjectInput" value="${defaultSubject}" style="width:100%;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:6px;color:#e6edf3;font-size:12px;outline:none;" />
                </div>

                <div style="margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <label style="font-weight:600;color:#8b949e;font-size:11px;">
                            Email Content (Editable):
                        </label>
                        <span id="aiStatusTag" style="color:#79c0ff;font-size:10px;">✨ AI Tailored for ${job.company || "Role"}</span>
                    </div>
                    <textarea id="emailContentTextarea" style="width:100%;height:220px;padding:10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#e6edf3;font-family:system-ui,sans-serif;font-size:12px;line-height:1.45;outline:none;resize:vertical;">${initialText}</textarea>
                </div>

                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button id="sendEmailNowBtn" style="flex:2;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:12px;">
                        🚀 Send Email
                    </button>
                    <button id="regenAiEmailBtn" style="flex:1.5;background:#1f6feb;color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:11.5px;">
                        🔄 Regenerate AI Email
                    </button>
                    <button id="copyEmailTextBtn" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:500;font-size:11.5px;">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        if (!STATE.currentGenerated) {
            STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
        }
        STATE.currentGenerated.email = initialText;

        const emailTextarea = modal.querySelector("#emailContentTextarea");
        emailTextarea.oninput = () => {
            if (!STATE.currentGenerated) STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
            STATE.currentGenerated.email = emailTextarea.value.trim();
        };

        modal.querySelector("#closeEmailPreviewModal").onclick = () => modal.remove();

        modal.querySelector("#sendEmailNowBtn").onclick = () => {
            const recipient = modal.querySelector("#emailToInput").value.trim();
            const subject = modal.querySelector("#emailSubjectInput").value.trim();
            const bodyText = emailTextarea.value.trim();
            STATE.currentGenerated.email = bodyText;

            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

            handleLoggedAction({ applyStatus: "Applied via Email", hrEmail: recipient }, () => {
                window.location.href = mailtoUrl;
                modal.remove();
            });
        };

        modal.querySelector("#copyEmailTextBtn").onclick = () => {
            const bodyText = emailTextarea.value.trim();
            STATE.currentGenerated.email = bodyText;
            if (typeof GM_setClipboard === "function") {
                GM_setClipboard(bodyText);
            }
            alert("📋 Email text copied to clipboard!");
        };

        modal.querySelector("#regenAiEmailBtn").onclick = () => {
            const regenBtn = modal.querySelector("#regenAiEmailBtn");
            const statusTag = modal.querySelector("#aiStatusTag");
            const textarea = modal.querySelector("#emailContentTextarea");

            regenBtn.disabled = true;
            regenBtn.textContent = "⏳ Regenerating...";
            const currentProviderName = getSelectedProviderLabel();
            statusTag.textContent = `⏳ ${currentProviderName} is writing a new version...`;

            generateAiMessage(job, "email", (newText, usedFallback) => {
                regenBtn.disabled = false;
                regenBtn.textContent = "🔄 Regenerate AI Email";
                textarea.value = newText;

                if (usedFallback) {
                    statusTag.textContent = "⚠️ Static Fallback Template Used";
                } else {
                    statusTag.textContent = "✨ Fresh AI Version Generated!";
                }
            });
        };
    }

    function showWhatsAppPreviewModal(job, initialText) {
        const old = document.getElementById("wa-preview-modal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.id = "wa-preview-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;max-height:90vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:16px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 60px rgba(0,0,0,0.85);font-family:system-ui,-apple-system,sans-serif;";

        const hrPhone = job.phone || "";

        modal.innerHTML = `
            <div style="padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:10px;">
                    <strong style="color:#2ea043;font-size:14px;">💬 Preview WhatsApp Message</strong>
                    <span id="closeWaPreviewModal" style="cursor:pointer;font-size:16px;color:#8b949e;">✖</span>
                </div>

                <div style="margin-bottom:10px;">
                    <label style="display:block;font-weight:600;color:#8b949e;margin-bottom:4px;font-size:11px;">
                        Phone Number (HR / Recruiter):
                    </label>
                    <input type="text" id="waPhoneInput" value="${hrPhone}" placeholder="e.g. 919876543210 (optional)" style="width:100%;padding:8px 10px;background:#161b22;border:1px solid #30363d;border-radius:6px;color:#2ea043;font-size:12px;outline:none;" />
                </div>

                <div style="margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <label style="font-weight:600;color:#8b949e;font-size:11px;">
                            WhatsApp Message (Editable):
                        </label>
                        <span id="waAiStatusTag" style="color:#79c0ff;font-size:10px;">✨ AI Tailored for ${job.company || "Role"}</span>
                    </div>
                    <textarea id="waContentTextarea" style="width:100%;height:220px;padding:10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#e6edf3;font-family:system-ui,sans-serif;font-size:12px;line-height:1.45;outline:none;resize:vertical;">${initialText}</textarea>
                </div>

                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button id="sendWaNowBtn" style="flex:2;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:12px;">
                        🚀 Send WhatsApp Message
                    </button>
                    <button id="regenAiWaBtn" style="flex:1.5;background:#1f6feb;color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:11.5px;">
                        🔄 Regenerate AI Message
                    </button>
                    <button id="copyWaTextBtn" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:500;font-size:11.5px;">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        if (!STATE.currentGenerated) {
            STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
        }
        STATE.currentGenerated.whatsapp = initialText;

        const waTextarea = modal.querySelector("#waContentTextarea");
        waTextarea.oninput = () => {
            if (!STATE.currentGenerated) STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
            STATE.currentGenerated.whatsapp = waTextarea.value.trim();
        };

        modal.querySelector("#closeWaPreviewModal").onclick = () => modal.remove();

        modal.querySelector("#sendWaNowBtn").onclick = () => {
            const rawPhone = modal.querySelector("#waPhoneInput").value.trim();
            const bodyText = waTextarea.value.trim();
            STATE.currentGenerated.whatsapp = bodyText;
            const cp = rawPhone.replace(/\D/g, "");
            const waLink = cp ? `https://wa.me/${cp}?text=${encodeURIComponent(bodyText)}` : `https://wa.me/?text=${encodeURIComponent(bodyText)}`;

            handleLoggedAction({ applyStatus: "Applied via WhatsApp", hrPhone: rawPhone }, () => {
                window.open(waLink, "_blank");
                modal.remove();
            });
        };

        modal.querySelector("#copyWaTextBtn").onclick = () => {
            const bodyText = waTextarea.value.trim();
            STATE.currentGenerated.whatsapp = bodyText;
            if (typeof GM_setClipboard === "function") {
                GM_setClipboard(bodyText);
            }
            alert("📋 WhatsApp message copied to clipboard!");
        };

        modal.querySelector("#regenAiWaBtn").onclick = () => {
            const regenBtn = modal.querySelector("#regenAiWaBtn");
            const statusTag = modal.querySelector("#waAiStatusTag");
            const textarea = modal.querySelector("#waContentTextarea");

            regenBtn.disabled = true;
            regenBtn.textContent = "⏳ Regenerating...";
            const currentProviderName = getSelectedProviderLabel();
            statusTag.textContent = `⏳ ${currentProviderName} is writing a new version...`;

            generateAiMessage(job, "whatsapp", (newText, usedFallback) => {
                regenBtn.disabled = false;
                regenBtn.textContent = "🔄 Regenerate AI Message";
                textarea.value = newText;

                if (usedFallback) {
                    statusTag.textContent = "⚠️ Static Fallback Template Used";
                } else {
                    statusTag.textContent = "✨ Fresh AI Version Generated!";
                }
            });
        };
    }

    function showCoverLetterPreviewModal(job, initialText) {
        const old = document.getElementById("cover-preview-modal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.id = "cover-preview-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;max-height:92vh;overflow-y:auto;background:#0d1117;border:1px solid #30363d;border-radius:16px;z-index:2147483647;color:#c9d1d9;font-size:12px;box-shadow:0 25px 60px rgba(0,0,0,0.85);font-family:system-ui,-apple-system,sans-serif;";

        modal.innerHTML = `
            <div style="padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #21262d;padding-bottom:10px;">
                    <strong style="color:#a78bfa;font-size:14px;">📄 Preview Tailored Cover Letter</strong>
                    <span id="closeCoverPreviewModal" style="cursor:pointer;font-size:16px;color:#8b949e;">✖</span>
                </div>

                <div style="margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <label style="font-weight:600;color:#8b949e;font-size:11px;">
                            Cover Letter Content (Editable):
                        </label>
                        <span id="coverAiStatusTag" style="color:#79c0ff;font-size:10px;">✨ AI Tailored for ${job.company || "Role"}</span>
                    </div>
                    <textarea id="coverContentTextarea" style="width:100%;height:320px;padding:10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#e6edf3;font-family:system-ui,sans-serif;font-size:12px;line-height:1.45;outline:none;resize:vertical;">${initialText}</textarea>
                </div>

                <div style="display:flex;gap:8px;">
                    <button id="copyCoverNowBtn" style="flex:2;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:12px;">
                        📋 Copy Cover Letter
                    </button>
                    <button id="regenAiCoverBtn" style="flex:1.5;background:#1f6feb;color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600;font-size:11.5px;">
                        🔄 Regenerate AI Cover Letter
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        if (!STATE.currentGenerated) {
            STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
        }
        STATE.currentGenerated.cover = initialText;

        const coverTextarea = modal.querySelector("#coverContentTextarea");
        coverTextarea.oninput = () => {
            if (!STATE.currentGenerated) STATE.currentGenerated = { email: "No generated", whatsapp: "No generated", cover: "No generated" };
            STATE.currentGenerated.cover = coverTextarea.value.trim();
        };

        modal.querySelector("#closeCoverPreviewModal").onclick = () => modal.remove();

        modal.querySelector("#copyCoverNowBtn").onclick = () => {
            const bodyText = coverTextarea.value.trim();
            STATE.currentGenerated.cover = bodyText;
            if (typeof GM_setClipboard === "function") {
                GM_setClipboard(bodyText);
            }
            handleLoggedAction({ applyStatus: "Cover Letter Generated" }, () => {
                alert("📋 Tailored Cover Letter copied to clipboard!");
                modal.remove();
            });
        };

        modal.querySelector("#regenAiCoverBtn").onclick = () => {
            const regenBtn = modal.querySelector("#regenAiCoverBtn");
            const statusTag = modal.querySelector("#coverAiStatusTag");
            const textarea = modal.querySelector("#coverContentTextarea");

            regenBtn.disabled = true;
            regenBtn.textContent = "⏳ Regenerating...";
            const currentProviderName = getSelectedProviderLabel();
            statusTag.textContent = `⏳ ${currentProviderName} is writing a new version...`;

            generateAiMessage(job, "cover", (newText, usedFallback) => {
                regenBtn.disabled = false;
                regenBtn.textContent = "🔄 Regenerate AI Cover Letter";
                textarea.value = newText;

                if (usedFallback) {
                    statusTag.textContent = "⚠️ Static Fallback Template Used";
                } else {
                    statusTag.textContent = "✨ Fresh AI Version Generated!";
                }
            });
        };
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
        #aiSelectorBar {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 10px;
            padding: 8px 10px;
            margin-bottom: 12px;
        }
        #aiSelectorBar .ai-bar-label {
            font-size: 9px; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1px; color: #f2cc60; margin-bottom: 6px;
        }
        #aiSelectorBar select {
            width: 100%; background: #0d1117;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 6px; color: #e2e8f0;
            padding: 5px 6px; font-size: 10.5px; cursor: pointer;
            outline: none; margin-bottom: 5px;
            font-family: 'Inter', system-ui, sans-serif;
        }
        #aiSelectorBar select:last-of-type { margin-bottom: 4px; }
        #aiActiveKeyInfo {
            font-size: 10px; color: #3fb950;
            display: flex; align-items: center; gap: 4px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        #aiActiveKeyInfo span { color: #58a6ff; }
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

    function getLinkedInDetailsContainer() {
        const detailPane = document.querySelector(
            ".jobs-search__job-details, .scaffold-layout__detail, .jobs-details__main-content, .job-view-layout, [class*='job-details']"
        );
        if (detailPane) return detailPane;
        return document.querySelector("main") || document.body;
    }


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
        const container = isLinkedInPortal() ? getLinkedInDetailsContainer() : null;
        const root = container || document;

        sels.forEach((sel, idx) => {
            root.querySelectorAll(sel).forEach(node => {
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
        const fallbackText = container ? extractPlainNodeText(container, true) : getPageTextWithoutAssistant(true);
        const fallback = sanitizeJobDescriptionText(fallbackText);
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
        if (isLinkedInPortal()) {
            const container = getLinkedInDetailsContainer();
            const doc = container || document;
            const selectors = [
                ".job-details-jobs-unified-top-card__job-title",
                ".jobs-unified-top-card__job-title",
                "h1",
                "[class*='job-title']",
                "h2"
            ];
            for (const sel of selectors) {
                const el = doc.querySelector(sel);
                if (el) {
                    const text = cleanDisplayText(el.innerText || el.textContent);
                    if (text && text.length > 2 && !/helpful\?/i.test(text) && !/feedback/i.test(text) && !/jobs for you/i.test(text)) {
                        return text.replace(/^(Hiring for|Urgent hiring for)\s+/i, "");
                    }
                }
            }
        }
        if (isNaukriPortal()) { const h = document.querySelector(".jd-header-title,.styles_jhc__title__6S6t4,h1"); return cleanDisplayText(h?.innerText || "").replace(/^(Hiring for|Urgent hiring for)\s+/i, ""); }
        return document.title.split("|")[0].split("-")[0].trim();
    }


    function extractCompanyNameFromPage() {
        const jc = extractFromJsonLd('company');
        if (jc) return cleanCompanyName(jc);
        if (isLinkedInPortal()) {
            const container = getLinkedInDetailsContainer();
            const doc = container || document;
            for (const sel of [
                ".job-details-jobs-unified-top-card__company-name a",
                ".jobs-unified-top-card__company-name a",
                ".topcard__org-name-link",
                ".job-details-jobs-unified-top-card__company-name",
                "a[href*='/company/']",
                ".jobs-unified-top-card__company-name",
                "[class*='company-name']"
            ]) {
                const el = doc.querySelector(sel);
                if (el && el.innerText.trim()) return cleanCompanyName(el.innerText);
            }
            // Fallback: search primary description container for company link
            const pd = doc.querySelector(".job-details-jobs-unified-top-card__primary-description, .jobs-unified-top-card__primary-description");
            if (pd) {
                const link = pd.querySelector("a[href*='/company/']");
                if (link && link.innerText.trim()) return cleanCompanyName(link.innerText);
                const firstPart = pd.innerText.split("·")[0].split("•")[0].trim();
                if (firstPart && firstPart.length < 100) return cleanCompanyName(firstPart);
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
            const container = getLinkedInDetailsContainer();
            const doc = container || document;
            
            // 1. Specific bullet classes
            for (const sel of [
                ".job-details-jobs-unified-top-card__bullet",
                ".jobs-unified-top-card__bullet",
                ".top-card-layout__bullet"
            ]) {
                for (const n of doc.querySelectorAll(sel)) {
                    const t = (n.innerText || "").trim();
                    if (isLikelyLocationText(t)) return t;
                }
            }

            // 2. Scan direct text child spans/divs/anchors in the top card header to find any match
            const headerArea = doc.querySelector(".job-details-jobs-unified-top-card, .jobs-unified-top-card, .topcard__content-left, [class*='top-card']");
            const searchRoot = headerArea || doc;
            const elements = searchRoot.querySelectorAll("span, div, li, a");
            const compName = extractCompanyNameFromPage();
            for (const el of elements) {
                const t = (el.innerText || "").trim();
                if (t && t.length < 100 && isLikelyLocationText(t)) {
                    if (t.toLowerCase() !== compName.toLowerCase()) {
                        return t;
                    }
                }
            }

            // 3. Fallback: split primary description container text
            const pd = doc.querySelector(".job-details-jobs-unified-top-card__primary-description, .jobs-unified-top-card__primary-description, [class*='primary-description']");
            if (pd) {
                const parts = pd.innerText.split(/·|•|\n|\|/).map(p => p.trim());
                for (const p of parts) {
                    if (isLikelyLocationText(p)) return p;
                }
            }
        }

        if (isNaukriPortal()) {
            for (const sel of [".styles_jhc__location", ".styles_jhcLoc__container span", "[class*='location']"]) {
                for (const n of document.querySelectorAll(sel)) { const t = (n.innerText || "").trim(); if (isLikelyLocationText(t)) return t; }
            }
        }
        return "N/A";
    }

    function extractSalaryFromJd(jdText) {
        if (!jdText) return "";
        const patterns = [
            /(?:salary|stipend|compensation|remuneration|pay)\s*[:\-]?\s*(?:Rs\.?|INR|₹|\$|£|€)?\s*\d+[\d,.\s]*(?:-|to)\s*(?:Rs\.?|INR|₹|\$|£|€)?\s*\d+[\d,.\s]*(?:\s*LPA|\s*PA|\s*PM|\s*month|\s*annum|\s*year)?/i,
            /(?:Rs\.?|INR|₹|\$|£|€)\s*\d+[\d,.\s]*(?:-|to)\s*(?:Rs\.?|INR|₹|\$|£|€)?\s*\d+[\d,.\s]*(?:\s*LPA|\s*PA|\s*PM|\s*month|\s*annum|\s*year)/i,
            /\b\d+\s*(?:-|to)\s*\d+\s*LPA\b/i,
            /\b\d+\s*-\s*\d+\s*k\s*(?:USD|CAD|GBP|EUR)?\s*\/year\b/i
        ];
        for (const pat of patterns) {
            const m = jdText.match(pat);
            if (m) return m[0].trim();
        }
        return "";
    }

    function extractSalaryFromHeader() {
        const js = extractFromJsonLd('salary'); if (js) return js;
        let salText = "";
        if (isNaukriPortal()) {
            for (const sel of [".styles_jhc__salary", ".salary", "[title='Salary'] + span", ".salaryText"]) {
                const el = document.querySelector(sel); if (el && el.innerText.trim()) { salText = el.innerText.trim(); break; }
            }
        }
        if (!salText && isLinkedInPortal()) {
            const container = getLinkedInDetailsContainer();
            const doc = container || document;
            for (const b of doc.querySelectorAll(".job-details-jobs-unified-top-card__job-insight, .job-details-jobs-unified-top-card__bullet, .jobs-unified-top-card__job-insight, .jobs-unified-top-card__bullet")) {
                const t = b.innerText;
                if (t.includes("₹") || t.includes("$") || t.includes("£") || t.toLowerCase().includes("monthly") || t.toLowerCase().includes("yearly")) { salText = t.trim(); break; }
            }
        }
        if (!salText || salText === "Not Disclosed") {
            const jd = extractJobDescriptionText() || STATE.lastObservedJdText || "";
            const jdSal = extractSalaryFromJd(jd);
            if (jdSal) return jdSal;
        }
        return salText || "Not Disclosed";
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
            cands.forEach(ph => {
                const pos = src.indexOf(ph);
                const ctx = norm.slice(Math.max(0, pos - 60), pos + ph.length + 60);
                let s = 0;
                hrKw.forEach(kw => { if (ctx.includes(kw)) s++; });
                if (ph.startsWith("+") || ph.startsWith("00")) s += 1;
                if (s > bestS) {
                    bestS = s;
                    best = ph;
                }
            });
            if (best === "N/A" && cands.length > 0) {
                const plusCand = cands.find(c => c.startsWith("+") || c.startsWith("00"));
                if (plusCand) return plusCand;
            }
            return bestS >= 0 ? best : "N/A";
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

    function getActiveResumeLink() {
        return (typeof GM_getValue === "function" ? GM_getValue("lastUploadedResumeUrl", "") : (typeof localStorage !== "undefined" ? localStorage.getItem("lastUploadedResumeUrl") : "")) || PROFILE.resume;
    }

    const emailBody = i => `Dear Hiring Manager,

I am writing to express my strong interest in the ${i.title} position at ${i.company}. With over eight years of experience as a Relationship Manager and Customer Specialist, I have a proven track record of driving long-term retention and optimizing service delivery.

Key Strengths:
* Strategic Relationship Management: 97% satisfaction, 95% retention.
* Customer-Centric Problem Solving: 90% first-contact resolution.
* CRM Automation: 95% efficiency improvement.
* Program Delivery: 20% faster timelines.

Best regards,
${PROFILE.name}
${PROFILE.phone}
${PROFILE.email}
LinkedIn: ${PROFILE.linkedin}
Portfolio: ${PROFILE.portfolio}
Resume: ${getActiveResumeLink()}`;

    const waBody = i => `Dear Hiring Manager,
I'm ${PROFILE.name}, reaching out regarding the ${i.title} role at ${i.company}.

Key Achievements:
- 97% client satisfaction & 95% retention
- 95% communication efficiency via CRM automations
- 20% faster program delivery
- MCA qualified, 90% first-contact issue resolution

Best regards,
${PROFILE.name}
${PROFILE.phone}
${PROFILE.email}
LinkedIn: ${PROFILE.linkedin}
Portfolio: ${PROFILE.portfolio}
Resume: ${getActiveResumeLink()}`;

    const coverLetter = i => {
        const d = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
        return `${PROFILE.name} | Hyderabad, Telangana | ${PROFILE.phone} | ${PROFILE.email}
LinkedIn: ${PROFILE.linkedin} | Portfolio: ${PROFILE.portfolio} | Resume: ${getActiveResumeLink()}
${d}

Dear Hiring Manager,

I am writing to express my strong interest in the ${i.title} position at ${i.company}. With 8+ years in EdTech and SaaS Client Relationship Management, I have a proven track record in program delivery, client retention, and CRM automation.

At Iamneo.ai, I improved delivery timelines by 20%. At Turito Inc., I achieved 97% satisfaction and 95% retention. At Vedantu, I managed 300+ student accounts with 95% renewal rates.

Best regards,
${PROFILE.name} | ${PROFILE.phone} | ${PROFILE.email}`;
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
            url: getWorkerUrl() + "/api/upload-resume",
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
            url: getWorkerUrl() + "/api/track",
            headers: { "Content-Type": "application/json" },
            anonymous: true,
            data: JSON.stringify({
                company: payload.company,
                jobTitle: payload.title || payload.jobRole,
                location: payload.location,
                applyLink: payload.jobPortalLink,
                resumeScore: payload.atsScore,
                status: payload.applyStatus || "Applied",
                userEmail: getConnectedUserEmail(),
                salary: payload.salaryDetails || "Not Disclosed",
                email: payload.hrEmail || payload.email || "",
                phone: payload.phone || "",
                jdText: payload.jobDescription || "",
                resumeUrl: getActiveResumeLink() || "",
                coverLetter: (STATE.currentGenerated && STATE.currentGenerated.cover) || "No generated",
                whatsAppMessage: (STATE.currentGenerated && STATE.currentGenerated.whatsapp) || "No generated",
                emailMessage: (STATE.currentGenerated && STATE.currentGenerated.email) || "No generated",
                atsScore: payload.atsScore
            }),
            onload: function (r) {
                console.log("[Job Assistant] Tracked in Cloudflare D1:", r.responseText);
                const res = parseJsonSafe(r.responseText);
                if (r.status !== 200 || (res && res.error)) {
                    console.error("[Job Assistant] D1 tracking failed:", res);
                    alert("⚠️ Cloudflare D1 Database Save Error:\n\n" + (res?.details || res?.error || r.responseText || "Status: " + r.status));
                }
            },
            onerror: function (err) {
                console.error("[Job Assistant] D1 Network Error:", err);
                alert("❌ Cloudflare D1 Network Error:\nCould not reach the backend worker server at: " + getWorkerUrl());
            }
        });

        if (extras && extras.dbOnly) {
            if (typeof onComplete === "function") onComplete({ success: true, duplicate: true }, null);
            return;
        }

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
            // Already logged to sheet, but let's update D1 database with any new fields (whatsapp/email/cover)
            queueBackgroundLog(info, Object.assign({}, extras, { dbOnly: true }), onComplete);
            return;
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
            STATE.currentGenerated = {
                email: "No generated",
                whatsapp: "No generated",
                cover: "No generated"
            };
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
        const go = () => { if (typeof runAction === "function") runAction(info, ats); };
        ensureSilentLog(info, {
            applyStatus: options && options.applyStatus ? options.applyStatus : "Logged", ats,
            hrName: options && options.hrName ? options.hrName : "", hrEmail: options && options.hrEmail ? options.hrEmail : ""
        }, go);
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
        if (!document.body) { setTimeout(init, 300); return; }

        // Remove existing host if detached from body
        const oldHost = document.getElementById("job-assistant-host");
        if (oldHost && document.body.contains(oldHost)) {
            try {
                const inf = refreshCurrentJob(true);
                updateJobInfoDisplay(inf); updateAtsDisplay(inf.atsScore);
            } catch (e) { }
            return;
        } else if (oldHost) {
            try { oldHost.remove(); } catch(e) {}
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
        hdr.innerHTML = `<strong>📋 Job Assistant Premium ${SCRIPT_VERSION}</strong><div class="hdr-btns"><span id="minBtn">➖</span><span id="clsBtn">✖</span></div>`;
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
            { id: "applyJobBtn", text: "🚀 Apply Job" },
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

        // ── AI AGENT SELECTOR BAR ──────────────────────────────────────────────
        const aiBar = document.createElement("div");
        aiBar.id = "aiSelectorBar";

        const aiBarLabel = document.createElement("div");
        aiBarLabel.className = "ai-bar-label";
        aiBarLabel.textContent = "🤖 Active AI Agent & Model";
        aiBar.appendChild(aiBarLabel);

        // Provider dropdown
        const providerSel = document.createElement("select");
        providerSel.id = "aiProviderSelect";
        const savedProvider = gmGet("selectedAiProvider", "gemini") || "gemini";
        AI_PROVIDERS.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = `${p.icon} ${p.label}`;
            opt.selected = (p.id === savedProvider);
            providerSel.appendChild(opt);
        });
        aiBar.appendChild(providerSel);

        // Model dropdown
        const modelSel = document.createElement("select");
        modelSel.id = "aiModelSelect";
        aiBar.appendChild(modelSel);

        // Active key email display
        const keyInfo = document.createElement("div");
        keyInfo.id = "aiActiveKeyInfo";
        aiBar.appendChild(keyInfo);

        body.appendChild(aiBar);

        // Helper: populate model dropdown for a given provider id
        function populateModelSelect(pid) {
            const pDef = AI_PROVIDERS.find(p => p.id === pid);
            modelSel.innerHTML = "";
            const savedModel = gmGet("selectedModel_" + pid, "") || (pDef && pDef.models[0]) || "";
            (pDef ? pDef.models : [savedModel]).forEach(m => {
                const opt = document.createElement("option");
                opt.value = m; opt.textContent = m; opt.selected = (m === savedModel);
                modelSel.appendChild(opt);
            });
        }

        // Helper: update key info row
        function updateKeyInfo(pid) {
            const email = getActiveKeyEmail(pid);
            keyInfo.innerHTML = `🔑 Key: <span>${email}</span>`;
        }

        // Initial population
        populateModelSelect(savedProvider);
        updateKeyInfo(savedProvider);

        // Provider change
        providerSel.onchange = function() {
            const pid = this.value;
            setSelectedProvider(pid);
            populateModelSelect(pid);
            updateKeyInfo(pid);
        };

        // Model change
        modelSel.onchange = function() {
            const pid = providerSel.value;
            setSelectedModel(pid, this.value);
        };

        // Section 3 — AI & Cloudflare Settings
        body.appendChild(makeSection("s3-label", "3. AI & Cloudflare Settings", [
            { id: "keyBtn", text: "🔑 API Keys" },
            { id: "promptBtn", text: "✏️ AI Prompt" },
            { id: "cfSettingsBtn", text: "⚙️ DB Settings" },
            { id: "dashBtn", text: "📊 Dashboard", full: true }
        ]));

        // Section 4 — HR Info (LinkedIn only)
        if (isLinkedIn) {
            body.appendChild(makeSection("s3-label", "4. HR Info", [
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
            waBtnEl.disabled = true; waBtnEl.textContent = "⏳ Writing...";
            const job = refreshCurrentJob();
            generateAiMessage(job, "whatsapp", (text, usedFallback) => {
                waBtnEl.disabled = false; waBtnEl.textContent = originalText;
                showWhatsAppPreviewModal(job, text);
            });
        };
        shadow.getElementById("mailBtn").onclick = () => {
            const mailBtnEl = shadow.getElementById("mailBtn");
            const originalText = mailBtnEl.textContent;
            mailBtnEl.disabled = true; mailBtnEl.textContent = "⏳ Writing...";
            const job = refreshCurrentJob();
            generateAiMessage(job, "email", (text, usedFallback) => {
                mailBtnEl.disabled = false; mailBtnEl.textContent = originalText;
                showEmailPreviewModal(job, text);
            });
        };
        shadow.getElementById("cvBtn").onclick = () => {
            handleLoggedAction({ applyStatus: "Applied on Portal" }, () => { GM_setClipboard(PROFILE.resume); alert("Resume link copied!"); });
        };
        shadow.getElementById("coverBtn").onclick = () => {
            const coverBtnEl = shadow.getElementById("coverBtn");
            const originalText = coverBtnEl.textContent;
            coverBtnEl.disabled = true; coverBtnEl.textContent = "⏳ Writing...";
            const job = refreshCurrentJob();
            generateAiMessage(job, "cover", (text, usedFallback) => {
                coverBtnEl.disabled = false; coverBtnEl.textContent = originalText;
                showCoverLetterPreviewModal(job, text);
            });
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
                    const fullUrl = res.fileUrl.startsWith("http") ? res.fileUrl : getWorkerUrl() + res.fileUrl;
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
        shadow.getElementById("applyJobBtn").onclick = () => {
            const btn = shadow.getElementById("applyJobBtn");
            const origText = btn.textContent;
            btn.disabled = true;
            btn.textContent = "⏳ Saving...";
            handleLoggedAction({ applyStatus: "Applied" }, () => {
                btn.disabled = false;
                btn.textContent = "✅ Applied!";
                setTimeout(() => { btn.textContent = origText; }, 2000);
            });
        };
        shadow.getElementById("dashBtn").onclick = () => {
            const url = getWorkerUrl() + "/dashboard?email=" + encodeURIComponent(getConnectedUserEmail());
            if (typeof GM_openInTab === "function") {
                GM_openInTab(url, { active: true });
            } else {
                window.open(url, "_blank");
            }
        };
        shadow.getElementById("keyBtn").onclick = () => {
            showAiProviderModal();
            // Refresh key info after modal closes (use mutation observer on modal removal)
            const mo = new MutationObserver(() => {
                const pid = shadow.getElementById("aiProviderSelect")?.value || gmGet("selectedAiProvider", "gemini");
                if (shadow.getElementById("aiActiveKeyInfo")) updateKeyInfo(pid);
            });
            mo.observe(document.body, { childList: true });
            setTimeout(() => mo.disconnect(), 60000);
        };
        shadow.getElementById("promptBtn").onclick = () => { showPromptManagerModal(); };
        shadow.getElementById("cfSettingsBtn").onclick = () => { showCloudflareSettingsModal(); };
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

    if (typeof GM_registerMenuCommand === "function") {
        GM_registerMenuCommand("🤖 Open / Show Job Assistant Panel", () => {
            const h = document.getElementById("job-assistant-host");
            if (h && STATE.panel) {
                h.style.display = "block";
                STATE.panel.style.display = "block";
            } else {
                init();
            }
        });
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init, { once: true });
        window.addEventListener("load", init, { once: true });
    }

    function waitForBodyThenInit() {
        if (!document.body) { setTimeout(waitForBodyThenInit, 100); return; }
        init();
    }
    waitForBodyThenInit();

})();