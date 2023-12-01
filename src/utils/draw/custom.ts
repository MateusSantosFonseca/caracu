import type { PlayerInterface } from '@/app/api/draw/route';
import { Position, Stamina } from '@/models/Schema';

interface PlayersWithStamina extends PlayerInterface {
  staminaAsNumber: number;
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

function sortPlayersByRating(
  players: PlayersWithStamina[],
  sortType: 'asc' | 'desc',
) {
  if (sortType === 'asc') return players.sort((a, b) => a.rating - b.rating);
  return players.sort((a, b) => b.rating - a.rating);
}

function sortPlayersByStamina(
  players: PlayersWithStamina[],
  sortType: 'asc' | 'desc',
) {
  if (sortType === 'asc')
    return players.sort((a, b) => a.staminaAsNumber - b.staminaAsNumber);
  return players.sort((a, b) => b.staminaAsNumber - a.staminaAsNumber);
}

function getBestDefensor(players: PlayerInterface[]) {
  const bestDefensor = players.find(
    (player) => player.position === Position.Defensor,
  );

  const bestDefenseOrForwardPlayer = players.find(
    (player) => player.position === Position.Any,
  );

  if (!bestDefensor || !bestDefenseOrForwardPlayer) return undefined;

  return bestDefensor?.rating >= bestDefenseOrForwardPlayer?.rating
    ? bestDefensor
    : bestDefenseOrForwardPlayer;
}

export function customAlgorithmCreateTeam(players: PlayerInterface[]) {
  const numberOfPlayersInTeam = 4;
  const numberOfTeams = Math.floor(players.length / 4);
  const allPlayers = getPlayersWithStaminaAsNumber(players);

  // Primeiro ordena os jogadores por stamina (do mais baixo para o mais alto)
  // A ideia é que como os primeiros times devem ter o melhores defensores, então
  // para equilibrar vamos dar os melhores de estamina para os últimos times
  sortPlayersByStamina(allPlayers, 'asc');

  // Ordena os jogadores por rating (do mais alto para o mais baixo)
  sortPlayersByRating(allPlayers, 'desc');

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
        const bestDefensor = getBestDefensor(allPlayers);
        selectedPlayer = bestDefensor || (allPlayers[0] as PlayerInterface);
      } else {
        selectedPlayer = allPlayers[0] as PlayerInterface;
      }

      currentTeam?.push(selectedPlayer);

      // Remove o jogador da lista de jogadores disponíveis pelo id
      allPlayers.splice(
        allPlayers.findIndex((player) => player.id === selectedPlayer?.id),
        1,
      );
    }

    currentNumberOfPlayersInEachteam += 1;

    // Garante que os times tenham jogadores com rating equilibrados
    // pois a cada jogador novo adicionado, o time que acaba de receber o de melhor rating
    // deve receber o de pior rating e vice-versa
    const ascOrDesc = currentNumberOfPlayersInEachteam % 2 ? 'asc' : 'desc';
    sortPlayersByRating(allPlayers, ascOrDesc);
  }

  // Jogadores reservas (se houver)
  const reserves: PlayerInterface[] = allPlayers;
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
