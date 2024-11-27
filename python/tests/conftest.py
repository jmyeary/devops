import pytest

@pytest.fixture(autouse=True)
def mock_env_vars(monkeypatch):
    """Automatically mock environment variables for all tests"""
    monkeypatch.setenv('ORGANIZATION_URL', 'https://dev.azure.com/testorg')
    monkeypatch.setenv('PERSONAL_ACCESS_TOKEN', 'testtoken')
    monkeypatch.setenv('PROJECT_NAME', 'TestProject')
    monkeypatch.setenv('OPENAI_API_KEY', 'testapikey')
