# Security Policy

This MVP stores demo state in browser local storage and does not process real payments or credentials.

Before production use, add:

- Server-side authentication and authorization.
- Database-backed audit logs for admin actions.
- Rate limits for signup, booking requests, reports, and external links.
- File upload validation and private storage for resumes.
- Abuse review workflows for reports, suspicious links, and repeated complaints.
- Clear data deletion flows for accounts, attachments, and profile links.

Do not store card numbers, bank credentials, payment processor secrets, payout accounts, or private meeting credentials in this application.
