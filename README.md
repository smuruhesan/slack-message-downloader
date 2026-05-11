This README provides step-by-step instructions for using the **Slack API Vacuum** script. This tool is designed to bypass enterprise security restrictions (like Prisma Access) by extracting Slack conversation data directly into a "Copy-Paste" window.

The output is formatted specifically for **NotebookLM**, featuring thread-based navigation, date grouping, and full anonymization (removing all User IDs).


## CHANNEL ID

#cortex-cloud = "C0812EFC362"; 
#cortex-cloud-cloudxql = "C09TCS8PWV6"


---

# 🚀 Slack API Vacuum: Knowledge Extractor for NotebookLM

## 1. Prerequisites
* **Browser:** Use a web-based browser (Chrome, Edge, or Prisma Access Browser).
* **URL:** You **must** be logged into Slack at [https://app.slack.com/](https://app.slack.com/). 
  * *Note: The script will not work inside the Slack Desktop App.*

---

## 2. Step-by-Step Instructions

### Step A: Capture your Session Token
1. Open your target Slack channel (e.g., `#cortex-cloud`).
2. Open **Developer Tools** (`F12`) and go to the **Network** tab.
3. In the "Filter" box, type `history`.
4. Scroll up once in your Slack chat to trigger a load.
5. Click on the `conversations.history` request that appears.
6. Click the **Payload** tab and copy the `token` (starts with `xoxc-`).

### Step B: Run the Extraction
1. Switch to the **Console** tab in Developer Tools.
2. Paste the  **script**.
3. Replace `YOUR_TOKEN_HERE` with your copied token.
4. Set your `START_DATE` and `END_DATE`.
5. Press **Enter**.

### Step C: Save your Data (Triple Failsafe)
Once the console says **✅ EXTRACTION COMPLETE!**, use one of these three methods:
1. **Auto-Download:** Check your browser's download folder for the `.md` file.
2. **Console Link:** Click the blue `blob:` link printed in the console.
3. **Overlay Window:** Use the large window that appeared over Slack. Click **"Copy to Clipboard"**, then paste into a text file on your computer and save it as `Cortex_Export.md`.

---

## 3. What this Script does to your Data
To make this file "AI-Ready" for NotebookLM, the script performs several background transformations:

### 🛡️ Hard Anonymization (`@U...` IDs)
In Slack’s database, users are stored as IDs (e.g., `<@U0123456>`). If left in the text, NotebookLM sees these as technical keywords, which can confuse its answers. 
* **The Script:** Uses a Regex filter to find and delete every User ID and Mention, leaving only the "human" technical conversation.

### 🧵 Thread Reconstruction
Slack stores replies separately from main posts. If you just copy-pasted the screen, you would lose the context of the answers.
* **The Script:** Sees if a post has replies, goes back into the database to find those specific replies, and "nests" them directly under the main question.

### 🗺️ Navigation Headings
NotebookLM works best when it has a "Table of Contents." 
* **The Script:** Takes the first 50 characters of every new thread and turns it into a `### Heading`. This allows NotebookLM to index the file by **Topic**, making your citations much more accurate.

### 🔗 Single-Link Context
Instead of cluttering every line with a URL, the script places a **single deep-link** at the top of each thread. 
* **The Benefit:** If the AI gives you an answer and you want to see the original screenshots or files in Slack, you can click that one link to jump exactly to that moment in the Slack history.

---

**Tip for NotebookLM:** Once you upload this `.md` file, use the **"Notebook Guide"** to generate a "Briefing Doc." It will use the script's thread headings to give you a high-level summary of everything discussed in that month!













=============================


Older Readme Version below






This README provides step-by-step instructions for using the **Slack API Vacuum** script. This tool is designed to bypass enterprise security restrictions (like Prisma Access) by extracting Slack conversation data directly into a "Copy-Paste" window.

The output is formatted specifically for **NotebookLM**, featuring thread-based navigation, date grouping, and full anonymization (removing all User IDs).

---

# 🚀 Slack API Vacuum: Knowledge Extractor for NotebookLM

## Overview
This script talks directly to the Slack backend to "vacuum" up a month's worth of data. It preserves thread structures and replaces messy User IDs with clean, technical headings.

### Prerequisites
* **Browser**: Use a web-based browser (Chrome, Edge, or Prisma Access Browser).

* **URL**: You must be logged into Slack at https://app.slack.com/.

* **Note**: The script will not work inside the Slack Desktop App.


### Key Features:
* **Identity-Free:** Automatically strips all `<@U12345>` mentions and User IDs.
* **Thread Headings:** Uses the first 50 characters of a post as a heading for easy navigation in NotebookLM.
* **Single-Link Policy:** Provides one Slack deep-link per thread to keep the document clean.
* **Overlay Method:** Displays a large text window over Slack to bypass "Download Blocked" security policies.

---

## Step 1: Prepare your Browser
1.  Open **Slack** in your Chrome or Prisma Access browser.
2.  Navigate to the channel you want to capture (e.g., `#cortex-cloud`).
3.  Open **Developer Tools** by pressing `F12` or `Right-Click > Inspect`.
4.  Click on the **Network** tab at the top of the Developer Tools panel.



---

## Step 2: Capture your Session Token
Slack uses a temporary security token called an `xoxc` token. You need this to authorize the script.

1.  In the Network tab "Filter" box (top left), type: `history`
2.  Click back into the Slack chat and **scroll up once** to trigger a message load.
3.  In the Network tab list, look for a request named `conversations.history`. Click it.
4.  In the panel that opens on the right, click the **Payload** tab.
5.  Find the field named **`token`**. It starts with `xoxc-...`. 
6.  **Copy the entire token string.** (Do not share this; it is your temporary password).



---

## Step 3: Configure the Script
Paste the script into a text editor (like Notepad) to set your parameters before running it.

* **`TOKEN`**: Paste your `xoxc-...` token between the quotes.
* **`START_DATE` / `END_DATE`**: Set your range in `YYYY-MM-DD` format.
* **`CHANNEL_ID`**: Set to the ID of the channel (I have hardcoded `#cortex-cloud` as `C0812EFC362`).

---

## Step 4: Execution
1.  Go to the **Console** tab in the Developer Tools.
2.  Paste your configured script and press **Enter**.
3.  **Wait:** You will see "Batch received" and "Fetching replies" messages appear as the script works.
    * *Note: For a full month, this may take 1-2 minutes.*

---

## Step 5: Capture the Data
Once the script prints `✅ EXTRACTION COMPLETE!`, a large white window will appear over your Slack interface.

1.  Click the green **"Copy to Clipboard"** button.
    * *If the button doesn't work:* Click inside the large text box, press `Ctrl + A` (Select All), then `Ctrl + C` (Copy).
2.  Open a text editor on your computer (Notepad, VS Code, or TextEdit).
3.  **Paste** the content and save the file with a `.md` extension (e.g., `Cortex_Dec_2025.md`).
4.  Click the red **"Close Window"** button on the Slack overlay to return to your chat.

---

## Step 6: Importing to NotebookLM
1.  Go to [NotebookLM](https://notebooklm.google.com/).
2.  Create a new Notebook or open an existing one.
3.  Upload your saved `.md` file.
4.  **Best Practice:** NotebookLM will now treat each `### Thread` heading as a separate chapter. You can ask questions like:
    * *"Summarize the main technical issues discussed on December 12th."*
    * *"What was the resolution for the k8s cluster glitch mentioned in the threads?"*

---

### ⚠️ Security & Troubleshooting
* **Token Expiry:** If the script returns an "auth_error," your token has expired. Refresh the Slack page and grab a fresh `xoxc` token from the Network tab.
* **Rate Limiting:** The script has built-in "sleep" timers to avoid being flagged by Slack. Do not remove these timers.
* **Identity Removal:** The script removes the most common Slack ID formats. If you see remaining IDs, they are likely mentioned as plain text by users.









==================================
==================================
==================================


To understand why we go through all this "cleaning," you have to look at the difference between how **you** see Slack and how the **database** sees Slack.

### 1. What is the `@U...` ID?
In the world of Slack, your name is just a "label," but your **User ID** is your true identity. 

* **Display Name:** "William Mora" (This can be changed anytime).
* **User ID:** `U0812EF34` (This is unique, permanent, and never changes).

When you type a message like *"Hey @John, check this out,"* Slack doesn't store the word "John." It stores a "mention tag" that looks like this: `<@U1234567890>`. 



**Why we remove it:**
When you feed raw data into an AI like NotebookLM, it sees those IDs as high-priority "keywords." If a thread has 50 replies where people are tagging each other, the AI might get confused and think the "User ID" is a technical term or part of the error code. By stripping them, we force the AI to focus on the **actual technical conversation.**

---

### 2. How the "Cleaning" (Regex) Works
The script uses something called **Regular Expressions (Regex)**. Think of it as a "Super Search" that looks for patterns instead of specific words.

In the script, you see this line:
`clean = text.replace(/<@[A-Z0-9]+>/g, "");`



* **`<@`**: Look for the start of a mention.
* **`[A-Z0-9]+`**: Look for any combination of letters and numbers (the ID itself).
* **`>`**: Look for the end of the tag.
* **`g`**: Do this for the "Global" document (don't stop at the first one).
* **`""`**: Replace it with absolutely nothing (delete it).

---

### 3. Behind the Scenes: The "Thread" Logic
Usually, when you copy-paste from a website, you lose the "connection" between a question and its answer. Slack's database stores messages as a flat list. Our script performs a **Secondary Fetch** to reconstruct the conversation.

1.  **The History Call:** The script grabs the main channel messages (the "Parent" posts).
2.  **The Replies Call:** If a message has a `reply_count > 0`, the script makes a *second* request to the database specifically for that thread's ID.
3.  **The Nesting:** It then "glues" those replies underneath the parent so that when NotebookLM reads it, the AI understands that the reply is a direct response to the question above it.



---

### 4. Why we added the "Heading" Snippets
NotebookLM is great at reading documents, but it needs a "Map." 

By turning the first 50 characters of a message into a `### Heading`, we are creating a **Table of Contents**.
* **Without Headings:** NotebookLM sees one giant wall of text.
* **With Headings:** NotebookLM treats every thread as a "Topic." 

This allows you to ask the AI: *"Give me a list of all the topics discussed this month,"* and it will give you a perfect bulleted list based on those headings.

Does that help clarify why the "Identity-Free" version is actually "AI-Optimized" for your project?