# Umbraco 17 Technical Assessment

## Overview
This solution implements:
- Strongly-typed **Article List** and **Article** document types and templates.
- A decoupled **C# Reading Time Service** registered via an Umbraco `IComposer`.
- A custom **Web Component Property Editor UI** with character count capabilities.
- Unit tests covering the calculation and HTML-sanitizing logic.

---

## 1. Setup Instructions
- **Prerequisites:** .NET 10 SDK installed.
- **Run the Solution:**
  ```powershell
  dotnet run --project UmbracoTechnical/UmbracoTechnical.csproj
  ```
- **Accessing Backoffice:** Navigate to `https://localhost:<port>/umbraco` and log in with your admin credentials.
- **Running Tests:**
  ```powershell
  dotnet test
  ```

---

## 2. Assumptions Made
1. **Static Assets Location (`App_Plugins`):**
   In Umbraco 17, static assets for the client-side backoffice are served by ASP.NET Core from `wwwroot/App_Plugins/` rather than the legacy project root. The custom property editor is located at `wwwroot/App_Plugins/CharCounter/`.
2. **Reading Speed Baseline:**
   An average adult reading speed of 200 words per minute (WPM) is assumed. Time rounds up to the nearest whole minute (minimum 1 minute if content exists).
3. **HTML Sanitization:**
   Because rich-text content includes markup, HTML tags are stripped prior to word counting.

---

## 3. Decisions & Trade-offs
- **`IComposer` vs `Program.cs`:**
  Registered `IReadingTimeService` using `IComposer` (`ServiceComposer.cs`). This adheres to Umbraco's modular architecture and keeps `Program.cs` clean.
- **Plain JS Web Component vs Vite/TypeScript:**
  Implemented using standard browser Custom Elements and standard `<uui-*>` elements. This avoids an unnecessary Node.js/NPM build pipeline while fulfilling all Umbraco 17 extension contracts.
- **Service Lifetime:**
  Registered as a `Singleton` because `ReadingTimeService` is stateless and thread-safe.

---

## 4. What I Would Improve
- **ViewModel Mapping / Hijacking:**
  Implement Umbraco Route Hijacking (`RenderController`) to pass dedicated ViewModels to Razor views rather than injecting services directly into templates.
- **Localization:**
  Leverage `@umbraco-cms/backoffice/localization` to translate labels in the Property Editor UI.
- **Full Lit + TypeScript Build:**
  Integrate Vite and TypeScript for compile-time type validation against `@umbraco-cms/backoffice` types.