# Changelog

All notable changes to the "ado-ai" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-02-12

### Added
- Initial Python backend integration with Azure DevOps
- OpenAI code generation capabilities
- Core VSCode extension commands:
  - Code generation command
  - Ticket update command
  - Work item creation command
  - Pull tickets command
- Environment variable configuration template
- Comprehensive test suite for Python backend:
  - Unit tests for code generation
  - Unit tests for ticket updates
  - Unit tests for work item creation
  - Unit tests for ticket retrieval
- Test configuration with pytest
- Mock environment setup for testing

### Changed
- Restructured project to separate Python backend and JavaScript frontend
- Enhanced command handling with progress indicators
- Improved error handling in Python scripts

### Technical
- Set up pytest testing framework
- Implemented unittest.mock for external service mocking
- Added test discovery configuration
- Created comprehensive testing documentation
