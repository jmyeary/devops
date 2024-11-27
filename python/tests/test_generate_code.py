import pytest
from unittest.mock import patch, MagicMock
from generate_code import generate_code

@patch('generate_code.openai.Completion.create')
def test_generate_code_success(mock_completion_create):
    # Mock the OpenAI API response
    mock_completion_create.return_value.choices = [
        MagicMock(text="def hello_world():\n    return 'Hello, World!'")
    ]

    # Call the function
    code = generate_code("Create a function that returns 'Hello, World!'")

    # Assertions
    assert code.strip() == "def hello_world():\n    return 'Hello, World!'"
    mock_completion_create.assert_called_once()

@patch('generate_code.openai.Completion.create')
def test_generate_code_failure(mock_completion_create):
    # Mock an exception from OpenAI API
    mock_completion_create.side_effect = Exception("API Error")

    # Call the function
    code = generate_code("Some description")

    # Assertions
    assert code is None
