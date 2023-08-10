import * as vscode from "vscode";
const fs = require("fs");
export function activate(context: vscode.ExtensionContext) {
  // 获取当前工作目录
  let projectRoot = vscode?.workspace?.workspaceFolders?.[0].uri.fsPath;
  fs.readFile(projectRoot + "/.git/HEAD", (err: any, data: any) => {
    if (err != null) {
      console.log("error=>", err.message);
      //   vscode.window.showInformationMessage(err.message);
    } else {
      let name = data.toString().replace("ref: refs/heads/", "").replace('\n', '');
      console.log(name);
      const item: vscode.StatusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
		
      );
      item.text =  '⚡' + name;
      item.tooltip = `当前版本: ${name}`;
      item.backgroundColor = new vscode.ThemeColor(
        "statusBarItem.errorBackground"
      );
      item.show();
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
