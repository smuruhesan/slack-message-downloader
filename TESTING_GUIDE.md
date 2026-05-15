# 🧪 Testing Guide (Take it for a Spin!)

Before extracting your actual, important channels, we highly recommend running a quick practice extraction. This helps you get familiar with Developer Tools and ensures your browser isn't blocking anything.

### 1. Join the Test Channel
Search your Slack workspace for a public channel named `#test-channel-slack-extractor` and join it. 
*(If it doesn't exist, you can create a private or public channel just for yourself and use that instead).*

### 2. Populate the Test Data
To see exactly how the script handles dates, threads, tags, and file attachments, copy and paste the following messages into the test channel. 

*(Note: To see how the script handles separate dates, you can post these on actual different calendar days. Otherwise, post them all at once!)*

**Day 1: Testing Basic Threads**
* **Main Post:** "Day 1 Thread 1: Welcome to the test channel! This is the main post of our very first thread. Let's see if the replies nest correctly."
    * *Reply 1:* "This is thread reply 1. It should show up as a bullet point."
    * *Reply 2:* "This is thread reply 2. Testing complete!"
* **Main Post:** "Day 1 Thread 2: Just a standalone message with no replies to test formatting."

**Day 2: Testing Anonymization**
* **Main Post:** "Day 2 Thread 1: Let's test the identity scrubber. If I tag @here or tag a specific user, the script should automatically delete the ID in the final output to maintain privacy."
    * *Reply 1:* "Good point. I am replying to make sure tags inside replies are also scrubbed properly."

**Day 3: Testing Files and Links**
* **Main Post:** "Day 3 Thread 1: Here is a message containing an external link: https://github.com/smuruhesan/slack-message-downloader"
    * *Reply 1 (Attach a dummy image/PDF here):* "And here is a test file attached to a reply. The script should capture the private URL but not download the file itself."
* **Main Post:** "Day 3 Thread 2: Let's test emoji reactions on this message. 👍 👀 🚀"
    * *Reply 1:* "The script should ignore the reactions to keep the text clean."
* **Main Post:** "Day 3 Thread 3: Final test post to wrap up the batch. Everything looks good to go!"

### 3. Run the Extractor
Now that your channel has some great data, run your extraction!
1. Go to the **Network** tab in Developer Tools to grab your `TOKEN` (See Step A in the main guide).
2. Grab the `CHANNEL_ID` for your test channel.
3. Set the `START_DATE` and `END_DATE` in your script to cover the dates you posted the messages above.
4. Run the script in your Console!

If your markdown file downloads and the formatting looks beautiful, you are officially ready to use the tool on your real channels! Head back to the [**Main Guide**](README.md) whenever you are ready.
