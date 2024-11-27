const { exec } = require('child_process');
const path = require('path');
const vscode = require('vscode');

class AzureDevOpsService {
    async pullTickets() {
        const scriptPath = path.join(__dirname, '..', '..', 'python', 'pull_tickets.py');
        
        return new Promise((resolve, reject) => {
            exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Failed to pull tickets: ${stderr}`));
                    return;
                }
                resolve(stdout);
            });
        });
    }
}

module.exports = new AzureDevOpsService();
