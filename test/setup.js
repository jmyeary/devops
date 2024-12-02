// Mock VS Code API
const vscode = {
    window: {
        showInformationMessage: jest.fn(),
        showErrorMessage: jest.fn(),
        showInputBox: jest.fn(),
        withProgress: jest.fn()
    },
    commands: {
        registerCommand: jest.fn()
    },
    ProgressLocation: {
        Notification: 1
    }
};

// Add VS Code API to global scope
global.vscode = vscode;
