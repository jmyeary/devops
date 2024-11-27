const vscode = require('vscode');
const path = require('path');
const { exec } = require('child_process');

async function pullTickets() {
    try {
        const scriptPath = path.join(__dirname, '..', '..', 'python', 'pull_tickets.py');
        
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Pulling tickets...',
            cancellable: false
        }, () => new Promise((resolve, reject) => {
            exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                const result = JSON.parse(stdout);
                resolve(result);
            });
        }));

        vscode.window.showInformationMessage('Tickets pulled successfully.');
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function generateCode() {
    try {
        const ticketDescription = await vscode.window.showInputBox({
            prompt: 'Enter the ticket description for code generation',
            ignoreFocusOut: true
        });

        if (!ticketDescription) {
            return;
        }

        const scriptPath = path.join(__dirname, '..', '..', 'python', 'generate_code.py');
        
        const result = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Generating code...',
            cancellable: false
        }, () => new Promise((resolve, reject) => {
            exec(`python "${scriptPath}" --description "${ticketDescription}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                resolve(JSON.parse(stdout));
            });
        }));

        vscode.window.showInformationMessage(result.message);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function updateTicket() {
    try {
        const ticketId = await vscode.window.showInputBox({
            prompt: 'Enter the ticket ID',
            ignoreFocusOut: true
        });

        if (!ticketId) {
            return;
        }

        const updateMessage = await vscode.window.showInputBox({
            prompt: 'Enter update message',
            ignoreFocusOut: true
        });

        if (!updateMessage) {
            return;
        }

        const scriptPath = path.join(__dirname, '..', '..', 'python', 'update_ticket.py');
        
        const result = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Updating ticket...',
            cancellable: false
        }, () => new Promise((resolve, reject) => {
            exec(`python "${scriptPath}" --id "${ticketId}" --message "${updateMessage}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                resolve(JSON.parse(stdout));
            });
        }));

        vscode.window.showInformationMessage(result.message);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function createWorkItems() {
    try {
        const requirements = await vscode.window.showInputBox({
            prompt: 'Enter requirements for work items',
            ignoreFocusOut: true
        });

        if (!requirements) {
            return;
        }

        const scriptPath = path.join(__dirname, '..', '..', 'python', 'create_work_items.py');
        
        const result = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Creating work items...',
            cancellable: false
        }, () => new Promise((resolve, reject) => {
            exec(`python "${scriptPath}" --requirements "${requirements}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                resolve(JSON.parse(stdout));
            });
        }));

        vscode.window.showInformationMessage(result.message);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

module.exports = {
    pullTickets,
    generateCode,
    updateTicket,
    createWorkItems
};
