import { setInteractionCreateEvent } from "./handlers/interactionCreate.ts";
import { setMessageCreateEvent } from "./handlers/messageCreate.ts";

export function setupEventHandlers() {
  setMessageCreateEvent();
  setInteractionCreateEvent();
}
