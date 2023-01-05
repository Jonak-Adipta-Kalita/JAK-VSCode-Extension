import {
    CompletionItem,
    CompletionItemKind,
    Position,
} from "vscode-languageserver";
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

export const parseDocument = (document: TextDocument, pos: Position) => {
    return GRAMMERS;
};
