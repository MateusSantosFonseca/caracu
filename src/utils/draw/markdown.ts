import type { PlayerInterface } from '@/app/api/draw/route';

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
