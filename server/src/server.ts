import {
    createConnection,
    ProposedFeatures,
    InitializeParams,
    DidChangeConfigurationNotification,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult,
} from "vscode-languageserver/node";

const GRAMMERS: CompletionItem[] = [
    {
        label: "FUN",
        kind: CompletionItemKind.Keyword,
    },
    {
        label: "VAR",
        kind: CompletionItemKind.Keyword,
    },
    {
        label: "FOR",
        kind: CompletionItemKind.Keyword,
    },
    {
        label: "MATH_PI",
        kind: CompletionItemKind.Constant,
    },
    {
        label: "TRUE",
        kind: CompletionItemKind.Constant,
    },
    {
        label: "FALSE",
        kind: CompletionItemKind.Constant,
    },
    {
        label: "NULL",
        kind: CompletionItemKind.Constant,
    },
    {
        label: "LEN",
        kind: CompletionItemKind.Function,
    },
    {
        label: "PRINT",
        kind: CompletionItemKind.Function,
    },
    {
        label: "APPEND",
        kind: CompletionItemKind.Function,
    },
    {
        label: "RUN",
        kind: CompletionItemKind.Function,
    },
    {
        label: "IS_NUM",
        kind: CompletionItemKind.Function,
    },
    {
        label: "IS_STR",
        kind: CompletionItemKind.Function,
    },
    {
        label: "IS_LIST",
        kind: CompletionItemKind.Function,
    },
    {
        label: "IS_FUN",
        kind: CompletionItemKind.Function,
    },
    {
        label: "EXTEND",
        kind: CompletionItemKind.Function,
    },
    {
        label: "POP",
        kind: CompletionItemKind.Function,
    },
    {
        label: "PRINT_RET",
        kind: CompletionItemKind.Function,
    },
    {
        label: "INPUT",
        kind: CompletionItemKind.Function,
    },
    {
        label: "INPUT_INT",
        kind: CompletionItemKind.Function,
    },
    {
        label: "CLEAR",
        kind: CompletionItemKind.Function,
    },
    {
        label: "CLS",
        kind: CompletionItemKind.Function,
    },
];

const connection = createConnection(ProposedFeatures.all);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;

    hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );

    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
            },
        },
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true,
            },
        };
    }
    return result;
});

connection.onInitialized((): InitializeResult => {
    if (hasConfigurationCapability) {
        connection.client.register(
            DidChangeConfigurationNotification.type,
            undefined
        );
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log("Workspace folder change event received.");
        });
    }

    return {
        capabilities: {
            completionProvider: {
                resolveProvider: true,
            },
        },
    };
});

connection.onCompletion(
    (textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
        const document = textDocumentPosition.textDocument.uri;

        return GRAMMERS;
    }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    GRAMMERS.map((grammer) => {
        if (item.label === grammer.label) {
            item.detail = grammer.detail;
            item.documentation = grammer.documentation;
        }
    });
    return item;
});

connection.listen();
