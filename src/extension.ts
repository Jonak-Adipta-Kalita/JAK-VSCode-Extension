import { ExtensionContext } from "vscode";
import { openJAKWebsite, openJAKAPI, openJAKDiscordBot } from "./functions";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(openJAKWebsite, openJAKAPI, openJAKDiscordBot);
}
