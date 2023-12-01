import type { PlayerInterface } from '@/app/api/draw/route';

const generateTeamMarkdown = (teams: PlayerInterface[][]): string => {
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

const generateBenchMarkdown = (benchPlayers: PlayerInterface[]): string => {
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

export const generateMarkdown = (
  allTeamsPlayers: PlayerInterface[][],
  benchPlayers: PlayerInterface[],
) => {
  const teamMarkdown: string = generateTeamMarkdown(allTeamsPlayers);

  let benchMarkdown = '';
  if (benchPlayers.length > 0)
    benchMarkdown = generateBenchMarkdown(benchPlayers);

  return teamMarkdown + benchMarkdown;
};
