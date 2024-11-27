const vscode = require('vscode');
const azureDevOps = require('../services/azureDevOps');

async function pullTickets() {
    try {
        await azureDevOps.pullTickets();
        vscode.window.showInformationMessage('Tickets pulled successfully.');
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

module.exports = {
    pullTickets
};
