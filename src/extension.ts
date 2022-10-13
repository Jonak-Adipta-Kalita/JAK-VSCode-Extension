import * as vscode from "vscode";
import { refreshExtension } from "./functions";
import { SidebarProvider } from "./providers/SidebarProvider";

export const activate = (context: vscode.ExtensionContext) => {
    const sidebar = vscode.window.registerWebviewViewProvider(
        "jak-vscode-extension-sidebar",
        new SidebarProvider(context.extensionUri)
    );

    context.subscriptions.push(sidebar, refreshExtension);
};
