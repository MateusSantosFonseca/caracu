import type { PlayerInterface } from '@/app/api/draw/route';

interface PromptParams {
  players: PlayerInterface[];
}

export const buildPrompt = (params: PromptParams) => {
  const numberOfTeams = Math.floor(params.players.length / 4);
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
      - Estamina (1 a 3, onde 3 é o melhor)

    *Lista de jogadores disponíveis:* ${JSON.stringify(playersJson)}

    *Regras para formação dos times:*
    - Devem existir ${numberOfTeams} times distintos e ${
      thereAreBenchPlayers
        ? `${numberOfBenchPlayers} jogadores reservas`
        : 'nenhum jogador reserva'
    }.
    - Cada time deve ser composto por exatamente quatro jogadores.
    - Um time ideal deve ter pelo menos um jogador capaz de atuar como Fixo.
    ${
      thereAreBenchPlayers &&
      '- Certifique-se de que jogadores designados como reserva não seja incluído em nenhum dos times formados.'
    }
    - É crucial que a soma dos ratings dos jogadores em cada time seja o mais próxima possível, A DIFERENÇA MÁXIMA deve ser de 2 pontos, Essa regra é deve ser seguida a qualquer custo.
    - A estamina pode ser balanceada entre os times, mas é menos relevante.
    - Apresente um Markdown contendo:
      1. Os times formados e os jogadores reservas.
      2. A soma total dos ratings de cada time.
      3. Justificativa para a composição de cada time e por que estão equilibrados entre si.
 `;
};

export const shuffleArray = (array: any[]): any[] => {
  const newArray = [...array];
  let currentIndex = newArray.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

export const createTeams = (
  players: PlayerInterface[],
  teamSize: number,
): PlayerInterface[][] => {
  const teams: PlayerInterface[][] = [];
  let startIndex = 0;
  const numberOfTeams = Math.floor(players.length / teamSize);

  for (let i = 0; i < numberOfTeams; i += 1) {
    const endIndex = startIndex + teamSize;
    const teamPlayers = players.slice(startIndex, endIndex);
    teams.push(teamPlayers);
    startIndex = endIndex;
  }

  return teams;
};

export const generateTeamMarkdown = (teams: PlayerInterface[][]): string => {
  return teams
    .map((team, index) => {
      const playersInfo = team
        .map((player, idx) => {
          const ordinal = idx + 1;
          return `**${ordinal}°** Nome: ${player.name}, Rating: ${player.rating}, Ritmo: ${player.stamina}, Posição: ${player.position}`;
        })
        .join('\n\n');

      const totalRating = team.reduce((acc, player) => acc + player.rating, 0);

      return `### **Time ${String.fromCharCode(
        65 + index,
      )}**\n${playersInfo}\n\n###### *Rating total: ${totalRating}*\n\n`;
    })
    .join('\n');
};

export const generateBenchMarkdown = (
  benchPlayers: PlayerInterface[],
): string => {
  if (benchPlayers.length === 0) {
    return '';
  }

  const playersInfo = benchPlayers
    .map((player, idx) => {
      const ordinal = idx + 1;
      return `**${ordinal}°** Nome: ${player.name}, Rating: ${player.rating}, Ritmo: ${player.stamina}, Posição: ${player.position}`;
    })
    .join('\n\n');

  const totalRating = benchPlayers.reduce(
    (acc, player) => acc + player.rating,
    0,
  );

  return `### **Reservas**\n${playersInfo}\n\n###### *Rating total: ${totalRating}*\n\n`;
};
