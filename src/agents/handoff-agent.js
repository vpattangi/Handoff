const { OpenAI } = require('openai');
const { getAllEmployeeData } = require('../tools/graph-mock');
require('dotenv').config();

const client = new OpenAI({
apiKey: process.env.AZURE_OPENAI_KEY,
baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
defaultHeaders: {
'api-key': process.env.AZURE_OPENAI_KEY
},
defaultQuery: {
'api-version': '2024-02-01'
}
});

async function chat(messages, maxTokens = 1500) {
const response = await client.chat.completions.create({
model: process.env.AZURE_OPENAI_DEPLOYMENT,
messages,
temperature: 0.3,
max_tokens: maxTokens
});
console.log("Success:", response.choices[0].message.content.slice(0, 100));
return response.choices[0].message.content;
}

async function collectKnowledge(employeeId) {
const data = await getAllEmployeeData(employeeId);
const content = await chat([{
role: "user",
content: `You are Handoff, an enterprise AI agent specializing in knowledge transfer.

EMPLOYEE: ${data.profile.name} - ${data.profile.role}
DEPARTMENT: ${data.profile.department}

EMAILS:
${data.emails.map(e => `- ${e.subject}: ${e.body}`).join('\n')}

TEAMS MESSAGES:
${data.teamsMessages.map(t => `- ${t.channel}: ${t.message}`).join('\n')}

DOCUMENTS:
${data.documents.map(d => `- ${d.title}: ${d.content}`).join('\n')}

CODE REPOSITORIES:
${data.repos.map(r => `- ${r.name}: ${r.description}`).join('\n')}

Respond ONLY in valid JSON with these exact keys: criticalSystems (array of strings), undocumentedProcesses (array of strings), keyRelationships (array of strings), urgentRisks (array of strings), exitInterviewQuestions (array of strings). No extra text before or after the JSON.`
}]);

try {
return JSON.parse(content);
} catch(e) {
const match = content.match(/\{[\s\S]*\}/);
if (match) return JSON.parse(match[0]);
throw new Error("Could not parse knowledge JSON");
}
}

async function conductExitInterview(employeeId, conversationHistory) {
const data = await getAllEmployeeData(employeeId);
return await chat([
{
role: "system",
content: `You are Handoff, conducting an exit interview for ${data.profile.name}. Extract maximum institutional knowledge. Ask specific targeted questions. Be conversational but focused.`
},
...conversationHistory
], 500);
}

async function generateKnowledgePackage(employeeId, interviewTranscript) {
const data = await getAllEmployeeData(employeeId);
const knowledge = await collectKnowledge(employeeId);
return await chat([{
role: "user",
content: `Generate a knowledge transfer package for the incoming employee replacing ${data.profile.name}.

COLLECTED KNOWLEDGE: ${JSON.stringify(knowledge)}
EXIT INTERVIEW: ${interviewTranscript}

Include:
1. Role Overview
2. Critical Systems and Access Needed
3. Key Processes and How-Tos
4. Important Contacts
5. First Week Priorities
6. Known Risks and Watch-outs

Format as a clear actionable document.`
}], 2000);
}

module.exports = { collectKnowledge, conductExitInterview, generateKnowledgePackage };