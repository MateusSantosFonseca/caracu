import { NextResponse } from 'next/server';
import type {
  ChatCompletion,
  ChatCompletionCreateParams,
} from 'openai/resources/chat';
import { z } from 'zod';

import type { Position } from '@/models/Schema';
import { ChatGptModel, ChatGptRole, getOpenAI } from '@/utils/chatgpt';
import {
  buildPrompt,
  createTeams,
  generateBenchMarkdown,
  generateTeamMarkdown,
  shuffleArray,
} from '@/utils/draw';
import { DrawSchema } from '@/validations/DrawValidation';

export interface PlayerInterface {
  rating: number;
  position: Position;
  stamina: number;
  name: string;
}

const smartlyDrawTeam = async (players: PlayerInterface[]) => {
  const prompt = buildPrompt({ players });

  const params: ChatCompletionCreateParams = {
    messages: [{ role: ChatGptRole.User, content: prompt }],
    model: ChatGptModel.GPT_4,
  };

  const openAi = getOpenAI();

  console.log("Sending prompt to OpenAI's API. Params:", params);
  const completion: ChatCompletion =
    await openAi.chat.completions.create(params);

  console.log("Received response from OpenAI's API");

  return (
    completion.choices.at(0)?.message.content ||
    "Error while getting the message from OpenAI's response"
  );
};

const randomDrawTeam = (players: PlayerInterface[]): string => {
  const shuffledPlayers = shuffleArray(players);
  const numberOfBenchPlayers = shuffledPlayers.length % 4;

  const teams: PlayerInterface[][] = createTeams(shuffledPlayers, 4);

  const teamMarkdown: string = generateTeamMarkdown(teams);
  let benchMarkdown: string = '';

  if (numberOfBenchPlayers > 0) {
    const benchPlayers = shuffledPlayers.slice(-numberOfBenchPlayers);
    benchMarkdown = generateBenchMarkdown(benchPlayers);
  }
  return teamMarkdown + benchMarkdown;
};

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const { players, isSmartDraw } = DrawSchema.parse(json);

    let markdownResponse = '';

    if (isSmartDraw) {
      markdownResponse = await smartlyDrawTeam(players);
    } else {
      markdownResponse = randomDrawTeam(players);
    }

    return NextResponse.json({ response: markdownResponse });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.format(), { status: 422 });

    console.error('Error:', error);
    return NextResponse.json({}, { status: 500 });
  }
};
