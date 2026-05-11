# 🚀 Slack Message Extractor

A client-side JavaScript tool designed to extract conversational knowledge from Slack channels and format it into clean, anonymized Markdown. 

This tool is explicitly designed to bypass enterprise browser download restrictions (e.g., Prisma Access) by utilizing a custom in-browser UI overlay. It allows authorized users to export contextual data into standard `.md` files, which are perfect for archiving, building knowledge bases, or feeding into applications that utilize Markdown (such as internal wikis or AI ingestion tools).

---

## 🔒 Security & Compliance

> **⚖️ Disclaimer:** This tool is intended for use by authorized personnel only for the purpose of technical documentation, summarization, and knowledge management. Users are strictly responsible for ensuring their data extraction complies with their organization's data privacy, security, and DLP (Data Loss Prevention) policies.
>  **Please ensure you strictly comply with your company's privacy, data handling, and compliance policies before exporting any private or sensitive conversations.**

This script is built with strict organizational security in mind:
* **Local Execution Only:** The script runs entirely in your browser's local memory. No data is ever sent to, or routed through, third-party servers.
* **Domain Lock:** Execution is hard-coded to require the `slack.com` domain. It will fail if run elsewhere.
* **Strict RBAC Adherence:** This tool does *not* bypass Slack permissions. You can only extract channels that your authenticated user account already has access to view.
* **Identity Scrubbing:** Automatically scrubs all Slack User IDs to ensure data privacy and prevent PII leakage.

---

