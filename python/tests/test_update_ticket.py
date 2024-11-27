import pytest
from unittest.mock import patch, MagicMock
from update_ticket import update_ticket

@patch('update_ticket.Connection')
def test_update_ticket_success(mock_connection):
    # Mock the Azure DevOps connection and client
    mock_wit_client = MagicMock()
    mock_connection.return_value.clients.get_work_item_tracking_client.return_value = mock_wit_client

    # Mock successful update
    mock_wit_client.update_work_item.return_value = True

    # Call the function
    result = update_ticket(123, "This is an update.")

    # Assertions
    assert result is True
    mock_wit_client.update_work_item.assert_called_once()

@patch('update_ticket.Connection')
def test_update_ticket_failure(mock_connection):
    # Mock the Azure DevOps connection to raise an exception
    mock_connection.side_effect = Exception("Connection failed")

    # Call the function
    result = update_ticket(123, "This is an update.")

    # Assertions
    assert result is False
