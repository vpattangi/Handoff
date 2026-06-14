const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { collectKnowledge, conductExitInterview, generateKnowledgePackage } = require('./agents/handoff-agent');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const sessions = {};

function sanitizeInput(input) {
if (typeof input !== 'string') return '';
return input
.trim()
.slice(0, 2000)
.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
.replace(/[<>]/g, '')
.replace(/ignore previous instructions/gi, '')
.replace(/system prompt/gi, '')
.replace(/you are now/gi, '')
.replace(/forget everything/gi, '');
}

app.post('/api/start', async (req, res) => {
try {
const { employeeId } = req.body;
if (!employeeId) return res.status(400).json({ error: 'Employee ID required' });
const cleanEmployeeId = sanitizeInput(employeeId);
console.log(`Starting offboarding for employee: ${cleanEmployeeId}`);

const knowledge = await collectKnowledge(cleanEmployeeId);

sessions[cleanEmployeeId] = {
knowledge,
conversationHistory: [],
interviewTranscript: ''
};

const firstQuestion = await conductExitInterview(cleanEmployeeId, [
{ role: "assistant", content: `Hi ${cleanEmployeeId === 'emp_001' ? 'James' : 'there'}, I'm Handoff, your AI-powered knowledge transfer assistant. I'm here to make sure everything you know gets properly documented for whoever takes over your role. This should take about 15-20 minutes. Let's start — can you walk me through the most critical system or process that only you fully understand?` }
]);

sessions[cleanEmployeeId].conversationHistory.push(
{ role: "assistant", content: firstQuestion }
);

res.json({
success: true,
knowledge,
firstMessage: firstQuestion
});
} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

app.post('/api/interview', async (req, res) => {
try {
const { employeeId, message } = req.body;
if (!employeeId || !message) return res.status(400).json({ error: 'Missing required fields' });
const cleanEmployeeId = sanitizeInput(employeeId);
const cleanMessage = sanitizeInput(message);
const session = sessions[cleanEmployeeId];

if (!session) {
return res.status(404).json({ error: 'Session not found. Please restart the offboarding process.' });
}

session.conversationHistory.push({ role: "user", content: cleanMessage });
session.interviewTranscript += `Employee: ${cleanMessage}\n`;

const response = await conductExitInterview(cleanEmployeeId, session.conversationHistory);

session.conversationHistory.push({ role: "assistant", content: response });
session.interviewTranscript += `Handoff: ${response}\n`;

res.json({ success: true, message: response });
} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

app.post('/api/generate-package', async (req, res) => {
try {
const { employeeId } = req.body;
if (!employeeId) return res.status(400).json({ error: 'Employee ID required' });
const cleanEmployeeId = sanitizeInput(employeeId);
const session = sessions[cleanEmployeeId];

if (!session) {
return res.status(404).json({ error: 'Session not found. Please restart the offboarding process.' });
}

const package_ = await generateKnowledgePackage(cleanEmployeeId, session.interviewTranscript);

res.json({ success: true, package: package_ });
} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Handoff server running on port ${PORT}`);
});