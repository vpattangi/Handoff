const fs = require('fs');
require('dotenv').config();

const TOKEN_FILE = '.token.json';

function getStoredToken() {
if (!fs.existsSync(TOKEN_FILE)) return null;
try {
const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
const expiresOn = new Date(data.expiresOn);
const now = new Date();
const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
if (expiresOn > fiveMinutesFromNow) {
return data.accessToken;
}
console.log('[Graph] Token expired or expiring soon');
return null;
} catch(e) {
return null;
}
}

async function getToken() {
const stored = getStoredToken();
if (stored) return stored;
throw new Error('Microsoft Graph token expired. Please run: node src/login.js');
}

async function getUserEmails() {
try {
const token = await getToken();
const res = await fetch('https://graph.microsoft.com/v1.0/me/messages?$top=10&$select=subject,bodyPreview,receivedDateTime', {
headers: { Authorization: `Bearer ${token}` }
});
if (!res.ok) throw new Error('Graph API returned ' + res.status);
const data = await res.json();
return data.value || [];
} catch(e) {
console.log('[Graph] Email fetch failed:', e.message);
return null;
}
}

async function getUserFiles() {
try {
const token = await getToken();
const res = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
headers: { Authorization: `Bearer ${token}` }
});
if (!res.ok) throw new Error('Graph API returned ' + res.status);
const data = await res.json();
return data.value || [];
} catch(e) {
console.log('[Graph] Files fetch failed:', e.message);
return null;
}
}

module.exports = { getUserEmails, getUserFiles };