import type { PlayerInterface } from '@/app/api/draw/route';
import { Position, Stamina } from '@/models/Schema';

function getBestDefensor(players: PlayerInterface[]) {
  return players.find((player) => player.position === Position.Defensor);
}

function getStaminaAsNumber(stamina: Stamina) {
  switch (stamina) {
    case Stamina.Alto:
      return 3;
    case Stamina.Medio:
      return 2;
    case Stamina.Regular:
      return 1;
    default:
      return 1;
  }
}

function getPlayersWithStaminaAsNumber(players: PlayerInterface[]) {
  return players.map((player) => {
    return {
      ...player,
      staminaAsNumber: getStaminaAsNumber(player.stamina),
    };
  });
}

export function customAlgorithmCreateTeam(players: PlayerInterface[]) {
  const numberOfTeams = Math.floor(players.length / 4);
  const numberOfPlayersInTeam = 4;

  const playersWithStaminaAsNumber = getPlayersWithStaminaAsNumber(players);

  // Primeiro ordena os jogadores por stamina (do mais alto para o mais baixo)
  const sortedPlayersByStamina = [...playersWithStaminaAsNumber].sort(
    (a, b) => b.staminaAsNumber - a.staminaAsNumber,
  );

  // Ordena os jogadores por rating (do mais alto para o mais baixo)
  const sortedPlayers = sortedPlayersByStamina.sort(
    (a, b) => b.rating - a.rating,
  );

  const teams: PlayerInterface[][] = Array.from(
    { length: numberOfTeams },
    () => [],
  );

  // Cria os times
  let currentNumberOfPlayersInEachteam = 0;
  while (currentNumberOfPlayersInEachteam < numberOfPlayersInTeam) {
    for (let i = 0; i < numberOfTeams; i += 1) {
      const currentTeam = teams[i];

      let selectedPlayer: PlayerInterface | undefined;

      // se for a primeira iteração, deve-se pegar o melhor defensor
      if (currentNumberOfPlayersInEachteam === 0) {
        const bestDefensor = getBestDefensor(sortedPlayers);
        selectedPlayer = bestDefensor || (sortedPlayers[0] as PlayerInterface);
      } else {
        // TODO: Get best player with best stamina (considering Stamina Alto = best, Media = medium, Regular = worst)
        selectedPlayer = sortedPlayers[0] as PlayerInterface;
      }

      currentTeam?.push(selectedPlayer);
      sortedPlayers.splice(
        sortedPlayers.indexOf({
          ...selectedPlayer,
          staminaAsNumber: getStaminaAsNumber(selectedPlayer.stamina),
        }),
        1,
      ); // Remove o jogador da lista de jogadores disponíveis
    }

    currentNumberOfPlayersInEachteam += 1;
  }

  // Jogadores reservas (se houver)
  const reserves: PlayerInterface[] = sortedPlayers;

  const teamsWithTotalRating = teams.map((team) => {
    const totalRating = team.reduce((acc, player) => acc + player.rating, 0);
    return { team, totalRating };
  });

  const reservesWithTotalRating = reserves.map((reserve) => {
    const totalRating = reserve.rating;
    return { team: [reserve], totalRating };
  });

  return { teams: teamsWithTotalRating, reserves: reservesWithTotalRating };
}
