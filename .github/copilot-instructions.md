# Copilot Instructions for ficsit-hyper-speed

## Project Overview
This is a .NET (likely Blazor) project located in the `Ficsit/` directory. The main application code is in `Ficsit/Ficsit/`, with components under `Ficsit/Components/` and static assets in `Ficsit/wwwroot/`.

## Architecture & Structure
- **Entry Point:** `Ficsit/Program.cs` is the main entry for the application.
- **Components:** UI components are organized under `Ficsit/Components/`, with further subfolders for layouts and pages.
- **Layouts:** Shared layouts and modals are in `Ficsit/Components/Layout/`.
- **Routing:** Route definitions are in `Ficsit/Components/Routes.razor`.
- **Static Assets:** CSS and JS files are in `Ficsit/wwwroot/` and alongside their respective components.
- **Configuration:** App settings are managed via `appsettings.json` and `appsettings.Development.json`.

## Developer Workflows
- **Build:** Use `dotnet build Ficsit/Ficsit.csproj` from the root or `Ficsit/` directory.
- **Run/Debug:** Use `dotnet run --project Ficsit/Ficsit.csproj` for local development.
- **Hot Reload:** Supported via standard .NET tooling.
- **No custom scripts or workflows** are present in `.github/workflows/` as of this writing.

## Project Conventions
- **Component Naming:** Follows standard Blazor conventions (`.razor` for components, `.razor.css` for scoped styles, `.razor.js` for JS interop).
- **Imports:** Shared imports are managed in `_Imports.razor`.
- **Error Handling:** Error and not-found pages are in `Ficsit/Components/Pages/`.
- **No tests or test folders** are present in the current structure.

## Integration & Dependencies
- **.NET 10.0** is targeted (see `bin/Debug/net10.0/`).
- **No external service integrations** or API keys are visible in the structure.
- **No database or backend code** is present in the visible structure.

## Key Files & Directories
- `Ficsit/Program.cs`: Application entry point
- `Ficsit/Components/`: All Blazor components
- `Ficsit/Components/Layout/`: Layouts and modals
- `Ficsit/Components/Pages/`: Main pages (Home, Error, NotFound)
- `Ficsit/Components/Routes.razor`: Routing
- `Ficsit/wwwroot/`: Static assets (CSS, JS)
- `Ficsit/appsettings.json`: Configuration

## Example Patterns
- To add a new page: create a `.razor` file in `Ficsit/Components/Pages/` and add a route in `Routes.razor`.
- To add a new layout: add a `.razor` file in `Ficsit/Components/Layout/` and reference it in components/pages as needed.

---

If you discover new conventions or workflows, update this file to keep AI agents productive.
