import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "jak-vscode-extension.openJAKWebsite",
        () => {
            vscode.window.showInformationMessage(
                "Opening JAK's Website in the Web Browser!!"
            );
            vscode.env.openExternal(vscode.Uri.parse(
                "https://jonakadiptakalita.herokuapp.com"
            ));
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
