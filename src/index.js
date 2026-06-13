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

app.post('/api/start', async (req, res) => {
try {
const { employeeId } = req.body;
console.log(`Starting offboarding for employee: ${employeeId}`);

const knowledge = await collectKnowledge(employeeId);

sessions[employeeId] = {
knowledge,
conversationHistory: [],
interviewTranscript: ''
};

const firstQuestion = await conductExitInterview(employeeId, [
{ role: "assistant", content: `Hi ${employeeId === 'emp_001' ? 'James' : 'there'}, I'm Handoff, your AI-powered knowledge transfer assistant. I'm here to make sure everything you know gets properly documented for whoever takes over your role. This should take about 15-20 minutes. Let's start — can you walk me through the most critical system or process that only you fully understand?` }
]);

sessions[employeeId].conversationHistory.push(
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
const session = sessions[employeeId];

if (!session) {
return res.status(404).json({ error: 'Session not found' });
}

session.conversationHistory.push({ role: "user", content: message });
session.interviewTranscript += `Employee: ${message}\n`;

const response = await conductExitInterview(employeeId, session.conversationHistory);

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
const session = sessions[employeeId];

if (!session) {
return res.status(404).json({ error: 'Session not found' });
}

const package_ = await generateKnowledgePackage(employeeId, session.interviewTranscript);

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