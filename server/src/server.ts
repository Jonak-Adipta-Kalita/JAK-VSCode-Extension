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
    TextDocuments,
    DiagnosticSeverity,
    Diagnostic,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

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
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;

    hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );
    hasDiagnosticRelatedInformationCapability = !!(
        capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation
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

interface ExampleSettings {
    maxNumberOfProblems: number;
}
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
        documentSettings.clear();
    } else {
        globalSettings = <ExampleSettings>(
            (change.settings.jonakLanguageServer || defaultSettings)
        );
    }
    documents.all().forEach(validateTextDocument);
});

const getDocumentSettings = (resource: string): Thenable<ExampleSettings> => {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: "jonakLanguageServer",
        });
        documentSettings.set(resource, result);
    }
    return result;
};

documents.onDidClose((e) => {
    documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});

const validateTextDocument = async (
    textDocument: TextDocument
): Promise<void> => {
    let settings = await getDocumentSettings(textDocument.uri);

    let text = textDocument.getText();
    let pattern = /\b[A-Z]{2,}\b/g;
    let m: RegExpExecArray | null;

    let problems = 0;
    let diagnostics: Diagnostic[] = [];
    while (
        (m = pattern.exec(text)) &&
        problems < settings.maxNumberOfProblems
    ) {
        problems++;
        let diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Warning,
            range: {
                start: textDocument.positionAt(m.index),
                end: textDocument.positionAt(m.index + m[0].length),
            },
            message: `${m[0]} is all uppercase.`,
            source: "ex",
        };
        if (hasDiagnosticRelatedInformationCapability) {
            diagnostic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range),
                    },
                    message: "Spelling matters",
                },
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range),
                    },
                    message: "Particularly for names",
                },
            ];
        }
        diagnostics.push(diagnostic);
    }

    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
};

connection.onDidChangeWatchedFiles((_change) => {
    connection.console.log("We received a file change event");
});

connection.onCompletion(
    (textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
        const document = documents.get(textDocumentPosition.textDocument.uri);
        const pos = textDocumentPosition.position;

        const suggestions = GRAMMERS;

        return suggestions;
    }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return item;
});

connection.listen();
