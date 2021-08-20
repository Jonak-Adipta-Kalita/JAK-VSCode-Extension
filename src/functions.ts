import { commands, env, Uri, window } from "vscode";

const refreshExtension = commands.registerCommand(
    "jak-vscode-extension.refreshExtension",
    async () => {
        await commands.executeCommand("workbench.action.closeSidebar");
        await commands.executeCommand(
            "workbench.view.extension.jak-vscode-extension-sidebar"
        );
    }
);

const openJAKWebsite = commands.registerCommand(
    "jak-vscode-extension.openJAKWebsite",
    () => {
        window.showInformationMessage(
            "Opening JAK's Website in the Web Browser!!"
        );
        env.openExternal(Uri.parse("https://jonakadiptakalita.herokuapp.com/"));
    }
);

const openJAKAPI = commands.registerCommand(
    "jak-vscode-extension.openJAKAPI",
    () => {
        window.showInformationMessage("Opening JAK's API in the Web Browser");
        env.openExternal(Uri.parse("https://jak-api-dot-com.herokuapp.com/"));
    }
);

const openJAKDiscordBot = commands.registerCommand(
    "jak-vscode-extension.openJAKDiscordBot",
    () => {
        window.showInformationMessage(
            "Open JAK's Discord Bot Invite Link in the Web Browser"
        );
        env.openExternal(
            Uri.parse(
                "https://discord.com/oauth2/authorize?client_id=756402881913028689&scope=bot"
            )
        );
    }
);

export { refreshExtension, openJAKWebsite, openJAKAPI, openJAKDiscordBot };
