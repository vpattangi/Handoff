const mockEmployee = require('../data/mock-employee');
const { getUserProfile, getUserEmails, getUserFiles } = require('./graph-real');

function getEmployeeProfile(employeeId) {
return {
id: mockEmployee.id,
name: mockEmployee.name,
role: mockEmployee.role,
department: mockEmployee.department,
manager: mockEmployee.manager,
startDate: mockEmployee.startDate,
offboardDate: mockEmployee.offboardDate
};
}

function getEmployeeEmails(employeeId) {
return mockEmployee.emails;
}

function getEmployeeTeamsMessages(employeeId) {
return mockEmployee.teamsMessages;
}

function getEmployeeDocuments(employeeId) {
return mockEmployee.documents;
}

function getEmployeeRepos(employeeId) {
return mockEmployee.codeRepos;
}

async function getAllEmployeeData(employeeId) {
const mockData = {
profile: getEmployeeProfile(employeeId),
emails: getEmployeeEmails(employeeId),
teamsMessages: getEmployeeTeamsMessages(employeeId),
documents: getEmployeeDocuments(employeeId),
repos: getEmployeeRepos(employeeId)
};

try {
const realEmails = await getUserEmails('james.carter@example.com');
if (realEmails && realEmails.length > 0) {
console.log('[Graph] Using real Microsoft Graph email data');
mockData.emails = realEmails.map(e => ({
id: e.id,
subject: e.subject,
body: e.bodyPreview,
date: e.receivedDateTime
}));
} else {
console.log('[Graph] No real emails found, using mock data');
}
} catch(e) {
console.log('[Graph] Falling back to mock emails:', e.message);
}

try {
const realFiles = await getUserFiles('james.carter@example.com');
if (realFiles && realFiles.length > 0) {
console.log('[Graph] Using real Microsoft Graph file data');
mockData.documents = realFiles.map(f => ({
id: f.id,
title: f.name,
content: `File: ${f.name}, Last modified: ${f.lastModifiedDateTime}`,
lastModified: f.lastModifiedDateTime
}));
} else {
console.log('[Graph] No real files found, using mock data');
}
} catch(e) {
console.log('[Graph] Falling back to mock files:', e.message);
}

return mockData;
}

module.exports = {
getEmployeeProfile,
getEmployeeEmails,
getEmployeeTeamsMessages,
getEmployeeDocuments,
getEmployeeRepos,
getAllEmployeeData
};