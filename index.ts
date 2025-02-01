import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { config } from "dotenv";

config({ path: ".env.local" });

const openai = createOpenAI({
  compatibility: "strict"
});

async function main() {
  const { text, usage } = await generateText({
    model: openai("o3-mini"),
    prompt: "write a for loop in typescript",
    providerOptions: {
      openai: {
        reasoningEffort: "high"
      }
    }
  });

  console.log(text);
  console.log(text.length);
  console.log(usage);
}

main();
