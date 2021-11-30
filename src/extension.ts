import { ExtensionContext, window } from "vscode";
import { refreshExtension } from "./functions";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);

    const sidebar = window.registerWebviewViewProvider(
        "jak-vscode-extension-sidebar",
        sidebarProvider
    );

    context.subscriptions.push(sidebar, refreshExtension);
}
