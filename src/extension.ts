import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    const openJAKWebsite = vscode.commands.registerCommand(
        "jak-vscode-extension.openJAKWebsite",
        () => {
            vscode.window.showInformationMessage(
                "Opening JAK's Website in the Web Browser!!"
            );
            vscode.env.openExternal(
                vscode.Uri.parse("https://jonakadiptakalita.herokuapp.com/")
            );
        }
    );

    const openJAKAPI = vscode.commands.registerCommand(
        "jak-vscode-extension.openJAKAPI",
        () => {
            vscode.window.showInformationMessage(
                "Opening JAK's API in the Web Browser"
            );
            vscode.env.openExternal(
                vscode.Uri.parse("https://jak-api-dot-com.herokuapp.com/")
            );
        }
    );

    const openJAKDiscordBot = vscode.commands.registerCommand(
        "jak-vscode-extension.openJAKDiscordBot",
        () => {
            vscode.window.showInformationMessage(
                "Open JAK's Discord Bot Invite Link in the Web Browser"
            );
            vscode.env.openExternal(
                vscode.Uri.parse(
                    "https://discord.com/oauth2/authorize?client_id=756402881913028689&scope=bot"
                )
            );
        }
    );

    context.subscriptions.push(openJAKWebsite, openJAKAPI, openJAKDiscordBot);
}

export function deactivate() {}