## 1. Prerequisites
* **Browser:** Use a web-based browser (Chrome, Edge, or Prisma Access Browser).
* **URL:** You **must** be logged into Slack at [https://app.slack.com/](https://app.slack.com/). 
  * *Note: The script will not work inside the Slack Desktop App.*

---

## 2. Step-by-Step Instructions

### Step A: Capture your Session Token
Slack uses a temporary web session token called an `xoxc` token. You need this to authorize the script.
1. Open your target Slack channel in your browser.
2. Open **Developer Tools** (`F12` or `Right-Click > Inspect`) and go to the **Network** tab.
3. In the "Filter" box, type `history`.
4. Scroll up once in your Slack chat to trigger a load.
5. Click on the `conversations.history` request that appears.
6. Click the **Payload** tab and copy the `token` (starts with `xoxc-`).
   * *⚠️ Warning: Do not share this token; it is your temporary session password.*

### Step B: Configure the Script
Paste the script into a text editor (like Notepad or VS Code) to set your parameters before running it.

```javascript
// --- CONFIGURATION ---
const TOKEN = "YOUR_TOKEN_HERE"; 
const CHANNEL_ID = "C1234567890"; // See instructions below to find this
const START_DATE = "2026-01-01";
const END_DATE = "2026-01-31";
```

**How to find your `CHANNEL_ID`:**
1. In Slack, click on the channel name at the very top of the chat window to open the channel details.
2. Scroll to the very bottom of the **About** tab.
3. You will see the Channel ID listed (e.g., `Channel ID: C1234567890`).
4. Click the small "Copy" icon next to it and paste it into the script.

*Tip - Example Channel IDs:*
* `#marvel-avengers` = `C1234567890` 
* `#stark-industries-dev` = `C0987654321`

### Step C: Run the Extraction
1. Switch to the **Console** tab in Developer Tools.
2. Paste your configured script and press **Enter**.
3. **Wait:** You will see "Batch received" and "Fetching replies" messages appear as the script works. For a full month, this may take 1-2 minutes.
   * *Emergency Stop:* If you need to stop the script mid-run, type `stopNow = true` in the console and press Enter. It will safely package whatever data it has collected so far.

### Step D: Save your Data (Triple Failsafe)
Once the console says **✅ EXTRACTION COMPLETE!**, a large overlay window will appear. You have three ways to save:
1. **Auto-Download:** The script will attempt to auto-download the `.md` file to your browser's download folder. 
2. **Overlay Buttons:** Use the **⬇️ Download File** or **📋 Copy Text** buttons inside the overlay window.
3. **Manual Copy:** If the buttons are blocked by enterprise security, click inside the large text box, press `Ctrl + A` (Select All), then `Ctrl + C` (Copy), and paste into a local text editor.

---

## 3. Behind the Scenes: Data Transformations

To make this file highly readable and structured for downstream applications, the script performs several background transformations. Understanding how the database sees Slack versus how humans see it is key to why this tool is effective.

### 🛡️ Hard Anonymization (`@U...` IDs)
In the world of Slack, a Display Name like "Tony Stark" is just a label. Your true identity is a User ID (e.g., `U87654321`). When you tag someone, Slack stores a mention tag like `<@U87654321>`.
* **The Problem:** When you feed raw data into parsers, search engines, or LLMs, they often index these IDs as high-priority keywords, which clutters the data.
* **The Solution:** The script uses Regular Expressions (Regex)—specifically `/<@[A-Z0-9]+>/g`—to find and permanently delete every User ID and Mention, forcing downstream applications to focus solely on the "human" technical conversation.

### 🧵 Thread Reconstruction
Slack stores replies separately from main posts as a flat list. If you just copy-pasted the screen, you would lose the connection between a question and its answer.
* **The Solution:** The script performs a Secondary Fetch. It sees if a parent post has replies (`reply_count > 0`), goes back into the database to find those specific replies, and "nests" them directly under the main question.

### 🗺️ Navigation Headings
Markdown parsers work best when they have a clear hierarchy. Without headings, the output would be one giant wall of text.
* **The Solution:** The script takes the first 50 characters of every new thread and turns it into a `### Heading`. This acts as a Table of Contents, allowing documentation platforms to index every thread as a separate "Topic." 

### 🔗 Single-Link Context
Instead of cluttering every line with a URL, the script places a **single deep-link** at the top of each thread. 
* **The Solution:** If you are reviewing the extracted documentation and need to see original screenshots, attachments, or full context, you can click that one link to jump exactly to that moment in the live Slack history.

---

## ❓ Frequently Asked Questions (FAQ)

### What is the `xoxc` token and how often does it expire?
The `xoxc` token is your temporary web session token. It is generated when you log into Slack via the browser. 
* **Expiration:** It typically expires when you log out, clear your cookies, or when your enterprise's SSO session times out (usually 24 hours to a few days). 
* **Invalid Tokens:** If the script console returns an `auth_error` or `invalid_auth`, your token has expired. Simply refresh the Slack tab in your browser, perform **Step A** again to get a fresh token, and re-run the script.

### Does running this script create any security loopholes?
**No.** This script is entirely client-side. It acts exactly like a human rapidly scrolling through the channel and clicking "copy." 
* It only accesses channels you already have explicit permission to view. 
* It does not create API keys, backend tunnels, or install apps in the Slack workspace. 
* The script is completely erased from your browser's memory the moment you refresh the page or close the tab. 

### Will my IT or Security team be alerted if I run this?
The script makes standard API requests that mimic normal Slack web application behavior. Because it does not use unauthorized third-party integrations, it typically does not trigger anomalous behavior alerts. However, you are bulk-extracting data, so you should ensure your actions comply with your organization's Data Loss Prevention (DLP) and acceptable use policies.

### Does this script download files, images, or attachments?
**No.** To maintain strict security and keep the export file size small, the script does not download actual files or images. Instead, it captures the private Slack URLs for those files. You (or anyone reading the document) must be actively logged into the company Slack to view them, ensuring your proprietary files remain securely behind authentication.

### Can I extract Private Channels or Direct Messages (DMs)?
**Yes.** As long as your logged-in user account is a member of that private channel or DM. You can find the ID for a DM by looking at the URL in your browser when the DM is open (it usually starts with `D` or `C`). **However, please ensure you strictly comply with your company's privacy, data handling, and compliance policies before exporting any private or sensitive conversations.**

### Will I hit Slack API limits or get temporarily banned?
Slack employs Tier 3 rate limits for the `conversations.history` and `conversations.replies` endpoints (roughly 50+ requests per minute). 
* **Built-in Delays:** This script includes forced `sleep()` delays between API calls (350ms to 500ms) specifically designed to respect Slack's rate-limiting rules. 
* **Safety:** Because of these built-in delays, it mimics a safe rate of traffic and will not trigger a DDoS flag or get your account suspended. 

### What happens if my computer goes to sleep or loses internet?
Because the script runs locally in your browser tab, a computer sleep state or network drop will sever the connection to the Slack API and halt the extraction. It is highly recommended to keep the Slack tab active and your computer awake during the run.

### Can I run this for multiple channels at once?
Currently, the script is designed to extract one channel at a time to prevent browser memory exhaustion (Chrome tabs can crash if they hold too much text data at once). To run for a new channel, simply update the `CHANNEL_ID` in your script, refresh the page, and execute it again.
