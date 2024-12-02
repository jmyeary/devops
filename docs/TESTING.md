# Testing Documentation

## Overview

This document explains the testing infrastructure for the ADO-AI VSCode extension. The tests are written using the `pytest` framework and `unittest.mock` for mocking external dependencies.

## Test Structure

Tests are located in the `python/tests/` directory and include:

- `test_create_work_items.py` - Tests for work item creation functionality
- `test_generate_code.py` - Tests for code generation features
- `test_update_ticket.py` - Tests for ticket update functionality
- `test_pull_tickets.py` - Tests for retrieving work items
- `conftest.py` - Test fixtures and configuration

## Running Tests

To run all tests:

```bash
pytest
```

For verbose output:

```bash
pytest -vv
```

To check test coverage:

```bash
pytest --cov=src tests/
```

To debug failing tests:

```bash
pytest --pdb
```

## Test Configuration

### Environment Variables

The `conftest.py` file automatically sets up mock environment variables for testing:

- `ORGANIZATION_URL`
- `PERSONAL_ACCESS_TOKEN`
- `PROJECT_NAME`
- `OPENAI_API_KEY`

This ensures tests run consistently regardless of local environment settings.

## Test Modules

### 1. Work Item Creation Tests

Tests in `test_create_work_items.py` verify:
- Breaking down requirements into tasks using OpenAI
- Creating work items in Azure DevOps
- Handling of API responses and errors

### 2. Code Generation Tests

`test_generate_code.py` includes tests for:
- Successful code generation via OpenAI
- Error handling during API failures
- Response parsing and formatting

### 3. Ticket Update Tests

`test_update_ticket.py` verifies:
- Successful work item updates
- Error handling during connection failures
- Update message formatting

### 4. Work Item Retrieval Tests

`test_pull_tickets.py` tests:
- Querying work items from Azure DevOps
- Processing and formatting work item data
- Error handling for failed queries

## Mocking External Services

Tests use `unittest.mock` to simulate:

1. **Azure DevOps Services:**
   - Work item queries
   - Item creation and updates
   - Connection handling

2. **OpenAI API:**
   - Code generation responses
   - Task breakdown responses
   - API error scenarios

## Troubleshooting Failed Tests

When tests fail, follow these steps:

1. **Review Error Messages:**
   - Check assertion failures
   - Examine stack traces
   - Note any error messages

2. **Verify Mocks:**
   - Ensure mock objects return expected values
   - Check mock method call counts
   - Verify mock configurations

3. **Check Test Logic:**
   - Review test inputs
   - Verify expected outputs
   - Validate test assumptions

4. **Debug Code:**
   - Use `--pdb` flag for interactive debugging
   - Check variable values at failure points
   - Step through test execution

## Best Practices

1. **Keep Tests Updated:**
   - Update tests when modifying code
   - Add tests for new features
   - Remove obsolete tests

2. **Maintain Test Independence:**
   - Each test should run in isolation
   - Avoid test interdependencies
   - Clean up after each test

3. **Use Meaningful Names:**
   - Clear test function names
   - Descriptive variable names
   - Helpful assertion messages

4. **Regular Testing:**
   - Run tests frequently
   - Fix failing tests promptly
   - Maintain high coverage

## Test Output Interpretation

### Successful Tests

```
============================= test session starts ==============================
collected X items

test_create_work_items.py .
test_generate_code.py ..
test_pull_tickets.py .
test_update_ticket.py ..

============================== X passed in Ys ================================
```

### Failed Tests

```
=================================== FAILURES ===================================
__________________________ test_name ___________________________________

    def test_name():
>       assert actual == expected
E       assert actual == expected
E         + actual
E         - expected

========================= 1 failed, X passed in Ys ===========================
```

## Continuous Integration

Tests are automatically run in the CI pipeline to ensure code quality. The pipeline:

1. Sets up the test environment
2. Installs dependencies
3. Runs all tests
4. Reports test results and coverage

## Adding New Tests

When adding new functionality:

1. Create test file if needed
2. Write tests before implementation
3. Include both success and failure cases
4. Mock external dependencies
5. Verify edge cases
6. Maintain consistent style

## Conclusion

Maintaining a comprehensive test suite ensures the reliability and stability of the extension. Regular testing and prompt fixing of failures helps prevent issues in production.
