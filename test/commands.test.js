const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const commands = require('../src/commands');

// Mock vscode and child_process
jest.mock('vscode');
jest.mock('child_process');

describe('Commands', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Setup default mocks
        vscode.window.showInputBox.mockResolvedValue('test input');
        vscode.window.withProgress.mockImplementation((options, task) => task());
    });

    describe('pullTickets', () => {
        it('should successfully pull tickets', async () => {
            const mockOutput = JSON.stringify({ success: true });
            exec.mockImplementation((cmd, callback) => callback(null, mockOutput, null));

            await commands.pullTickets();

            expect(exec).toHaveBeenCalled();
            expect(vscode.window.showInformationMessage).toHaveBeenCalledWith('Tickets pulled successfully.');
        });

        it('should handle errors when pulling tickets', async () => {
            exec.mockImplementation((cmd, callback) => callback(new Error('Failed'), null, 'Error message'));

            await commands.pullTickets();

            expect(vscode.window.showErrorMessage).toHaveBeenCalled();
        });
    });

    describe('generateCode', () => {
        it('should generate code with valid input', async () => {
            const mockOutput = JSON.stringify({ message: 'Code generated' });
            exec.mockImplementation((cmd, callback) => callback(null, mockOutput, null));

            await commands.generateCode();

            expect(vscode.window.showInputBox).toHaveBeenCalled();
            expect(exec).toHaveBeenCalled();
            expect(vscode.window.showInformationMessage).toHaveBeenCalledWith('Code generated');
        });

        it('should handle empty input', async () => {
            vscode.window.showInputBox.mockResolvedValue(null);

            await commands.generateCode();

            expect(exec).not.toHaveBeenCalled();
        });
    });

    describe('updateTicket', () => {
        it('should update ticket with valid inputs', async () => {
            const mockOutput = JSON.stringify({ message: 'Ticket updated' });
            exec.mockImplementation((cmd, callback) => callback(null, mockOutput, null));

            await commands.updateTicket();

            expect(vscode.window.showInputBox).toHaveBeenCalledTimes(2);
            expect(exec).toHaveBeenCalled();
            expect(vscode.window.showInformationMessage).toHaveBeenCalledWith('Ticket updated');
        });

        it('should handle empty ticket ID', async () => {
            vscode.window.showInputBox.mockResolvedValueOnce(null);

            await commands.updateTicket();

            expect(exec).not.toHaveBeenCalled();
        });
    });

    describe('createWorkItems', () => {
        it('should create work items with valid input', async () => {
            const mockOutput = JSON.stringify({ message: 'Work items created' });
            exec.mockImplementation((cmd, callback) => callback(null, mockOutput, null));

            await commands.createWorkItems();

            expect(vscode.window.showInputBox).toHaveBeenCalled();
            expect(exec).toHaveBeenCalled();
            expect(vscode.window.showInformationMessage).toHaveBeenCalledWith('Work items created');
        });

        it('should handle empty input', async () => {
            vscode.window.showInputBox.mockResolvedValue(null);

            await commands.createWorkItems();

            expect(exec).not.toHaveBeenCalled();
        });
    });
});
