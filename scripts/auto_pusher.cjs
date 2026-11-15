const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
let isProcessing = false;
let lastStatus = '';
let changeDetectedTime = 0;
const DEBOUNCE_MS = 3000;

console.log(`[Auto-Pusher] Starting file watcher daemon in: ${ROOT_DIR}`);
console.log(`[Auto-Pusher] Tracking active changes and auto-committing & pushing to origin/main...`);

function run(cmd) {
  return execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function checkAndPush() {
  if (isProcessing) return;

  try {
    const status = run('git status --porcelain').trim();
    if (!status) {
      lastStatus = '';
      changeDetectedTime = 0;
      return;
    }

    const now = Date.now();

    // If status changed or this is the first time we see changes, record timestamp
    if (status !== lastStatus) {
      lastStatus = status;
      changeDetectedTime = now;
      console.log(`\n[${new Date().toLocaleTimeString()}] Changes detected:`);
      console.log(status.split('\n').map(l => '  ' + l).join('\n'));
      console.log(`[Auto-Pusher] Waiting ${DEBOUNCE_MS / 1000}s for edits to settle before committing...`);
      return;
    }

    // If changes have remained unchanged for at least DEBOUNCE_MS, proceed with commit & push
    if (now - changeDetectedTime < DEBOUNCE_MS) {
      return;
    }

    isProcessing = true;
    console.log(`\n[${new Date().toLocaleTimeString()}] Edits settled. Staging, committing and pushing...`);

    // Stage all changes
    run('git add -A');

    // Summarize changed files for commit message
    const changedFiles = status
      .split('\n')
      .map(line => line.trim().slice(3).trim())
      .slice(0, 5)
      .join(', ');
    const extraCount = status.split('\n').length - 5;
    const summary = extraCount > 0 ? `${changedFiles} (+${extraCount} more)` : changedFiles;

    const commitMsg = `Update: ${summary}`;
    const commitOut = run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log(commitOut.trim());

    // Push to origin main
    console.log(`[Auto-Pusher] Pushing to origin main...`);
    const pushOut = run('git push origin main');
    if (pushOut.trim()) console.log(pushOut.trim());
    console.log(`[Auto-Pusher] ✓ Successfully pushed to GitHub at ${new Date().toLocaleTimeString()}`);

    lastStatus = '';
    changeDetectedTime = 0;
  } catch (err) {
    console.error(`[Auto-Pusher Error] ${err.message}`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
  } finally {
    isProcessing = false;
  }
}

// Check every 2 seconds
setInterval(checkAndPush, 2000);
