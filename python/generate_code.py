import sys
import os
import openai
import json

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def generate_code(ticket_description):
    try:
        openai.api_key = OPENAI_API_KEY
        
        prompt = f"""Write Python code to implement the following requirement:
        {ticket_description}
        
        Return only the code, no explanations."""
        
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: generate_code.py <ticket_description>")
        sys.exit(1)
        
    description = json.loads(sys.argv[1])
    code = generate_code(description)
    if code:
        print(code)
