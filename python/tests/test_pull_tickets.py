import pytest
from unittest.mock import patch, MagicMock
from pull_tickets import get_my_work_items

@patch('pull_tickets.Connection')
def test_get_my_work_items(mock_connection):
    # Mock the Azure DevOps connection and client
    mock_wit_client = MagicMock()
    mock_connection.return_value.clients.get_work_item_tracking_client.return_value = mock_wit_client

    # Mock the query results
    mock_work_item = MagicMock()
    mock_work_item.id = 1
    mock_work_item.fields = {
        "System.Title": "Test Work Item",
        "System.State": "Active"
    }
    mock_wit_client.query_by_wiql.return_value.work_items = [MagicMock(id=1)]
    mock_wit_client.get_work_item.return_value = mock_work_item

    # Call the function
    work_items = get_my_work_items()

    # Assertions
    assert len(work_items) == 1
    assert work_items[0]['id'] == 1
    assert work_items[0]['title'] == "Test Work Item"
    assert work_items[0]['state'] == "Active"
