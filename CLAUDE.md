# Development Guidelines for elijahlucian.ca

## Project Structure
- `web/`: React frontend (Vite, TypeScript, React Router)
- `server/`: Express backend (TypeScript, MongoDB/Mongoose)
- `vr/`: WebVR application

## Commands
### Web (Frontend)
- `cd web && npm run dev`: Start frontend dev server
- `cd web && npm run build`: Build for production
- `cd web && npm run lint`: Run ESLint

### Server (Backend)
- `cd server && npm run dev`: Start backend with hot reload
- `cd server && npm run build`: Compile TypeScript
- `cd server && npm run console`: Run console with environment

## Code Style
- **Formatting**: Use Prettier with default settings
- **Types**: Always use TypeScript with explicit type annotations
- **Imports**: Group by external/internal, alphabetize
- **Components**: Functional components with explicit Props type
- **Error Handling**: Use guard clauses, explicit error types
- **Naming**: 
  - Variables/functions: camelCase
  - Components/Types: PascalCase
  - Constants: UPPER_SNAKE_CASE

## Cursor Rules
- Prefer guard statements
- Follow existing patterns rather than creating new ones

## Git Commit Guidelines
- Sign all commits with a different fictional company and funny titles for Elijah & Claude
- Use a different made-up creative tech company name for each commit
- Include humorous titles that change with each commit
- Example signature formats:
  ```
  Co-Authored-By: Elijah (Code Wizard) & Claude (Pixel Alchemist) <team@quantumfusion.dev>
  ```
  ```
  Co-Authored-By: Elijah (Digital Sorcerer) & Claude (Byte Whisperer) <duo@cosmicbits.io>
  ```
  ```
  Co-Authored-By: Elijah (Interface Maestro) & Claude (Logic Ninja) <founders@nebulatech.xyz>
  ```
- Be creative and have fun with company names and titles
- Ensure each commit has a unique combination