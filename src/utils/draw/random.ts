import type { PlayerInterface } from '@/app/api/draw/route';

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
