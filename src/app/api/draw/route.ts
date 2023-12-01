import { NextResponse } from 'next/server';
import type {
  ChatCompletion,
  ChatCompletionCreateParams,
} from 'openai/resources/chat';
import { z } from 'zod';

import { DrawType, type Position, type Stamina } from '@/models/Schema';
import { ChatGptModel, ChatGptRole, getOpenAI } from '@/utils/chatgpt';
import { customAlgorithmCreateTeam } from '@/utils/draw/custom';
import { generateMarkdown } from '@/utils/draw/markdown';
import { createTeams, shuffleArray } from '@/utils/draw/random';
import { buildPrompt } from '@/utils/draw/smart';
import { DrawSchema } from '@/validations/DrawValidation';

export interface PlayerInterface {
  id: number;
  name: string;
  rating: number;
  position: Position;
  stamina: Stamina;
}

const NUMBER_OF_TEAM_PLAYERS = 4;

const smartlyDrawTeam = async (players: PlayerInterface[]) => {
  const prompt = buildPrompt({ players });

  const params: ChatCompletionCreateParams = {
    messages: [{ role: ChatGptRole.User, content: prompt }],
    model: ChatGptModel.GPT_3_5,
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
  const numberOfBenchPlayers = shuffledPlayers.length % NUMBER_OF_TEAM_PLAYERS;
  const teams: PlayerInterface[][] = createTeams(
    shuffledPlayers,
    NUMBER_OF_TEAM_PLAYERS,
  );

  const benchPlayers =
    numberOfBenchPlayers > 0
      ? shuffledPlayers.slice(-numberOfBenchPlayers)
      : [];

  const responseMarkdown = generateMarkdown(teams, benchPlayers);
  return responseMarkdown;
};

const customDrawTeam = (players: PlayerInterface[]): string => {
  const result = customAlgorithmCreateTeam(players);

  const responseMarkdown = generateMarkdown(
    result.teams.map((team) => team.team),
    result.reserves.players,
  );

  return responseMarkdown;
};

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const { players, drawType } = DrawSchema.parse(json);
    let markdownResponse = '';

    switch (drawType) {
      case DrawType.Smart:
        markdownResponse = await smartlyDrawTeam(players);
        break;
      case DrawType.Custom:
        markdownResponse = customDrawTeam(players);
        break;
      case DrawType.Random:
        markdownResponse = randomDrawTeam(players);
        break;
      default:
        throw new Error('Invalid draw type');
    }

    return NextResponse.json({ response: markdownResponse });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.format(), { status: 422 });

    console.error('Error:', error);
    return NextResponse.json({}, { status: 500 });
  }
};
