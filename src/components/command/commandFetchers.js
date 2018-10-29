import Command from "./Command";

export async function fetchCommands() {
  const res = await fetch(`http://api.tvmaze.com/search/shows?q=suits`);
  await res.json();

  return [new Command({name: 'Start motors', endpoint: '/api/command/start/execute'})]
}