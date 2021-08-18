import * as vscode from "vscode";
import { openJAKWebsite, openJAKAPI, openJAKDiscordBot } from "./functions";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(openJAKWebsite, openJAKAPI, openJAKDiscordBot);
}
