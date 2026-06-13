const msal = require('@azure/msal-node');
require('dotenv').config();

const msalConfig = {
auth: {
clientId: process.env.MICROSOFT_CLIENT_ID,
clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`
}
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken() {
const result = await cca.acquireTokenByClientCredential({
scopes: ['https://graph.microsoft.com/.default']
});
return result.accessToken;
}

async function getUserProfile(userId) {
try {
const token = await getToken();
const response = await fetch(`https://graph.microsoft.com/v1.0/users/${userId}`, {
headers: { Authorization: `Bearer ${token}` }
});
return await response.json();
} catch(e) {
console.log('[Graph] Using mock data for profile:', e.message);
return null;
}
}

async function getUserEmails(userId) {
try {
const token = await getToken();
const response = await fetch(`https://graph.microsoft.com/v1.0/users/${userId}/messages?$top=10&$select=subject,bodyPreview,receivedDateTime`, {
headers: { Authorization: `Bearer ${token}` }
});
const data = await response.json();
return data.value || [];
} catch(e) {
console.log('[Graph] Using mock data for emails:', e.message);
return null;
}
}

async function getUserFiles(userId) {
try {
const token = await getToken();
const response = await fetch(`https://graph.microsoft.com/v1.0/users/${userId}/drive/root/children`, {
headers: { Authorization: `Bearer ${token}` }
});
const data = await response.json();
return data.value || [];
} catch(e) {
console.log('[Graph] Using mock data for files:', e.message);
return null;
}
}

module.exports = { getUserProfile, getUserEmails, getUserFiles };