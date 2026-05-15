# 🛠️ Troubleshooting (Fixing Common Errors)

If you ran into an error while attempting to extract data, find your issue below for a quick fix.

### 1. Error: `Uncaught SyntaxError: Invalid or unexpected token`
* **Why it happens:** Your computer's clipboard or a chat app (like Slack/Teams) accidentally injected hidden line breaks into the code when you copied it. 
* **How to fix:** Go back to the GitHub repository. Click the **"Copy raw contents"** button (the two overlapping squares icon in the top right corner of the code block). Paste this directly into the console and then update the Configurations directly inside Console. This is to avoid any hidden line breaks introduces by your Code/Text Editors (like TextEdit or VSCode) 

<img width="895" height="639" alt="image" src="https://github.com/user-attachments/assets/798dcf65-e709-415b-bf3c-9bc63e695700" />


### 2. Error: `auth_error` or `invalid_auth` in the console
* **Why it happens:** Your `xoxc` session token has expired.
* **How to fix:** Refresh your Slack tab entirely. Repeat Step A in the instructions to grab a fresh token from the Network tab, update your script, and try again.


### 3. Warning: "Don’t paste code into the DevTools Console..."
* **Why it happens:** Modern browsers (Chrome, Edge) have a security feature to stop people from accidentally pasting malicious code ("Self-XSS").
* **How to fix:** This is totally normal! Simply type the words `allow pasting` into the console, press Enter, and then paste the script again.

<img width="1127" height="78" alt="image" src="https://github.com/user-attachments/assets/dd687196-7524-45dd-becf-a01b636fbf3e" />

### 4. Issue: The script stops halfway through and the console freezes
* **Why it happens:** Your computer went to sleep, or you lost internet connection, severing the link to the Slack API. 
* **How to fix:** Refresh the Slack tab, ensure your computer stays awake, and run the script again.
