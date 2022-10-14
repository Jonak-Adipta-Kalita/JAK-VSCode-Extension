import * as vscode from "vscode";
import * as path from "path";
import { refreshExtension } from "./functions";
import { SidebarProvider } from "./providers/SidebarProvider";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export const activate = (context: vscode.ExtensionContext) => {
    const serverModule = context.asAbsolutePath(
        path.join("server", "dist", "server.js")
    );

    const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
        },
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: "file", language: "jonak" }],
        synchronize: {
            fileEvents:
                vscode.workspace.createFileSystemWatcher("**/.clientrc"),
        },
    };

    client = new LanguageClient(
        "jonakLanguageServer",
        "Jonak Language Server",
        serverOptions,
        clientOptions
    );

    const sidebar = vscode.window.registerWebviewViewProvider(
        "jak-vscode-extension-sidebar",
        new SidebarProvider(context.extensionUri)
    );

    context.subscriptions.push(sidebar, refreshExtension);

    client.start();
};

export const deactivate = (): Thenable<void> | undefined => {
    if (!client) {
        return undefined;
    }
    return client.stop();
};
