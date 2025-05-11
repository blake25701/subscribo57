const requiredEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET'
];

function checkEnvVariables() {
  console.log('🔍 Checking environment variables...\n');
  let missingVars = false;

  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      console.error(`❌ Missing ${varName}`);
      missingVars = true;
    } else {
      console.log(`✅ ${varName} is set`);
    }
  });

  if (missingVars) {
    console.error('\n⚠️  Some required environment variables are missing.');
    console.log('\nPlease add them to your .env.local file:');
    console.log(`
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
    `);
    process.exit(1);
  } else {
    console.log('\n✨ All required environment variables are set!');
  }
}

checkEnvVariables(); 