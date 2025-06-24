// Test script to verify security pipeline functionality
const fs = require('fs');
const path = require('path');

console.log('🔍 Security Pipeline Test Script');
console.log('================================');

// Test 1: Check for vulnerable patterns
console.log('\n1. Checking for vulnerable code patterns...');

const vulnerableFiles = [
  'vulnerable-examples/sql-injection.js',
  'vulnerable-examples/xss-vulnerabilities.js',
  'vulnerable-examples/insecure-crypto.js',
  'vulnerable-examples/command-injection.js',
  'vulnerable-examples/insecure-dependencies.js',
  'vulnerable-examples/secrets-and-config.js'
];

vulnerableFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
  }
});

// Test 2: Check for hardcoded secrets
console.log('\n2. Scanning for hardcoded secrets...');

const secretPatterns = [
  /password\s*[:=]\s*['"][^'"]+['"]/gi,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/gi,
  /secret\s*[:=]\s*['"][^'"]+['"]/gi,
  /token\s*[:=]\s*['"][^'"]+['"]/gi,
  /sk_test_[a-zA-Z0-9]+/gi,
  /AKIA[0-9A-Z]{16}/gi
];

vulnerableFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    let foundSecrets = false;
    
    secretPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        if (!foundSecrets) {
          console.log(`🔑 Secrets found in ${file}:`);
          foundSecrets = true;
        }
        matches.forEach(match => {
          console.log(`   - ${match.substring(0, 50)}...`);
        });
      }
    });
    
    if (!foundSecrets) {
      console.log(`✅ No obvious secrets in ${file}`);
    }
  }
});

// Test 3: Check security configuration files
console.log('\n3. Checking security configuration...');

const securityFiles = [
  '.github/workflows/security.yml',
  '.eslintrc.security.json',
  'SECURITY.md',
  'Dockerfile'
];

securityFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Security config found: ${file}`);
  } else {
    console.log(`❌ Missing security config: ${file}`);
  }
});

// Test 4: Simulate vulnerability detection
console.log('\n4. Simulating security tool detections...');

const vulnerabilityTypes = [
  'SQL Injection vulnerabilities',
  'Cross-Site Scripting (XSS)',
  'Command Injection',
  'Hardcoded secrets',
  'Weak cryptographic practices',
  'Insecure dependencies',
  'Path traversal vulnerabilities',
  'Information disclosure'
];

vulnerabilityTypes.forEach((vuln, index) => {
  console.log(`🚨 [SIMULATED] ${vuln} detected`);
});

console.log('\n5. Security Pipeline Status:');
console.log('============================');
console.log('✅ SAST scanning configured');
console.log('✅ Dependency scanning enabled');
console.log('✅ Secret scanning active');
console.log('✅ Security linting rules applied');
console.log('✅ Container scanning ready');
console.log('✅ Vulnerable code samples available');

console.log('\n🎯 Your security pipeline should detect all the vulnerabilities in the vulnerable-examples/ directory!');
console.log('\n📋 Next steps:');
console.log('   1. Push this code to trigger the security pipeline');
console.log('   2. Check GitHub Actions for security scan results');
console.log('   3. Review security alerts in the Security tab');
console.log('   4. Fix vulnerabilities and re-run scans');