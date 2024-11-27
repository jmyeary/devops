import pytest
from unittest.mock import patch, MagicMock
from create_work_items import create_work_items, break_down_requirements

@patch('create_work_items.Connection')
@patch('create_work_items.openai.Completion.create')
def test_create_work_items(mock_completion_create, mock_connection):
    # Mock OpenAI response
    mock_completion_create.return_value.choices = [
        MagicMock(text="- Task 1\n- Task 2")
    ]

    # Mock the Azure DevOps connection and client
    mock_wit_client = MagicMock()
    mock_connection.return_value.clients.get_work_item_tracking_client.return_value = mock_wit_client

    # Mock the creation of work items
    mock_wit_client.create_work_item.side_effect = [
        MagicMock(id=101),
        MagicMock(id=102)
    ]

    # Call the function
    requirements = "Implement user authentication"
    created_items = create_work_items(requirements, "TestProject")

    # Assertions
    assert len(created_items) == 2
    assert created_items[0]['id'] == 101
    assert created_items[1]['id'] == 102

def test_break_down_requirements():
    with patch('create_work_items.openai.Completion.create') as mock_completion:
        mock_completion.return_value.choices = [
            MagicMock(text="- Task 1\n- Task 2\n- Task 3")
        ]
        
        tasks = break_down_requirements("Some requirements")
        
        assert len(tasks) == 3
        assert tasks == ["Task 1", "Task 2", "Task 3"]
