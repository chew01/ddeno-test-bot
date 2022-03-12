import { bot } from "../../mod.ts";
import { parseMessageCommand } from "../messages/messageCommandHandler.ts";

/** Set an event for messageCreate, to parse and execute DM commands or mention commands. */
export function setMessageCreateEvent(): void {
  bot.events.messageCreate = async function (_, message) {
    // Ignore concealed message content (unapproved message content)
    if (!message.content) return;
    // Ignore messages sent by bot
    if (message.isBot) return;

    const splitted = messageSplitter(message.content);
    // Handle DMs
    if (message.guildId === undefined) {
      // Ignore if message does not start with !
      if (!splitted[0].startsWith("!")) return;
      const [command, ...args] = splitted;
      const commandKeyword = command.substring(1);
      // Pass command and args to parser
      await parseMessageCommand(commandKeyword, args);
    }

    // Handle guild messages
    // Ignore if message does not start with bot mention
    if (splitted[0] !== `<@${bot.id}>`) return;

    // Handle mention commands
    const [__, keyword, ...args] = splitted;
    // Pass command and args to parser
    await parseMessageCommand(keyword, args);
  };
}

/** Splits message into an array of arguments */
function messageSplitter(content: string): string[] {
  return content.split(/ +/g);
}
