# Changelog

All notable changes to MODA AI Studio will be documented in this file.

## [3.1.0] - 2026-01-21

### Added
- **Runpod Serverless Support**: Added `handler.py` processing script for Runpod Serverless deployment
- **Docker Support**: Added `Dockerfile` for containerized deployment
- **Python Requirements**: Added `requirements.txt` for Runpod dependencies
- **Runpod Badge**: Added Runpod badge to README.md
- **Deployment Documentation**: Enhanced README with Runpod deployment instructions

### Fixed
- **TypeScript Errors**: Fixed compilation errors in `demo/gateway.ts`
  - Resolved missing 'openai' module dependency
  - Added proper type definitions for OpenAI API responses
  - Improved type safety with custom interfaces (ContentItem, ResponseItem, ExtendedResponse)
- **Demo Dependencies**: Installed required dependencies in demo directory

### Improved
- **Type Safety**: Replaced unsafe `any` type assertions with proper TypeScript interfaces
- **Code Quality**: Enhanced error handling and response parsing in demo gateway

## [3.0.0] - Initial Release

### Features
- React 19 + TypeScript + Tailwind CSS workspace
- Spatial workspace with draggable sectors
- AI integration with Gemini/OpenAI support
- Smart compiler UI with streaming responses
- Memory service for conversation context
- Local persistence with browser localStorage
- Vercel deployment support
- Multi-provider AI support (Gemini, OpenAI, DeepSeek, Anthropic)
