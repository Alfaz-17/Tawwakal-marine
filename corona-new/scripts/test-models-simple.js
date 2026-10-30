const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded for debugging 
const genAI = new GoogleGenerativeAI("AIzaSyCKBDAYHYZDAgg4bWNy0Z5F7IAub4gWMis");

async function test() {
  // Common variants
  const models = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-pro-latest', 'gemini-pro'];
  for (const m of models) {
    try {
      console.log(`Testing ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello");
      const text = result.response.text();
      console.log(`Success with ${m}: ${text.substring(0, 20)}...`);
      return;
    } catch (e) {
      console.log(`Failed ${m}: ${e.message}`);
    }
  }
}

test();
