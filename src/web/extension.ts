import * as vscode from 'vscode';
import { JSON_FILE_SYSTEM_PROVIDER_SCHEME, JsonFileSystemProvider, editJson } from './fs';
import { Provider } from './provider';
import { Parser } from './parser';

export const EDIT_COMMAND = "abap-json-editor.edit";

export function activate(context: vscode.ExtensionContext) {

  vscode.workspace.registerFileSystemProvider(JSON_FILE_SYSTEM_PROVIDER_SCHEME, new JsonFileSystemProvider(), {isCaseSensitive: true});
  vscode.languages.registerCodeActionsProvider("abap", new Provider(), {providedCodeActionKinds: [vscode.CodeActionKind.Source]});
  context.subscriptions.push(vscode.commands.registerCommand(EDIT_COMMAND, editJson));

	let disposable = vscode.commands.registerCommand('abap-json-editor.paste', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
      return;
    }

    vscode.env.clipboard.readText().then((text)=>{
      editor.insertSnippet(new vscode.SnippetString(Parser.JSONtoABAP(text)));
    });
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
