const fs = require('fs');
require('dotenv').config();

const TOKEN_FILE = '.token.json';

async function getToken() {
if (!fs.existsSync(TOKEN_FILE)) {
throw new Error('Not authenticated. Run: node src/login.js');
}
const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
return tokenData.accessToken;
}

async function getUserEmails() {
try {
const token = await getToken();
const res = await fetch('https://graph.microsoft.com/v1.0/me/messages?$top=10&$select=subject,bodyPreview,receivedDateTime', {
headers: { Authorization: `Bearer ${token}` }
});
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
const data = await res.json();
return data.value || [];
} catch(e) {
console.log('[Graph] Files fetch failed:', e.message);
return null;
}
}

module.exports = { getUserEmails, getUserFiles };