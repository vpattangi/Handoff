const mockEmployee = require('../data/mock-employee');

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

function getAllEmployeeData(employeeId) {
return {
profile: getEmployeeProfile(employeeId),
emails: getEmployeeEmails(employeeId),
teamsMessages: getEmployeeTeamsMessages(employeeId),
documents: getEmployeeDocuments(employeeId),
repos: getEmployeeRepos(employeeId)
};
}

module.exports = {
getEmployeeProfile,
getEmployeeEmails,
getEmployeeTeamsMessages,
getEmployeeDocuments,
getEmployeeRepos,
getAllEmployeeData
}