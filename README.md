# Handoff — Enterprise Knowledge Transfer Agent

> "Carry the knowledge forward."

Handoff is an AI-powered enterprise agent that transforms employee offboarding from a knowledge risk into a structured asset. When HR initiates an offboarding event, Handoff automatically retrieves the departing employee's documents and data, conducts an intelligent exit interview, and generates a comprehensive knowledge transfer package for the incoming employee.
## Video DEMO: [https://youtu.be/aTUU21BfmzQ ](https://youtu.be/voMd6P_id8w)
## 🏆 Microsoft Agents League — Enterprise Agents Track

**Microsoft IQ Layers Used:**
- **Foundry IQ** — Azure OpenAI GPT-4o deployed through Azure AI Foundry for agent reasoning and synthesis
- **Work IQ** — Microsoft Graph API integration pulling real OneDrive files and Outlook data from Microsoft 365

## 🎯 Problem Statement

Every time an employee leaves a company, institutional knowledge walks out the door with them. Undocumented processes, critical system ownership, key relationships, and tribal knowledge are lost — costing enterprises weeks of productivity per offboarding event. Traditional KT sessions are rushed, incomplete, and inconsistent.

Handoff solves this by making knowledge transfer automatic, structured, and AI-powered.

## 👩‍🎓 About the Developer
CS Student @ San Jose State University. This project was inspired by a real KT failure experienced by a family member during corporate offboarding. Built for the Microsoft Agents League Hackathon 2026.

## Business Case & ROI

Knowledge loss is one of the most underestimated costs in enterprise operations. Every time a senior employee leaves, their institutional knowledge leaves with them — and most organizations have no system to stop it.

### The Cost of Getting This Wrong

| Cost Driver | Estimated Impact |
|---|---|
| Replacing a senior employee | $50,000 to $150,000 |
| Lost productivity per week of knowledge gap | $2,000 to $5,000 |
| Engineering hours spent rediscovering undocumented processes | 40 to 120 hours per offboarding event |
| Increased error rate from knowledge gaps | Highly variable, often critical |

For an organization losing 10 senior employees per year, unmanaged knowledge transfer costs an estimated $500,000 to $1,500,000 annually in direct and indirect losses.

### How Handoff Compresses That Cost

- **Reduces time-to-productivity** for incoming employees by delivering a complete, role-specific knowledge package before day one
- **Eliminates undocumented process risk** by using AI to surface institutional knowledge that employees never thought to write down
- **Scales linearly** across the organization without additional HR overhead — one agent handles every offboarding event the same way
- **Integrates into existing Microsoft 365 workflows** so adoption friction is near zero for enterprises already on the Microsoft stack

### The ROI Formula

If Handoff reduces the knowledge gap period by just two weeks per offboarding event, and the fully-loaded cost of an engineer is $100,000 per year:

> 2 weeks saved x $100,000 / 52 weeks = **$3,846 saved per offboarding event**

At 10 offboarding events per year that is **$38,460 in direct ROI** — not counting reduced error rates, faster onboarding, or preserved institutional knowledge that would otherwise be permanently lost.

### Target Market

- **Enterprise HR teams** seeking to modernize offboarding workflows
- **Engineering organizations** with high attrition or rapid scaling
- **Regulated industries** (finance, healthcare, legal) where knowledge loss creates compliance risk
- **Any Microsoft 365 organization** looking to protect institutional knowledge at scale

Handoff is not a nice-to-have. It is infrastructure for organizational memory.

## 🏗 Architecture
```
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
```
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
```
git clone https://github.com/vpattangi/Handoff.git
cd Handoff
npm install
```

2. Create .env file (see .env.example)
3. Authenticate with Microsoft 365
``` 
node src/login.js
```
Follow the device code flow to authenticate.

4. Start the server
```node src/index.js ```

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

• Outlook emails
• OneDrive documents
• Authenticated via Microsoft Entra ID with delegated permissions

## Security & Input Sanitization

All user input is sanitized before processing:
- Input length limited to 2000 characters
- HTML tags stripped to prevent XSS
- Prompt injection patterns detected and removed (e.g. "ignore previous instructions", "system prompt", "forget everything")
- System and user message namespaces kept separate in all LLM calls
- Microsoft Graph tokens validated for expiry before each API call

## Hallucination Prevention

The CitationValidation layer cross-references all agent responses against retrieved data:
- Responses are validated against source data before being returned
- Confidence scoring: HIGH, MEDIUM, LOW based on verifiability
- Unverified references are flagged and logged
- Agent is instructed never to use training data — only retrieved Microsoft 365 content

## Production Roadmap

In a production deployment Handoff would:
- Integrate with Microsoft Teams via webhook to automatically trigger when HR initiates offboarding
- Send the departing employee an email via Outlook with a link to their exit interview
- Save the generated knowledge package to SharePoint for the incoming employee
- Use Power Automate to route the package to the right people automatically
- Implement refresh token flow for Microsoft Graph instead of manual re-authentication

## 📄 License
Apache 2.0
