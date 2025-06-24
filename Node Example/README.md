# Vulnerable Code Examples

⚠️ **WARNING: This code contains intentional security vulnerabilities for testing purposes only. DO NOT use in production!**

## Purpose

This repository contains intentionally vulnerable Node.js code examples to test and demonstrate various security scanning tools including:

- Static Application Security Testing (SAST)
- Dependency scanning
- Secret scanning
- Code linting with security rules

## Vulnerability Categories

### 1. SQL Injection (`sql-injection.js`)
- Direct string concatenation in SQL queries
- Unsanitized user input in database queries
- Dynamic query construction vulnerabilities

### 2. Cross-Site Scripting (XSS) (`xss-vulnerabilities.js`)
- Reflected XSS through URL parameters
- DOM-based XSS in JavaScript contexts
- Stored XSS through user comments

### 3. Insecure Cryptography (`insecure-crypto.js`)
- Hardcoded secrets and API keys
- Weak hashing algorithms (MD5)
- Insecure random number generation
- Timing attack vulnerabilities

### 4. Command Injection (`command-injection.js`)
- Shell command injection via user input
- File path traversal vulnerabilities
- Code injection through eval()
- Template injection attacks

### 5. Insecure Dependencies (`insecure-dependencies.js`)
- Insecure CORS configuration
- Weak session management
- Information disclosure
- Server-Side Request Forgery (SSRF)

### 6. Secrets and Configuration (`secrets-and-config.js`)
- Hardcoded database credentials
- API keys in source code
- Weak JWT configuration
- Insecure direct object references

## Security Issues to Detect

### Hardcoded Secrets
- Database passwords
- API keys (Stripe, AWS, SendGrid, GitHub)
- JWT secrets
- Encryption keys

### Code Vulnerabilities
- SQL injection points
- XSS vulnerabilities
- Command injection
- Path traversal
- Eval usage
- Weak cryptography

### Configuration Issues
- Insecure CORS settings
- Weak session configuration
- Missing security headers
- Debug endpoints in production

### Dependency Vulnerabilities
- Outdated packages with known CVEs
- Packages with security advisories
- Transitive dependency issues

## Testing Your Security Pipeline

1. **Run SAST tools** against these files to detect code vulnerabilities
2. **Run dependency scanners** to find vulnerable packages
3. **Run secret scanners** to detect hardcoded credentials
4. **Run security linters** to catch insecure coding patterns

## Expected Detections

Your security pipeline should detect:

✅ **Secrets**: Database URLs, API keys, tokens
✅ **SQL Injection**: String concatenation in queries
✅ **XSS**: Unescaped user input in HTML
✅ **Command Injection**: User input in shell commands
✅ **Weak Crypto**: MD5 hashing, weak random generation
✅ **Eval Usage**: Dynamic code execution
✅ **Path Traversal**: Unsanitized file paths
✅ **Vulnerable Dependencies**: Outdated packages

## Remediation Examples

For each vulnerability type, consider these secure alternatives:

- **SQL Injection**: Use parameterized queries
- **XSS**: Implement proper input sanitization and output encoding
- **Secrets**: Use environment variables and secret management
- **Command Injection**: Validate and sanitize all inputs
- **Crypto**: Use strong algorithms (bcrypt, crypto.randomBytes)
- **Dependencies**: Keep packages updated and monitor advisories

## Disclaimer

This code is for educational and testing purposes only. These vulnerabilities are intentional and should never be deployed to production environments.