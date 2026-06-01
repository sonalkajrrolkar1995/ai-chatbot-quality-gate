if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  const envPath = path.join(__dirname, '..', '.env');

  try {
    require('fs').accessSync(envPath);
    const dotenv = require('dotenv');
    dotenv.config({ path: envPath });
  } catch (error) {
    console.warn('Warning: .env file not found. Using system environment variables.');
  }
}

module.exports = {
  geminiApiKey: process.env.GEMINI_API_KEY,
};
