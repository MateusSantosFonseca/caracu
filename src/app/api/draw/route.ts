import console from 'console';
import { NextResponse } from 'next/server';
import type {
  ChatCompletion,
  ChatCompletionCreateParams,
} from 'openai/resources/chat';
import { z } from 'zod';

import { ChatGptModel, ChatGptRole, getOpenAI } from '@/utils/chatgpt';
import { buildPrompt } from '@/utils/draw';
import { DrawSchema } from '@/validations/DrawValidation';

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const body = DrawSchema.parse(json);

    const prompt = buildPrompt({ players: body });

    const params: ChatCompletionCreateParams = {
      messages: [{ role: ChatGptRole.User, content: prompt }],
      model: ChatGptModel.GPT_4,
    };

    const openAi = getOpenAI();

    console.log("Sending prompt to OpenAI's API");
    const completion: ChatCompletion =
      await openAi.chat.completions.create(params);

    console.log("Received response from OpenAI's API");

    const response =
      completion.choices.at(0)?.message.content ||
      "Error while getting the message from OpenAI's response";

    return NextResponse.json({ response });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.format(), { status: 422 });
    return NextResponse.json({}, { status: 500 });
  }
};
