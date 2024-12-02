# TODO List

## Current Progress

We have developed an initial version of the "ado-ai" VSCode extension with the following features:

- **Python Backend Scripts:**
  - `pull_tickets.py`: Pulls assigned tickets from Azure DevOps.
  - `create_work_items.py`: Uses OpenAI to break down requirements and create work items.
  - `update_ticket.py`: Updates a ticket with a message.
  - `generate_code.py`: Generates code based on ticket descriptions using OpenAI.

- **VSCode Extension Commands:**
  - Commands implemented in `src/commands/index.js`:
    - `pullTickets`
    - `generateCode`
    - `updateTicket`
    - `createWorkItems`

- **Configuration and Dependencies:**
  - `.env.template` provided for environment variables.
  - `package.json` includes extension metadata and scripts.

## Milestones

### Alpha Development (Testing Phase)

**Goal:** Ensure all existing functionalities are tested and working as expected.

- [x] **Unit Testing:**
  - [x] Write unit tests for all Python scripts in `python/tests/`:
    - ✓ `test_generate_code.py` - Tests code generation and error handling
    - ✓ `test_pull_tickets.py` - Tests work item retrieval
    - ✓ `test_update_ticket.py` - Tests ticket updates
  - [ ] Implement unit tests for JavaScript commands.
- [ ] **Integration Testing:**
  - [ ] Test end-to-end workflows between the VSCode extension and Python backend.
- [x] **Test Configuration:**
  - [x] Set up `conftest.py` with environment variable mocking
  - [x] Configure pytest test discovery
- [ ] **Continuous Integration Setup:**
  - [ ] Configure CI pipeline to run tests automatically.

### Beta Release (Minimum Viable Product)

**Goal:** Improve user experience and prepare for broader testing.

- [ ] **Error Handling and Logging:**
  - [ ] Enhance exception handling in Python scripts.
  - [ ] Implement logging in Python and JavaScript code.
- [ ] **User Interface Enhancements:**
  - [ ] Improve prompts and input validation in VSCode commands.
  - [ ] Add progress notifications and status indicators.
- [ ] **Security Improvements:**
  - [ ] Secure handling of environment variables and API keys.
  - [ ] Sanitize user inputs to prevent injection attacks.
- [ ] **Documentation:**
  - [ ] Update `README.md` with detailed setup and usage instructions.
  - [ ] Add examples and screenshots.
  - [ ] Keep `CHANGELOG.md` updated with recent changes.

### Production Release

**Goal:** Finalize features, ensure stability, and release the extension.

- [ ] **Final Testing:**
  - [ ] Perform extensive manual testing.
  - [ ] Address any bugs or performance issues.
- [ ] **Packaging and Distribution:**
  - [ ] Optimize the extension package.
  - [ ] Prepare assets and metadata for the VSCode Marketplace.
- [ ] **Legal and Compliance:**
  - [ ] Review licenses of used dependencies.
  - [ ] Ensure compliance with OpenAI and Azure DevOps terms of service.
- [ ] **Release Preparation:**
  - [ ] Finalize all documentation.
  - [ ] Set version number to `1.0.0`.
  - [ ] Submit the extension to the VSCode Marketplace.

## Detailed Task Breakdown

### Testing

- **Python Tests:**
  - [ ] Create tests for `pull_tickets.py`.
  - [ ] Create tests for `create_work_items.py`.
  - [ ] Create tests for `update_ticket.py`.
  - [ ] Create tests for `generate_code.py`.
- **JavaScript Tests:**
  - [ ] Set up testing framework (e.g., Mocha).
  - [ ] Write tests for each command in `src/commands/index.js`.

### Error Handling and Logging

- **Python Scripts:**
  - [ ] Use `logging` module for detailed logs.
  - [ ] Catch and handle specific exceptions.
- **JavaScript Code:**
  - [ ] Implement try-catch blocks around async operations.
  - [ ] Provide user-friendly error messages.

### User Interface Enhancements

- [ ] **Input Validation:**
  - [ ] Ensure inputs from `showInputBox` are validated.
- [ ] **Progress Indicators:**
  - [ ] Use `withProgress` to show task status.
- [ ] **Success and Error Messages:**
  - [ ] Standardize messages shown to the user.

### Security Improvements

- [ ] **Environment Variables:**
  - [ ] Guide users to securely store API keys.
- [ ] **Input Sanitization:**
  - [ ] Sanitize inputs passed to shell commands in `exec`.

### Documentation

- [ ] **README.md:**
  - [ ] Provide installation instructions.
  - [ ] Explain each feature in detail.
- [ ] **CHANGELOG.md:**
  - [ ] Document all changes made since initial release.
- [ ] **Usage Examples:**
  - [ ] Add examples and possibly GIFs or screenshots.

### Packaging and Distribution

- [ ] **Optimize Extension:**
  - [ ] Review and update `.vscodeignore`.
- [ ] **Marketplace Assets:**
  - [ ] Create an icon and banner for the extension.
  - [ ] Write a compelling description.

---

By following this roadmap, we can systematically address the remaining tasks needed to bring our extension to a production-ready state. Each milestone builds upon the previous, ensuring that we deliver a high-quality product to our users.
