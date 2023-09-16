import * as vscode from "vscode";

export class Parser {
  public static findStartAndEnd(startRow: number, text: string) {
    let end: vscode.Position | undefined = undefined;
    let indentation = 0;
    let startCol = 0;

    const lines = text.split("\n");
    indentation = lines[startRow].search(/\S/) + 2;
    startCol = lines[startRow].search(/`{/);
    for (let index = startRow; index < lines.length; index++) {
      const line = lines[index];
      const trimmed = line.trimEnd();
      if (trimmed.endsWith(".")) {
        end = new vscode.Position(index, trimmed.length);
        break;
      }
    }

    return {end, indentation, startCol};
  }
}