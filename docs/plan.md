┃                                                                       Project Development Plan                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

                                                                1. Overview of the Solution Architecture

 • VS Code Extension (Frontend): The extension serves as the interface within VS Code, allowing you to interact with Azure DevOps and the Language Model (LLM).
 • Python Backend Scripts: The extension communicates with Python scripts that handle tasks such as interacting with Azure DevOps APIs and the LLM.
 • Communication Mechanism: Utilize VS Code's ability to execute external scripts, ensuring seamless interaction between the extension and Python scripts.
 • Azure DevOps Integration: Use Azure DevOps REST APIs in Python to interact with tickets, updates, and task creation.
 • LLM Integration: Use a Python library (e.g., OpenAI's openai package) to interact with the LLM for code generation and summarization.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                   2. Steps to Implement the Solution

                                                                      a. Set Up the Python Backend

 1 Create Python Scripts:
    • pull_tickets.py to fetch tickets assigned to you.
    • generate_code.py to generate code from ticket descriptions using the LLM.
    • update_ticket.py to update tickets with progress or completion status.
    • create_work_items.py to create new work items from given requirements.
 2 Set Up Python Environment:
    • Navigate to the python/ directory.
    • Create a virtual environment and activate it:
      
       cd python
       python -m venv venv
       source venv/bin/activate  # On Windows: `venv\Scripts\activate`
      
    • Install the necessary Python packages:
      
       pip install -r requirements.txt
      
 3 Configure Authentication:
    • Azure DevOps:
       • Create azure_config.py (ensure it's excluded from version control).
       • Use environment variables to store your Azure DevOps organization URL and personal access token (PAT).

          # azure_config.py
          import os

          ORGANIZATION_URL = os.getenv('AZURE_DEVOPS_ORGANIZATION_URL')
          PERSONAL_ACCESS_TOKEN = os.getenv('AZURE_DEVOPS_PAT')

    • OpenAI API:
       • Create openai_config.py (also excluded from version control).
       • Use environment variables to store your OpenAI API key.

          # openai_config.py
          import os

          OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


                                                              b. Implement Functionality in Python Scripts

 1 pull_tickets.py:
    • Implement the get_my_work_items() function to fetch tickets assigned to the current user using the Azure DevOps API.
    • Output the tickets in a format that can be parsed or displayed by the extension.
   
    # pull_tickets.py
    from azure.devops.connection import Connection
    from msrest.authentication import BasicAuthentication
    import azure_config
    import json
   
    def get_my_work_items():
        credentials = BasicAuthentication('', azure_config.PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=azure_config.ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        query = "SELECT [System.Id], [System.Title] FROM WorkItems WHERE [System.AssignedTo] = @Me AND [System.State] <> 'Closed'"
        work_items = wit_client.query_by_wiql(wiql={'query': query}).work_items
   
        items = []
        for item_ref in work_items:
            item = wit_client.get_work_item(item_ref.id)
            items.append({
                'id': item.id,
                'title': item.fields['System.Title']
            })
        print(json.dumps(items))
   
    if __name__ == "__main__":
        get_my_work_items()
   
 2 generate_code.py:
    • Implement the generate_code(ticket_description) function to interact with the LLM and generate code based on a ticket description.
    • Handle input arguments safely and ensure proper communication with the LLM.
   
    # generate_code.py
    import sys
    import openai
    import openai_config
    import json
   
    def generate_code(ticket_description):
        openai.api_key = openai_config.OPENAI_API_KEY
        prompt = f"Generate Python code to accomplish the following task:\n{ticket_description}"
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.5,
        )
        code = response.choices[0].text.strip()
        print(code)
   
    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: generate_code.py '<ticket_description>'")
            sys.exit(1)
        ticket_description = sys.argv[1]
        generate_code(ticket_description)
   
 3 update_ticket.py:
    • Implement the update_ticket(ticket_id, update_message) function to update a specific ticket in Azure DevOps.
    • Accept command-line arguments for the ticket ID and update message.
   
    # update_ticket.py
    import sys
    from azure.devops.connection import Connection
    from msrest.authentication import BasicAuthentication
    import azure_config
   
    def update_ticket(ticket_id, update_message):
        credentials = BasicAuthentication('', azure_config.PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=azure_config.ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        update = [{
            "op": "add",
            "path": "/fields/System.History",
            "value": update_message
        }]
        wit_client.update_work_item(document=update, id=int(ticket_id))
        print(f"Ticket {ticket_id} updated successfully.")
   
    if __name__ == "__main__":
        if len(sys.argv) < 3:
            print("Usage: update_ticket.py <ticket_id> '<update_message>'")
            sys.exit(1)
        ticket_id = sys.argv[1]
        update_message = sys.argv[2]
        update_ticket(ticket_id, update_message)
   
 4 create_work_items.py:
    • Implement the create_work_items(requirements) function to break down requirements into tasks using the LLM and create work items in Azure DevOps.
   
    # create_work_items.py
    import sys
    from azure.devops.connection import Connection
    from msrest.authentication import BasicAuthentication
    import openai
    import azure_config
    import openai_config
   
    def create_work_items(requirements):
        openai.api_key = openai_config.OPENAI_API_KEY
        prompt = f"Break down the following requirements into a list of tasks:\n{requirements}"
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=500,
            n=1,
            stop=None,
            temperature=0.5,
        )
        tasks_text = response.choices[0].text.strip()
        tasks = [task.strip('- ').strip() for task in tasks_text.split('\n') if task.strip()]
   
        credentials = BasicAuthentication('', azure_config.PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=azure_config.ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        project_name = 'YourProjectName'  # Replace with your actual project name
   
        for task in tasks:
            work_item = [{
                "op": "add",
                "path": "/fields/System.Title",
                "value": task
            }]
            created_item = wit_client.create_work_item(document=work_item, project=project_name, type='Task')
            print(f"Created Task ID: {created_item.id} - Title: {created_item.fields['System.Title']}")
   
    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: create_work_items.py '<requirements>'")
            sys.exit(1)
        requirements = sys.argv[1]
        create_work_items(requirements)
   

                                                           c. Integrate Extension Commands with Python Scripts

 1 Update src/commands/index.js:
    • Implement functions for each command that execute the corresponding Python scripts.
    • Handle user input and display outputs appropriately.
   
    // src/commands/index.js
    const vscode = require('vscode');
    const { exec } = require('child_process');
    const path = require('path');
   
    function executePythonScript(scriptName, args = [], callback) {
        const scriptPath = path.join(__dirname, '..', '..', 'python', scriptName);
        const command = `python "${scriptPath}" ${args.join(' ')}`;
   
        exec(command, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Error: ${stderr.trim()}`);
                console.error(stderr);
                return;
            }
            callback(stdout.trim());
        });
    }
   
    async function pullTickets() {
        executePythonScript('pull_tickets.py', [], (output) => {
            try {
                const tickets = JSON.parse(output);
                const items = tickets.map(ticket => `${ticket.id}: ${ticket.title}`);
                vscode.window.showQuickPick(items, { canPickMany: false, placeHolder: 'Select a ticket' })
                    .then(selected => {
                        if (selected) {
                            vscode.window.showInformationMessage(`You selected: ${selected}`);
                        }
                    });
            } catch (err) {
                vscode.window.showErrorMessage('Failed to parse tickets.');
            }
        });
    }
   
    async function generateCode() {
        const ticketDescription = await vscode.window.showInputBox({ prompt: 'Enter Ticket Description' });
        if (!ticketDescription) {
            vscode.window.showErrorMessage('Ticket description is required.');
            return;
        }
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Generating code from ticket...',
            cancellable: false
        }, (progress) => {
            return new Promise((resolve) => {
                executePythonScript('generate_code.py', [JSON.stringify(ticketDescription)], (output) => {
                    vscode.workspace.openTextDocument({ content: output, language: 'python' }).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                    resolve();
                });
            });
        });
    }
   
    // Implement updateTicket and createWorkItems similarly...
   
    module.exports = {
        pullTickets,
        generateCode,
        // updateTicket,
        // createWorkItems
    };
   
 2 Register Commands in src/extension.js:
   
    // src/extension.js
    const vscode = require('vscode');
    const commands = require('./commands');
   
    function activate(context) {
        console.log('Extension "ado-ai" is now active.');
   
        let pullTickets = vscode.commands.registerCommand('extension.pullTickets', commands.pullTickets);
        let generateCode = vscode.commands.registerCommand('extension.generateCode', commands.generateCode);
        // Register updateTicket and createWorkItems similarly...
   
        context.subscriptions.push(pullTickets, generateCode);
    }
   
    function deactivate() {}
   
    module.exports = {
        activate,
        deactivate
    };
   

                                                                       d. Enhance User Experience

 1 Display Outputs Effectively:
    • Use VS Code UI elements like information messages, warning messages, and text editors to display outputs.
    • For example, display generated code in a new editor window.
 2 Provide Feedback and Progress Indicators:
    • Use vscode.window.withProgress to show progress during long-running operations.
    • Inform the user when operations start and complete.

                                                                     e. Secure Sensitive Information

 1 Use Environment Variables:
    • Store API keys and tokens in environment variables rather than hardcoding them.
    • Encourage users to set these variables in their system or use a .env file (make sure it's excluded from version control).
 2 Update .gitignore:
   
    # Sensitive configuration files
    python/azure_config.py
    python/openai_config.py
   
    # Environment files
    .env
   
 3 Provide Setup Instructions:
    • Update README.md with instructions on how to set up environment variables and configure the extension.

                                                                   f. Test and Validate Functionality

 1 Update test/extension.test.js:
    • Add tests for each command to ensure they are registered and functioning.
    • Use mocking or stubs to simulate script execution where appropriate.
   
    // test/extension.test.js
    const assert = require('assert');
    const vscode = require('vscode');
    const commands = require('../src/commands');
   
    suite('Extension Test Suite', () => {
        vscode.window.showInformationMessage('Start all tests.');
   
        test('Pull Tickets Command', () => {
            assert.ok(commands.pullTickets, 'pullTickets command exists');
        });
   
        test('Generate Code Command', () => {
            assert.ok(commands.generateCode, 'generateCode command exists');
        });
   
        // Add tests for updateTicket and createWorkItems...
    });
   
 2 Manual Testing:
    • Run the extension in a development environment and manually test each command.
    • Verify that error handling works as expected and outputs are correct.

                                                                    g. Documentation and Maintenance

 1 Update README.md:
    • Provide clear instructions on installation, setup, and usage of the extension.
    • Include details on configuring environment variables and dependencies.
 2 Maintain CHANGELOG.md:
    • Document changes, new features, and fixes with each update.
 3 Create CONTRIBUTING.md (Optional):
    • If the project will have contributors, provide guidelines for contributing, coding standards, and how to submit issues or pull requests.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                     3. Updated Directory Structure


 ado-ai/
 ├── .vscode/
 │   ├── extensions.json
 │   ├── launch.json
 ├── docs/
 │   ├── plan.md          # This file
 ├── src/
 │   ├── extension.js
 │   ├── commands/
 │   │   └── index.js
 │   └── services/
 │       └── azureDevOps.js
 ├── python/
 │   ├── create_work_items.py
 │   ├── generate_code.py
 │   ├── pull_tickets.py
 │   ├── update_ticket.py
 │   ├── requirements.txt
 │   ├── azure_config.py      # Excluded from version control
 │   └── openai_config.py     # Excluded from version control
 ├── test/
 │   └── extension.test.js
 ├── .gitignore
 ├── .vscodeignore
 ├── CHANGELOG.md
 ├── LICENSE
 ├── README.md
 ├── package.json
 ├── package-lock.json
 ├── LICENSE
 ├── README.md
 ├── package.json
 ├── package-lock.json


─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                          4. Summary of Actions

 • Implement Python backend scripts with necessary functionality and secure configuration.
 • Implement Python backend scripts with necessary functionality and secure configuration.
 • Integrate the VS Code extension commands with the Python scripts, ensuring proper input/output handling.
 • Enhance the user experience with appropriate feedback and UI elements.
 • Secure your application by properly handling sensitive information and updating .gitignore.
 • Test commands thoroughly and update tests to cover new functionality.
 • Update documentation (README.md, CHANGELOG.md, and this plan.md) to reflect changes and provide guidance.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                              5. Next Steps

 • Proceed to implement the Python scripts, ensuring each functions correctly when run independently.
 • Integrate the scripts with your VS Code extension commands, handling inputs and outputs appropriately.
 • Test each command thoroughly within the extension to ensure seamless operation.
 • Enhance the user interface by providing informative messages and handling errors gracefully.
 • Maintain and update documentation as you make progress, keeping all project stakeholders informed.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Feel free to reach out if you need further assistance or clarification on any of these steps.