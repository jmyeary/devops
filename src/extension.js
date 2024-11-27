const vscode = require('vscode');
const commands = require('./commands');

function activate(context) {
    console.log('Extension "azure-devops-automator" is now active.');

    let pullTickets = vscode.commands.registerCommand(
        'extension.pullTickets', 
        commands.pullTickets
    );

    context.subscriptions.push(pullTickets);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
