from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication
import sys
import os
import json

ORGANIZATION_URL = os.getenv('AZURE_DEVOPS_ORGANIZATION_URL')
PERSONAL_ACCESS_TOKEN = os.getenv('AZURE_DEVOPS_PAT')

def update_ticket(ticket_id, update_message):
    try:
        credentials = BasicAuthentication('', PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        
        update = [{
            "op": "add",
            "path": "/fields/System.History",
            "value": update_message
        }]
        
        wit_client.update_work_item(document=update, id=ticket_id)
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: update_ticket.py <ticket_id> <update_message>")
        sys.exit(1)
        
    ticket_id = int(sys.argv[1])
    message = json.loads(sys.argv[2])
    
    if update_ticket(ticket_id, message):
        print(f"Successfully updated ticket {ticket_id}")
    else:
        print(f"Failed to update ticket {ticket_id}")
