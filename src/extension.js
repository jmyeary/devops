const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
    console.log('Extension "azure-devops-automator" is now active.');
 
    let pullTickets = vscode.commands.registerCommand('extension.pullTickets', function () {
        const scriptPath = path.join(__dirname, '..', 'python', 'pull_tickets.py');
        exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
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

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
