const assert = require('assert');
const vscode = require('vscode');
const azureDevOps = require('../src/services/azureDevOps');

describe('Extension Test Suite', () => {
    beforeAll(() => {
        vscode.window.showInformationMessage('Start all tests.');
    });

    test('AzureDevOps Service - Pull Tickets', async () => {
        try {
            await azureDevOps.pullTickets();
            assert.ok(true, 'Tickets pulled successfully');
        } catch {
            assert.fail('Should not throw error');
        }
    });
});
