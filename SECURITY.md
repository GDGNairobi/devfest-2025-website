# Security Policy

## Supported Versions

We are currently supporting the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The GDG Nairobi team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via GitHub Security Advisories or create a private security report.

Include the following information in your report:

- **Type of issue** (e.g., SQL injection, XSS, authentication bypass)
- **Full paths of source file(s)** related to the manifestation of the issue
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

This information will help us triage your report more quickly.

### What to Expect

After you submit a vulnerability report, here's what will happen:

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours.

2. **Investigation**: Our team will investigate the issue and determine its impact and severity.

3. **Updates**: We will keep you informed about our progress as we work on a fix.

4. **Resolution**: Once we've fixed the vulnerability, we'll notify you and coordinate public disclosure.

5. **Credit**: If you'd like, we'll publicly thank you for your responsible disclosure.

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Deployment**: Varies based on severity
  - Critical: Within 24-48 hours
  - High: Within 7 days
  - Medium: Within 30 days
  - Low: Next regular release

## Security Best Practices

### For Contributors

When contributing code, please:

- **Never commit sensitive data** (API keys, passwords, tokens) to the repository
- **Use environment variables** for configuration secrets
- **Follow secure coding practices** (input validation, output encoding, etc.)
- **Keep dependencies updated** to patch known vulnerabilities
- **Review third-party packages** before adding them as dependencies

### For Users

When deploying this project:

- **Keep secrets secure**: Store API keys and tokens securely (use environment variables)
- **Use HTTPS**: Always deploy with SSL/TLS certificates
- **Keep updated**: Regularly update to the latest version
- **Monitor logs**: Watch for unusual activity
- **Follow least privilege**: Grant minimum necessary permissions

## Known Security Considerations

### Environment Variables

The following environment variables contain sensitive information and should be protected:

- `SANITY_WRITE_TOKEN` - Allows write access to Sanity CMS
- `SANITY_API_TOKEN` - API authentication token

### Third-Party Services

This project integrates with:

- **Sanity.io** - Content Management System
- **Cloudflare Pages** - Hosting platform

Ensure you follow security best practices for these services.

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release patches and publish a security advisory

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.

---

**Last Updated**: October 29, 2025
