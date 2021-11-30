import { commands } from "vscode";

const refreshExtension = commands.registerCommand(
    "jak-vscode-extension.refreshExtension",
    async () => {
        await commands.executeCommand("workbench.action.closeSidebar");
        await commands.executeCommand(
            "workbench.view.extension.jak-vscode-extension-sidebar"
        );
    }
);

export { refreshExtension };
