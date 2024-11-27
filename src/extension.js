const vscode = require('vscode');
const commands = require('./commands');

function activate(context) {
    console.log('Extension "azure-devops-automator" is now active.');

    let pullTickets = vscode.commands.registerCommand(
        'extension.pullTickets', 
        commands.pullTickets
    );

    let generateCode = vscode.commands.registerCommand(
        'extension.generateCode',
        commands.generateCode
    );

    let updateTicket = vscode.commands.registerCommand(
        'extension.updateTicket',
        commands.updateTicket
    );

    let createWorkItems = vscode.commands.registerCommand(
        'extension.createWorkItems',
        commands.createWorkItems
    );

    context.subscriptions.push(
        pullTickets,
        generateCode,
        updateTicket,
        createWorkItems
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
