import * as vscode from "vscode";
import { refreshExtension } from "./functions";
import { SidebarProvider } from "./SidebarProvider";

export const activate = (context: vscode.ExtensionContext) => {
    const sidebarProvider = new SidebarProvider(context.extensionUri);

    const sidebar = vscode.window.registerWebviewViewProvider(
        "jak-vscode-extension-sidebar",
        sidebarProvider
    );

    context.subscriptions.push(sidebar, refreshExtension);
};
