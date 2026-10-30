const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
  try {
    const modelList = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).listModels();
    // Wait, the SDK method for listModels is on the genAI object or a specific way?
    // Actually, it's usually:
    // const models = await genAI.listModels(); 
    // But let's check the latest SDK.
    // In some versions it's genAI.getGenerativeModel({model: '...'}).listModels()? No.
    
    // Let's try the direct approach if possible or check docs.
    // For now, I'll try a common model name variation.
  } catch (e) {
    console.error(e);
  }
}

// Rewriting more simply to just try different names
async function test() {
  const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro-vision', 'gemini-1.5-pro'];
  for (const m of models) {
    try {
      console.log(`Testing ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("test");
      console.log(`Success with ${m}`);
      return;
    } catch (e) {
      console.error(`Failed ${m}: ${e.message}`);
    }
  }
}

test();
