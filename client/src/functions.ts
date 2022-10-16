import { commands, Terminal, Uri, window, workspace } from "vscode";

const refreshExtension = commands.registerCommand(
    "jak-vscode-extension.refreshExtension",
    async () => {
        await commands.executeCommand("workbench.action.closeSidebar");
        await commands.executeCommand(
            "workbench.view.extension.jak-vscode-extension-sidebar"
        );
    }
);

const runLanguage = commands.registerCommand(
    "jak-vscode-extension.runJonak",
    async (fileUri: Uri) => {
        const languagePath: string = await workspace
            .getConfiguration()
            .get("jak-vscode-extension.languagePath")!;
        const fileName = (await workspace.openTextDocument(fileUri)).fileName
            .split("\\")
            .join("/");

        if (fileName.endsWith(".jonak")) {
            const terminals = window.terminals;
            let terminal: Terminal;
            if (terminals.length !== 0) {
                terminal = terminals[terminals.length - 1];
            } else {
                terminal = window.createTerminal();
            }
            terminal.sendText(`"${languagePath}" "${fileName}"`);
        } else {
            window.showErrorMessage("Use it only in *.jonak Files!!");
        }
    }
);

export { refreshExtension, runLanguage };
