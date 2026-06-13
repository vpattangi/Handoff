const mockEmployee = {
id: "emp_001",
name: "James Carter",
role: "Senior Software Engineer",
department: "Engineering",
manager: "Sarah Chen",
startDate: "2019-03-15",
offboardDate: "2026-06-14",
emails: [
{
id: "email_001",
subject: "API Gateway Migration Plan",
body: "The migration to the new API gateway needs to happen in 3 phases. Phase 1 is auth service, Phase 2 is payment service, Phase 3 is notification service.",
date: "2026-05-01"
},
{
id: "email_002",
subject: "Weekly deployment process",
body: "Every Thursday at 2pm we run the deployment pipeline. The credentials are stored in Azure Key Vault under prod-deploy-creds.",
date: "2026-05-15"
}
],
teamsMessages: [
{
id: "teams_001",
channel: "Engineering",
message: "The database backup runs every night at 11pm. If it fails check the backup-service logs in Datadog.",
date: "2026-05-20"
},
{
id: "teams_002",
channel: "Engineering",
message: "John from QA has the test environment credentials. Always ping him before running load tests.",
date: "2026-06-01"
}
],
documents: [
{
id: "doc_001",
title: "System Architecture Overview",
content: "Our microservices run on AKS. The main clusters are prod-east and prod-west. Failover is automatic via Traffic Manager.",
lastModified: "2026-04-10"
},
{
id: "doc_002",
title: "Onboarding Checklist for New Engineers",
content: "1. Get Azure AD access from IT. 2. Clone the main repo from GitHub. 3. Set up local env using setup.sh. 4. Ping James for architecture walkthrough.",
lastModified: "2026-03-01"
}
],
codeRepos: [
{
id: "repo_001",
name: "payment-service",
description: "Handles all payment processing. James is the sole maintainer. No documentation exists for the retry logic.",
lastCommit: "2026-06-10"
}
]
};

module.exports = mockEmployee;