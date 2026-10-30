const https = require("https");
const fs = require("fs");

const apiKey = "AIzaSyCKBDAYHYZDAgg4bWNy0Z5F7IAub4gWMis";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    fs.writeFileSync("gemini_models.json", data);
    console.log("Saved models to gemini_models.json");
  });
}).on("error", (err) => {
  console.error("Error: " + err.message);
});
