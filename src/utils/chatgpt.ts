import { OpenAI } from 'openai';

export function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
}

export enum ChatGptRole {
  System = 'system',
  User = 'user',
}

export enum ChatGptModel {
  GPT_3_5 = 'gpt-3.5-turbo-1106',
  GPT_4 = 'gpt-4',
}
