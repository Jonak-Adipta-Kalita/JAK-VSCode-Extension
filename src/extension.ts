import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "jak-vscode-extension" is now active!');
	let disposable = vscode.commands.registerCommand('jak-vscode-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from jak-vscode-extension!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
