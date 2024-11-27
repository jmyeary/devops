import pytest

@pytest.fixture(autouse=True)
def mock_env_vars(monkeypatch):
    """Automatically mock environment variables for all tests"""
    monkeypatch.setenv('ORGANIZATION_URL', 'your-org')
    monkeypatch.setenv('PERSONAL_ACCESS_TOKEN', 'your-token ')
    monkeypatch.setenv('PROJECT_NAME', 'your-project')
    monkeypatch.setenv('OPENAI_API_KEY', 'testapikey')
