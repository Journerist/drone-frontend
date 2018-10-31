import Command from "./Command";
import {apiBaseUrl} from "../../config";

export async function fetchCommands() {
  const res = await fetch(`${apiBaseUrl}/command`);
  const commandsJson = await res.json();

  return commandsJson.map( cj => new Command(cj))
}
