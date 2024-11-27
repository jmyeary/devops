# Project Development Plan

---

## 1. Overview of the Solution Architecture

- **VS Code Extension (Frontend)**:
  - Provides an interface within Visual Studio Code for interacting with Azure DevOps and OpenAI services.
  - Implements commands that trigger actions such as pulling tickets, generating code, updating tickets, and creating work items.

- **Python Backend Scripts**:
  - Handle interactions with Azure DevOps APIs and the OpenAI API.
  - Perform tasks such as fetching assigned work items, generating code from descriptions, updating tickets, and breaking down requirements into actionable tasks.

- **Communication Mechanism**:
  - The extension executes Python scripts to bridge communication between the frontend and backend.
  - Outputs from Python scripts are parsed and handled within the extension to provide feedback to the user.

- **Configuration Management**:
  - Sensitive information like API keys and tokens are managed through environment variables and configuration files excluded from version control.
  - Configuration files (`azure_config.py` and `openai_config.py`) ensure secure access to necessary services.

---

## 2. Steps to Implement the Solution

### a. Setup Python Backend

 1. **Create Python Scripts**:
    - Develop scripts for pulling tickets (`pull_tickets.py`), generating code (`generate_code.py`), updating tickets (`update_ticket.py`), and creating work items      
 (`create_work_items.py`).
    - Ensure each script handles its specific functionality and can be executed independently.

 2. **Configure Python Environment**:
    - Set up a virtual environment within the `python/` directory.
    - Install all necessary dependencies as listed in `requirements.txt`.

 3. **Manage Sensitive Configuration**:
    - Create `azure_config.py` and `openai_config.py` to store configuration variables sourced from environment variables.
    - Exclude these configuration files from version control by updating `.gitignore`.

### b. Implement Functionality in Python Scripts

 1. **Handle Configuration Variables**:
    - Utilize configuration files to access environment variables within scripts.
    - Replace direct environment variable access with imports from `azure_config.py` and `openai_config.py`.

 2. **Add Exception Handling and Logging**:
    - Implement error handling to catch exceptions and provide meaningful messages.
    - Ensure scripts exit gracefully, providing status codes or messages for the extension to interpret.

 3. **Standardize Output Format**:
    - Output results in a consistent format (e.g., JSON) for easy parsing by the extension.
    - Include relevant information such as success confirmations or error details.

### c. Integrate Extension Commands with Python Scripts

 1. **Update Extension Commands**:
    - Modify command functions in `src/commands/index.js` to execute the updated Python scripts.
    - Handle user inputs and outputs effectively, utilizing VS Code APIs for prompts and displays.

 2. **Register Commands in Extension Activation**:
    - Ensure all new commands are registered in `src/extension.js` during the extension's activation phase.

 3. **Enhance User Experience**:
    - Provide progress indicators and informative messages during script execution.
    - Implement error handling within the extension to manage issues arising from script execution.

### d. Secure Sensitive Information

 1. **Use Environment Variables**:
    - Encourage users to set necessary environment variables for Azure DevOps and OpenAI credentials.
    - Provide guidance on setting these variables in the system or within a `.env` file (excluded from version control).

 2. **Update `.gitignore`**:
    - Exclude configuration files and any environment files from version control to protect sensitive information.

### e. Test and Validate Functionality

 1. **Individual Script Testing**:
    - Test each Python script independently to confirm correct functionality and error handling.
    - Validate interaction with Azure DevOps and OpenAI services.

 2. **Integration Testing**:
    - Run extension commands within VS Code to ensure they trigger the correct scripts and handle outputs properly.
    - Test user interactions, including input prompts and output displays.

 3. **Update Automated Tests**:
    - Enhance tests in `test/extension.test.js` to cover new commands and functionalities.
    - Utilize mocking or stubs to simulate external dependencies where appropriate.

### f. Documentation and Maintenance

 1. **Update `README.md`**:
    - Provide clear instructions on installing and setting up the extension.
    - Include guidelines for configuring environment variables and dependencies.

 2. **Maintain `CHANGELOG.md`**:
    - Document all changes, new features, bug fixes, and improvements.

 3. **Update `plan.md`**:
    - Keep this development plan updated to reflect current progress and next steps.

 ---

## 3. Updated Directory Structure

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

---

## 4. Summary of Actions

- **Implement Python Backend Scripts**:
  - Ensure scripts handle functionality for interacting with Azure DevOps and OpenAI.
  - Manage configurations securely using dedicated configuration files sourced from environment variables.

- **Integrate Scripts with VS Code Extension**:
  - Modify extension commands to execute the updated scripts.
  - Handle inputs and outputs appropriately, providing a seamless user experience.

- **Enhance User Interface and Feedback**:
  - Utilize VS Code UI elements to display messages, prompts, and outputs.
  - Implement progress indicators and error messages for improved user interaction.

- **Secure Application**:
  - Protect sensitive information by using environment variables and excluding configuration files from version control.
  - Update `.gitignore` accordingly.

- **Test Functionality Thoroughly**:
  - Conduct individual script tests and integrated extension tests.
  - Update automated tests to cover new features and use cases.

- **Update Documentation**:
  - Provide comprehensive setup and usage instructions.
  - Maintain change logs and development plans for transparency and collaboration.

---

## 5. Next Steps

- **Finalize Python Scripts**:
  - Complete implementation of all scripts, ensuring they work correctly and handle errors gracefully.

- **Complete Integration**:
  - Finish integrating the scripts with the VS Code extension commands.
  - Validate that all user interactions work as intended.

- **Conduct Testing**:
  - Perform thorough testing of all features.
  - Address any bugs or issues identified during testing.

- **Release Preparation**:
  - Update all documentation to reflect the final state of the project.
  - Prepare the extension for release, ensuring all dependencies and configurations are correctly set.

- **Plan Future Enhancements**:
  - Identify potential improvements or additional features for future development.
  - Gather feedback from users and stakeholders to guide future updates.

---
