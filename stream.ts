import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { config } from "dotenv";

config({ path: ".env.local" });

const openai = createOpenAI({
  compatibility: "strict"
});

async function main() {
  const result = streamText({
    model: openai("o3-mini"),
    prompt: "write a for loop in typescript",
    providerOptions: {
      openai: {
        reasoningEffort: "high"
      }
    },
    onFinish({ usage }) {
      console.log(`\n\n-- USAGE --: 
        \n${usage.totalTokens} total tokens
        \n${usage.promptTokens} prompt tokens
        \n${usage.completionTokens} completion tokens`);
    }
  });

  for await (const token of result.textStream) {
    process.stdout.write(token);
  }
  process.stdout.write("\n");
}

main();
