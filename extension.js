// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
	console.log('Extension "azure-devops-automator" is now active.');
 
	let pullTickets = vscode.commands.registerCommand('extension.pullTickets', function () {
	  // Call your Python script
	  exec('python pull_tickets.py', (error, stdout, stderr) => {
		if (error) {
		  vscode.window.showErrorMessage(`Error: ${stderr}`);
		  return;
		}
		// Process stdout and display tickets
		vscode.window.showInformationMessage('Tickets pulled successfully.');
	  });
	});
 
	// Repeat for other commands...
 
	context.subscriptions.push(pullTickets /*, other commands */);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
