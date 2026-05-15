# 🚀 Slack Message Extractor

This tool is a client-side JavaScript utility designed to automate the extraction of Slack messages from channels you already have access to. Instead of manually scrolling and copying conversations, this script compiles the history and formats it into a clean, anonymized Markdown (`.md`) file.

Because it runs entirely within your browser's local memory and interacts only with the standard web interface, it is completely secure. The custom on-screen display provides a reliable, self-contained way to view and save your data without requiring any third-party app installations or external server connections.

### 📚 Documentation Links
* [**📖 Read the Step-by-Step Guide (Below)**](#2-step-by-step-instructions)
* [**🧪 Read the Testing Guide (Run a Practice Extraction)**](TESTING_GUIDE.md)
* [**🛠️ Read the Troubleshooting Guide (Fixing Errors)**](TROUBLESHOOTING.md)
* [**🛡️ Read the InfoSec & Compliance Document**](SECURITY.md)

---

## 1. Prerequisites
* **Download the Script:** Download the [**`slack_extractor_script.js`**](slack_extractor_script.js) file from this repository to your computer.
* **Browser:** Use a web-based browser (Chrome, Edge, Safari, or Enterprise Browser).
* **URL:** You **must** be logged into Slack at [https://app.slack.com/](https://app.slack.com/). 
  * *Note: The script will not work inside the Slack Desktop App.*

---

## 2. Step-by-Step Instructions

> 💡 **PRO-TIP: Take it for a Test Drive First!**
> Before extracting a massive, important channel, we highly recommend testing the script to see how it works! Search your Slack for a public channel named `#test-channel-slack-extractor` and join it. If you can't find it, you can easily create your own. Read our quick [**Testing Guide**](TESTING_GUIDE.md) for instructions on how to run a safe practice extraction.

### 🎥 Video Walkthrough
Prefer a visual guide? Watch this short step-by-step demonstration showing exactly how to capture your token, update the configuration, and run the script from start to finish:

https://github.com/user-attachments/assets/b99a5e28-dddf-42c4-8420-d620440c6e8f

---

### Step A: Capture your Session Token
Slack uses a temporary web session token called an `xoxc` token. It is attached to almost every background action you take. You need this to authorize the script.
1. Open your target Slack channel in your browser.
2. Open **Developer Tools** (`F12` or `Right-Click > Inspect`) and go to the **Network** tab.
   * *Need help opening this? Refer to the official guides for [Chrome / Prisma Browser](https://developer.chrome.com/docs/devtools/open), [Microsoft Edge](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/open/), or [Safari](https://developer.apple.com/safari/tools/).*
3. In the "Filter" box, type `conversations`.
4. In your main Slack window, click the **Channel Name** at the top-left. *(This forces Slack to load channel data and guarantees a network request appears!).*
5. In the Developer Tools window, click on **ANY** of the requests that just appeared (such as `conversations.info`, `conversations.view`, or `conversations.genericInfo`). They all contain the correct token!
6. Click the **Payload** tab and locate the `token` parameter (the text will start with `xoxc-`).
   * *Note: If you also see an `enterprise_token`, ignore it. Just use the standard `token`.*
7. **Right-click** on the token text and select **Copy Value**.
   * *⚠️ Warning: Do not share this token; it is your temporary session password.*
  
<img width="1434" height="884" alt="image" src="https://github.com/user-attachments/assets/079ca306-0d5d-4b47-9227-d54a3e872520" />


### Step B: Configure the Script
Open the `slack_extractor_script.js` file you downloaded using a simple text editor (like **Notepad** on Windows, **TextEdit** on Mac, or **VS Code**). 

At the very top of the file, you will see the default configuration block:

```javascript
// --- CONFIGURATION ---
const TOKEN = "YOUR_TOKEN_HERE"; 
const CHANNEL_ID = "C1234567890"; 
const START_DATE = "2026-01-01";
const END_DATE = "2026-01-31";
```

**What these values mean and how to get them:**
* **`TOKEN`:** Paste the `xoxc-` token you copied in Step A here. This acts as your secure ID badge so Slack knows your browser is authorized to view the messages.
* **`START_DATE` & `END_DATE`:** The exact timeframe you want to extract. It must be in `YYYY-MM-DD` format. 
* **`CHANNEL_ID`:** The exact system ID for the chat room you want to extract.
  * *How to find it:* Since you just clicked the **Channel Name** in Step A, the details pop-up is already open! Click the **About** tab, scroll to the very bottom, and click the "Copy" icon next to the Channel ID (e.g., `C0B3ZDH5E74`).

<img width="1009" height="783" alt="image" src="https://github.com/user-attachments/assets/bde4f692-074e-4c86-b1b1-ab4f07fd0d19" />

**The Final Result:**
Once you have collected your Token and Channel ID, update the first four lines of your file. Your configured script should now look something like this filled-out example:

```javascript
// --- CONFIGURATION ---
const TOKEN = "xoxc-12345678-98765432-11223344-a1b2c3d4e5f6g7h8"; 
const CHANNEL_ID = "C0B3ZDH5E74"; 
const START_DATE = "2026-05-15"; 
const END_DATE = "2026-05-17";   
```

> ⚠️ **CRITICAL: Do not edit anything below the "DO NOT EDIT" line.** > The rest of the code contains the complex logic required to safely communicate with Slack's API, handle rate limits, and format your Markdown. Changing anything below the configuration block will break the automation.


### Step C: Run the Extraction
1. Select **all** the text in your newly configured text file (`Ctrl + A`) and copy it (`Ctrl + C`).
2. Switch to the **Console** tab in your browser's Developer Tools.
3. Paste your configured script and press **Enter**.
4. **Wait:** You will see "Batch received" and "Fetching replies" messages appear as the script works. For a full month, this may take 1-2 minutes.
   * *Emergency Stop:* If you need to stop the script mid-run, type `stopNow = true` in the console and press Enter.

> 🛑 **Did you hit an error?** > If you press Enter and see a warning that says *"Don't paste code..."*, an `Uncaught SyntaxError`, or an `auth_error`, please read the [**Troubleshooting Guide**](TROUBLESHOOTING.md) to learn how to instantly fix it.

<img width="1402" height="798" alt="image" src="https://github.com/user-attachments/assets/cc5d803c-09f0-456b-b07c-1fd6c15c8944" />


### Step D: Save your Data (Triple Failsafe)
Once the console says **✅ EXTRACTION COMPLETE!**, a large overlay window will appear. You have three ways to save:
1. **Auto-Download:** The script will attempt to auto-download the `.md` file to your browser's download folder. 
2. **Overlay Buttons:** Use the **⬇️ Download File** or **📋 Copy Text** buttons inside the overlay window.
3. **Manual Copy:** If the buttons are blocked by enterprise security, click inside the large text box, press `Ctrl + A` (Select All), then `Ctrl + C` (Copy), and paste into a local text editor.

<img width="1497" height="870" alt="image" src="https://github.com/user-attachments/assets/0593dfad-e2fd-4e77-a12a-3436e8943453" />

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

## 4. Frequently Asked Questions (FAQ)

### Can I grab the token from a different API request? Are they different?
**Yes, you can use almost any request!** The `xoxc-` token is your global web session badge, and it is attached to almost every single API call Slack makes in the background. Whether you grab it from `conversations.info`, `users.counts`, or `conversations.history`, it is the exact same token and will work perfectly. 

### I see both `token` and `enterprise_token` in the Payload. Which one do I use?
If your company uses a Slack Enterprise Grid, you will likely see both of these fields in the Developer Tools payload. They are usually the exact same `xoxc-` string. However, to ensure the script functions properly, always copy the value specifically labeled **`token`**.

### What is the `xoxc` token and how often does it expire?
The `xoxc` token is your temporary web session token. It is generated when you log into Slack via the browser. It typically expires when you log out, clear your cookies, or when your enterprise's SSO session times out (usually 24 hours to a few days). 

### Can I extract Private Channels or Direct Messages (DMs)?
**Yes.** As long as your logged-in user account is a member of that private channel or DM. You can find the ID for a DM by looking at the URL in your browser when the DM is open (it usually starts with `D` or `C`). 

### Can I extract years of history all at once?
Technically yes, but it is **highly recommended to extract in 1-to-3 month batches**. Browsers have hard limits on how much text memory a single tab can hold. If you try to extract 5 years of a highly active channel at once, the Chrome tab will likely run out of memory and crash before finishing.

### Does this script extract emoji reactions (👍) or polls?
**No.** To keep the Markdown output clean and optimized for knowledge bases and LLM ingestion, the script intentionally ignores emoji reactions and poll voting data. It only captures the conversational text and file links.

### What happens to edited or deleted messages?
The script pulls the current, live state of the Slack database. If a message was deleted, it is gone and will not be extracted. If a message was edited, the script will extract the newest, edited version of the text.

### Does this script download files, images, or attachments?
**No.** To maintain strict security and keep the export file size small, the script does not download actual files or images. Instead, it captures the private Slack URLs for those files. You (or anyone reading the document) must be actively logged into the company Slack to view them, ensuring your proprietary files remain securely behind authentication.

### Will I hit Slack API limits or get temporarily banned?
Slack employs Tier 3 rate limits for the `conversations.history` and `conversations.replies` endpoints (roughly 50+ requests per minute). This script includes forced `sleep()` delays between API calls (350ms to 450ms) specifically designed to respect Slack's rate-limiting rules. It mimics a safe rate of human traffic and will not trigger a DDoS flag or get your account suspended. 

### What happens if my computer goes to sleep or loses internet?
Because the script runs locally in your browser tab, a computer sleep state or network drop will sever the connection to the Slack API and halt the extraction. It is highly recommended to keep the Slack tab active and your computer awake during the run.

### Can I run this for multiple channels at once?
Currently, the script is designed to extract one channel at a time to prevent browser memory exhaustion (Chrome tabs can crash if they hold too much text data at once). To run for a new channel, simply update the `CHANNEL_ID` in your script, refresh the page, and execute it again.
