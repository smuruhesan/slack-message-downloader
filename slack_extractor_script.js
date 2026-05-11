// --- CONFIGURATION ---
const TOKEN = "YOUR_TOKEN_HERE"; 
const CHANNEL_ID = "C0812EFC362"; 
const START_DATE = "2026-01-01";
const END_DATE = "2026-01-31";

// --- DO NOT EDIT BELOW THIS LINE ---
window.stopNow = false; 
const WORKSPACE_URL = window.location.origin + "/api";
const oldestTs = new Date(`${START_DATE}T00:00:00`).getTime() / 1000;
const latestTs = new Date(`${END_DATE}T23:59:59`).getTime() / 1000;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchSlackApi(endpoint, params) {
    let form = new URLSearchParams();
    form.append("token", TOKEN);
    for (let key in params) form.append(key, params[key]);
    try {
        let response = await fetch(`${WORKSPACE_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include', 
            body: form
        });
        return await response.json();
    } catch (e) { return { ok: false, error: e.message }; }
}

function getFileName(channelName) {
    const start = new Date(`${START_DATE}T12:00:00`);
    const end = new Date(`${END_DATE}T12:00:00`);
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    const year = start.getFullYear();
    let dateStr = (startMonth === endMonth) ? `${startMonth} ${year}` : `${startMonth} - ${endMonth} ${year}`;
    return `Slack - ${channelName} - ${dateStr}.md`;
}

function formatText(text) {
    if (!text) return "";
    let clean = text.replace(/<@[A-Z0-9]+>/g, ""); 
    clean = clean.replace(/<([^|>]+)\|([^>]+)>/g, '[$2]($1)').replace(/<([^>]+)>/g, '[$1]($1)');
    clean = clean.replace(/U[A-Z0-9]{8,12}/g, ""); 
    return clean.trim();
}

async function startVacuum() {
    console.log(`%c 🚀 API Vacuum 3.0 Started!`, 'color: #00FF00; font-size: 16px; font-weight: bold;');
    
    let info = await fetchSlackApi("conversations.info", { channel: CHANNEL_ID });
    let channelName = info.ok ? info.channel.name : "Unknown-Channel";
    let finalFileName = getFileName(channelName);

    let allThreads = [];
    let hasMore = true;
    let nextCursor = "";

    while (hasMore && !window.stopNow) {
        let params = { channel: CHANNEL_ID, oldest: oldestTs, latest: latestTs, limit: 100 };
        if (nextCursor) params.cursor = nextCursor;
        let data = await fetchSlackApi("conversations.history", params);
        if (!data || !data.ok) break;
        let messages = data.messages || [];
        if (messages.length === 0) break;

        console.log(`%c Batch: ${messages.length} posts. (To stop early, type: stopNow = true)`, 'color: #00BFFF;');

        for (let msg of messages) {
            if (window.stopNow) break;
            if (msg.subtype || (msg.thread_ts && msg.thread_ts !== msg.ts)) continue;
            let threadObj = { parent: msg, replies: [] };
            if (msg.reply_count > 0) {
                console.log(`  └─ 🧵 Fetching ${msg.reply_count} replies...`);
                let rData = await fetchSlackApi("conversations.replies", { channel: CHANNEL_ID, ts: msg.ts, limit: 200 });
                if (rData.ok && rData.messages) threadObj.replies = rData.messages.slice(1);
                await sleep(350);
            }
            allThreads.push(threadObj);
        }
        hasMore = data.has_more;
        nextCursor = data.response_metadata?.next_cursor || "";
        await sleep(450);
    }

    allThreads.sort((a, b) => parseFloat(a.parent.ts) - parseFloat(b.parent.ts));

    let output = "";
    let lastDate = "";
    for (let thread of allThreads) {
        let p = thread.parent;
        let d = new Date(parseFloat(p.ts) * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        if (d !== lastDate) { output += `\n# DATE: ${d}\n${"=".repeat(d.length + 7)}\n\n`; lastDate = d; }
        let pLink = `https://slack.com/archives/${CHANNEL_ID}/p${p.ts.replace('.', '')}`;
        let pSnippet = p.text ? p.text.substring(0, 50).replace(/\n/g, " ") + "..." : "Attachment";
        output += `### Thread: ${pSnippet}\n[🔗 Slack Link](${pLink})\n\n**Main Post**: ${formatText(p.text)}\n`;
        if (p.files) p.files.forEach(f => output += `> 📎 [File: ${f.name}](${f.url_private})\n`);
        if (thread.replies.length > 0) {
            output += `\n**Replies:**\n`;
            for (let r of thread.replies) {
                output += `  * ${formatText(r.text)}\n`;
                if (r.files) r.files.forEach(rf => output += `    > 📎 [File: ${rf.name}](${rf.url_private})\n`);
            }
        }
        output += `\n---\n\n`;
    }

    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    // --- 1. INITIATE AUTO-DOWNLOAD ---
    console.log("%c 🛰️ Attempting Auto-Download...", "color: #FFA500;");
    try {
        const a = document.createElement('a');
        a.href = url;
        a.download = finalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("%c ✅ Auto-download signal sent.", "color: #00FF00;");
    } catch (err) {
        console.error("❌ Auto-download failed:", err);
    }

    // --- 2. CREATE OVERLAY WITH MANUAL BUTTONS ---
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:5%; left:5%; width:90%; height:90%; background:white; z-index:2147483647; border:3px solid #4A154B; border-radius:12px; padding:25px; box-shadow:0 0 50px rgba(0,0,0,0.6); display:flex; flex-direction:column; font-family: sans-serif;";

    const titleRow = document.createElement('div');
    titleRow.style = "display:flex; justify-content:space-between; align-items: center; margin-bottom: 15px;";
    titleRow.innerHTML = `<div><h3 style="margin:0; color:#333;">${finalFileName}</h3><p style="margin:0; color:gray; font-size:12px;">Review or Download Manually Below</p></div>`;

    const buttonGroup = document.createElement('div');

    // COPY BUTTON
    const copyBtn = document.createElement('button');
    copyBtn.innerText = "📋 Copy Text";
    copyBtn.style = "padding:10px 18px; background:#2eb67d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-right:8px;";
    copyBtn.onclick = async () => {
        await navigator.clipboard.writeText(output);
        copyBtn.innerText = "✅ Copied!";
        setTimeout(() => copyBtn.innerText = "📋 Copy Text", 2000);
    };

    // MANUAL DOWNLOAD BUTTON
    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = "⬇️ Download File";
    downloadBtn.style = "padding:10px 18px; background:#00BFFF; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-right:8px;";
    downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = finalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // CLOSE BUTTON
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "Close";
    closeBtn.style = "padding:10px 18px; background:#e01e5a; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;";
    closeBtn.onclick = () => { overlay.remove(); URL.revokeObjectURL(url); };

    buttonGroup.append(copyBtn, downloadBtn, closeBtn);
    titleRow.appendChild(buttonGroup);

    const textArea = document.createElement('textarea');
    textArea.style = "flex:1; width:100%; font-family:monospace; font-size:13px; padding:15px; border:1px solid #ddd; border-radius:6px; resize:none; background:#f9f9f9;";
    textArea.value = output;

    overlay.append(titleRow, textArea);
    document.body.appendChild(overlay);

    console.log(`%c ✅ DONE! If no download started, use the "Download File" button in the pop-up.`, "color: #00FF00; font-size: 14px; font-weight: bold;");
}

startVacuum();