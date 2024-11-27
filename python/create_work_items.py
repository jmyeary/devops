from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication
import openai
import sys
import os
import json
from dotenv import load_dotenv
import os

load_dotenv()

ORGANIZATION_URL = os.getenv('ORGANIZATION_URL')
PERSONAL_ACCESS_TOKEN = os.getenv('PERSONAL_ACCESS_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PROJECT_NAME = os.getenv('PROJECT_NAME')

if not all([ORGANIZATION_URL, PERSONAL_ACCESS_TOKEN, OPENAI_API_KEY, PROJECT_NAME]):
    raise Exception("Missing required environment variables")

def break_down_requirements(requirements):
    try:
        openai.api_key = OPENAI_API_KEY
        prompt = f"""Break down the following requirements into specific tasks:
        {requirements}
        
        Format each task as a single line starting with '- '"""
        
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=500,
            temperature=0.7
        )
        
        tasks = [task[2:] for task in response.choices[0].text.strip().split('\n') if task.startswith('- ')]
        return tasks
    except Exception as e:
        print(f"Error breaking down requirements: {str(e)}")
        return []

def create_work_items(requirements, project_name):
    try:
        tasks = break_down_requirements(requirements)
        if not tasks:
            return False
            
        credentials = BasicAuthentication('', PERSONAL_ACCESS_TOKEN)
        connection = Connection(base_url=ORGANIZATION_URL, creds=credentials)
        wit_client = connection.clients.get_work_item_tracking_client()
        
        created_items = []
        for task in tasks:
            work_item = [
                {
                    "op": "add",
                    "path": "/fields/System.Title",
                    "value": task
                },
                {
                    "op": "add",
                    "path": "/fields/System.Description",
                    "value": f"Generated from requirements: {requirements}"
                }
            ]
            
            item = wit_client.create_work_item(
                document=work_item,
                project=project_name,
                type='Task'
            )
            created_items.append({
                "id": item.id,
                "title": task
            })
            
        return created_items
    except Exception as e:
        print(f"Error creating work items: {str(e)}")
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: create_work_items.py <requirements>")
        sys.exit(1)
        
    requirements = json.loads(sys.argv[1])
    create_work_items(requirements)
    if items:
        print(json.dumps(items))
    else:
        print("Failed to create work items")
