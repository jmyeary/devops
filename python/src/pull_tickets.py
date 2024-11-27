from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication
import os
import json
import sys
from dotenv import load_dotenv
import os

load_dotenv()

ORGANIZATION_URL = os.getenv('ORGANIZATION_URL')
PERSONAL_ACCESS_TOKEN = os.getenv('PERSONAL_ACCESS_TOKEN')

if not all([ORGANIZATION_URL, PERSONAL_ACCESS_TOKEN]):
    raise Exception("Missing required environment variables")

def get_my_work_items():
    try:
        credentials = BasicAuthentication('', PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        
        # Query to get work items assigned to current user
        query = "SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.AssignedTo] = @Me AND [System.State] <> 'Closed'"
        results = wit_client.query_by_wiql({"query": query}).work_items
        
        # Get full work item details
        work_items = []
        for result in results:
            item = wit_client.get_work_item(result.id)
            work_items.append({
                "id": item.id,
                "title": item.fields["System.Title"],
                "state": item.fields["System.State"]
            })
        
        return work_items
    except Exception as e:
        print(f"Error: {str(e)}")
        return []

if __name__ == "__main__":
    items = get_my_work_items()
    for item in items:
        print(f"ID: {item['id']}, Title: {item['title']}, State: {item['state']}")
