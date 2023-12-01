import type { PlayerInterface } from '@/app/api/draw/route';
import { Position, Stamina } from '@/models/Schema';

function getBestDefensor(players: PlayerInterface[]) {
  const bestDefensor = players.find(
    (player) => player.position === Position.Defensor,
  );

  const bestDefenseOrForwardPlayer = players.find(
    (player) => player.position === Position.Any,
  );

  if (!bestDefensor || !bestDefenseOrForwardPlayer) return undefined;

  return bestDefensor?.rating > bestDefenseOrForwardPlayer?.rating
    ? bestDefensor
    : bestDefenseOrForwardPlayer;
}

function getStaminaAsNumber(stamina: Stamina) {
  switch (stamina) {
    case Stamina.High:
      return 3;
    case Stamina.Normal:
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

  // Primeiro ordena os jogadores por stamina (do mais baixo para o mais alto)
  // A ideia é que como o primeiro time deve ter o melhor defensor, então
  // para equilibrar vamos dar o melhor defensor em rating com o pior ritmo
  const sortedPlayersByStamina = [...playersWithStaminaAsNumber].sort(
    (a, b) => a.staminaAsNumber - b.staminaAsNumber,
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
        selectedPlayer = sortedPlayers[0] as PlayerInterface;
      }

      currentTeam?.push(selectedPlayer);
      // Remove o jogador da lista de jogadores disponíveis pelo id
      sortedPlayers.splice(
        sortedPlayers.findIndex((player) => player.id === selectedPlayer?.id),
        1,
      );
    }

    currentNumberOfPlayersInEachteam += 1;
  }

  // Jogadores reservas (se houver)
  const reserves: PlayerInterface[] = sortedPlayers;
  const reservesTotalRating = reserves.reduce(
    (acc, player) => acc + player.rating,
    0,
  );

  const teamsWithTotalRating = teams.map((team) => {
    const totalRating = team.reduce((acc, player) => acc + player.rating, 0);
    return { team, totalRating };
  });

  return {
    teams: teamsWithTotalRating,
    reserves: {
      players: reserves,
      totalRating: reservesTotalRating,
    },
  };
}
