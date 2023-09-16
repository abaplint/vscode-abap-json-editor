import { CancellationToken, CodeAction, CodeActionContext, CodeActionKind, CodeActionProvider, Command, ProviderResult, Range, Selection, TextDocument } from "vscode";
import { EDIT_COMMAND } from "./extension";

export class Provider implements CodeActionProvider {

  public provideCodeActions(document: TextDocument, range: Range | Selection,
                            context: CodeActionContext,
                            token: CancellationToken): ProviderResult<(CodeAction | Command)[]> {

    const found: CodeAction[] = [];

    const rows = document.getText().split("\n");
    if (rows && rows[range.start.line].includes("`{")) {
      found.push({
        title: "Edit as JSON",
        kind: CodeActionKind.Source,
        command: {
          title: "Edit as JSON",
          command: EDIT_COMMAND,
          arguments: [{textDocument: document, range: range}],
        },
      });
    }

    return found;
  }

  public resolveCodeAction?(codeAction: CodeAction, token: CancellationToken): ProviderResult<CodeAction> {
    return;
  }

}