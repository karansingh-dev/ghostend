import { fileURLToPath } from "url";
import { dirname } from "path";
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "path";
import { fakerOptions } from "./fakerjs-mapper";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//prompt path
const filePath = path.resolve(__dirname, "../prompt/schemaGeneration.txt");

export const generateWithAi = async (userMessage: string): Promise<string> => {
  try {
    // const rules = fs.readFileSync(filePath, {
    //   encoding: "utf-8",
    // });

   

    const prompt = buildAiPrompt(userMessage, fakerOptions);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text)
      throw new Error("Failed to generate scheam with gemini");

    return response.text;
  } catch (error) {
    console.log("failed to generate scheam with gemini", error);
    throw error;
  }
};

const BASE_SCHEMA_PROMPT = `
You are an API schema generator for a mock data tool called Ghost End.

Your task is to read a natural language request for mock data and return a valid JSON object in the following structure:

{
  "type": "TYPE_NAME",
  "schema": {
  }
}

Rules:

1. Type:
- Must be a single lowercase word (e.g., "user", "product", "invoice").
- Use plural form if the request implies multiple entities (e.g., "users", "comments").

2. Schema:
- Each field value must be one of the supported faker mappers listed below.
- Use camelCase for field names.
- Nested objects are allowed.
- For lists, return an array with a single representative object.
- If a field is unsupported or ambiguous, omit it.

3. Supported faker mappers:
- You must use only the mappers from the list provided below.
- Do not invent new mappers or types.

Warning (No Nested Objects Allowed)

⚠️ IMPORTANT:
You must never create nested objects inside the JSON template.
Only simple key–value pairs are allowed.

- No nested objects

- No arrays

- No multi-level structures

Always return a flat, single-level object such as:

{
  "id": "string.uuid",
  "name": "person.fullName",
  "email": "internet.email",
  "phone": "phone.number",
}


Output format:

- Always return only raw JSON.
- No markdown, no backticks, no comments, no explanations.
`;

export function buildAiPrompt(
  userMessage: string,
  fakerOptions: { value: string; label: string }[]
) {
  const optionsBlock = fakerOptions.join("\n");
  return `
${BASE_SCHEMA_PROMPT}

Supported faker mappers list (value side of the schema object):
${optionsBlock}

User request:
${userMessage}

Respond with a JSON object like:
{
  "type": "typename",
  "schema": {
    "fieldName": "faker.mapper.path",
    "anotherField": "faker.mapper.path",
    "nestedExample": {
      "innerField": "faker.mapper.path"
    },
    "listExample": [
      {
        "fieldInList": "faker.mapper.path"
      }
    ]
  }
}
`;
}
