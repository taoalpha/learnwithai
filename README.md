# Learn With AI Workspace

This repository is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces) and [TurboRepo](https://turbo.build/).

## Structure

- **cookies/**: Cookie playground with multiple servers and native webview simulation.
- **echo/**: Echo demo (static site).

## Getting Started

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run all apps**:
    ```bash
    pnpm start:all
    ```
    This uses TurboRepo to run the `start:all` script in all workspaces that have it (currently `cookies`).

## Workspaces

### Cookies
See [cookies/README.md](./cookies/README.md) for detailed instructions on the cookie playground.
