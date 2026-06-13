const msal = require('@azure/msal-node');
const fs = require('fs');
require('dotenv').config();

const TOKEN_FILE = '.token.json';

const pca = new msal.PublicClientApplication({
auth: {
clientId: process.env.MICROSOFT_CLIENT_ID,
authority: 'https://login.microsoftonline.com/common'
}
});

async function login() {
const response = await pca.acquireTokenByDeviceCode({
scopes: ['Mail.Read', 'Files.Read', 'User.Read', 'offline_access'],
deviceCodeCallback: (response) => {
console.log('\n================================================');
console.log('Full response:', JSON.stringify(response));
console.log('================================================\n');
console.log('Waiting for you to authenticate...');
}
});

fs.writeFileSync(TOKEN_FILE, JSON.stringify({
accessToken: response.accessToken,
expiresOn: response.expiresOn
}));

console.log('Authentication successful! Token saved.');
process.exit(0);
}

login().catch(console.error);