import type { Position } from '@/models/Schema';

interface PlayerParams {
  rating: number;
  position: Position;
  stamina: number;
  name: string;
}

interface PromptParams {
  players: PlayerParams[];
}

export const buildPrompt = (params: PromptParams) => {
  const numberOfTeams = params.players.length / 4;
  const numberOfBenchPlayers = params.players.length % 4;

  const thereAreBenchPlayers = numberOfBenchPlayers > 0;

  const playersJson = params.players.map((player) => {
    return {
      nome: player.name,
      posicao: player.position,
      rating: player.rating,
      estamina: player.stamina,
    };
  });

  return `Você é responsável por organizar ${numberOfTeams} times de futsal a partir de uma lista de jogadores disponíveis e suas características. 
  
    *Cada jogador possui as seguintes informações:*
      - Rating (de 1 a 10, onde 10 é o melhor)
      - Posição em campo (Fixo, Ala ou Pivô)
      - Estamina (Ruim, Médio, Ótimo)

    *Lista de jogadores disponíveis:* ${JSON.stringify(playersJson)}

    *Regras para formação dos times:*
    - Devem haver ${numberOfTeams} times distintos e ${
      thereAreBenchPlayers
        ? `${numberOfBenchPlayers} reservas`
        : 'nenhum reserva'
    }.
    - Cada time deve ter exatamente quatro jogadores.
    - Um time ideal deve possuir pelo menos um jogador que jogue também como Fixo.
    ${
      thereAreBenchPlayers &&
      '- Certifique-se de que jogadores designados como reserva não seja incluído em nenhum dos times formados.'
    }
    - Garanta que a soma dos ratings dos jogadores de um time seja o mais próximo possível à soma dos ratings dos jogadores dos outros times, com uma diferença máxima de 2 pontos.
    - A estamina, embora seja menos relevante, também deve estar balanceada entre os times.
    - GARANTA que nenhum time seja muito mais forte ou mais fraco que os outros em termos de habilidades dos jogadores (rating)
    - REGRA MAIS IMPORTANTE: Retorne um Markdown contendo: 
      - Os times formados ${thereAreBenchPlayers && 'e os reservas'}
      - O somatório de rating de cada time
      - Justificativa para a formação de cada time e por que eles estão equilibrados entre si
 `;
};
