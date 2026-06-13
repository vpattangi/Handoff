# Handoff — Enterprise Knowledge Transfer Agent

> "Carry the knowledge forward."

Handoff is an AI-powered enterprise agent that transforms employee offboarding from a knowledge risk into a structured asset. When HR initiates an offboarding event, Handoff automatically retrieves the departing employee's documents and data, conducts an intelligent exit interview, and generates a comprehensive knowledge transfer package for the incoming employee.

## 🏆 Microsoft Agents League — Enterprise Agents Track

**Microsoft IQ Layers Used:**
- **Foundry IQ** — Azure OpenAI GPT-4o deployed through Azure AI Foundry for agent reasoning and synthesis
- **Work IQ** — Microsoft Graph API integration pulling real OneDrive files and Outlook data from Microsoft 365

## 🎯 Problem Statement

Every time an employee leaves a company, institutional knowledge walks out the door with them. Undocumented processes, critical system ownership, key relationships, and tribal knowledge are lost — costing enterprises weeks of productivity per offboarding event. Traditional KT sessions are rushed, incomplete, and inconsistent.

Handoff solves this by making knowledge transfer automatic, structured, and AI-powered.

## 🏗 Architecture
User (HR) → Handoff UI
↓
UserProxy Agent
↓
Microsoft Graph API (Work IQ)
→ Real OneDrive files
→ Outlook emails
↓
Knowledge Collection Agent
→ Analyzes all data sources
→ Extracts critical systems, risks, relationships
↓
Azure OpenAI GPT-4o (Foundry IQ)
→ Exit Interview Agent
→ Synthesizes knowledge package
↓
Knowledge Transfer Package
→ Ready for incoming employee

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **LLM:** Azure OpenAI GPT-4o via Azure AI Foundry (Foundry IQ)
- **Enterprise Data:** Microsoft Graph API via MSAL (Work IQ)
- **Auth:** Microsoft Entra ID (Azure AD)

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- Azure account with OpenAI resource deployed
- Microsoft 365 account for Graph API access

### Setup

1. Clone the repo
```bash
git clone https://github.com/vpattangi/Handoff.git
cd Handoff
npm install
```

2. Create .env file (see .env.example)
3. Authenticate with Microsoft 365
``` bash
node src/login.js
Follow the device code flow to authenticate.
```
4. Start the server
```node src/index.js
```
5. Open http://localhost:3000


🤖 Agent Pipeline

1. Knowledge Collection — Microsoft Graph API scans emails, OneDrive files, and documents
2. AI Analysis — Azure OpenAI extracts critical systems, undocumented processes, urgent risks, and key relationships
3. Exit Interview — Conversational AI conducts a structured exit interview with the departing employee
4. Package Generation — Comprehensive knowledge transfer document generated for the incoming employee

🔒 Security & Compliance

• Microsoft Entra ID for authentication
• Device code flow for secure user authentication
• No sensitive data stored — tokens cached locally only
• All data processing within Microsoft Azure infrastructure
• Input sanitization on all user queries

📊 Microsoft IQ Integration

Foundry IQ

Azure OpenAI GPT-4o is deployed through Azure AI Foundry and powers all reasoning, synthesis, and conversational capabilities of the agent pipeline.

Work IQ

Microsoft Graph API integration pulls real enterprise data:

• GET /me/messages — Outlook emails
• GET /me/drive/root/children — OneDrive documents
• Authenticated via Microsoft Entra ID with delegated permissions

👩‍🎓 Student Submission

This project was built by Ragavardhini Pattangi, a computational neuroscience researcher and AI engineer, for the Microsoft Agents League @ AI Skills Fest 2026.
