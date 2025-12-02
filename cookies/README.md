# Cookie Playground

A playground to test cookie behavior across subdomains, iframes, and native webviews.

## Prerequisites

### Host Mapping
You must update your `/etc/hosts` file to map the following domains to `127.0.0.1`.

**For default `.corp` TLD:**
```
127.0.0.1 abc-be.tao.corp
127.0.0.1 abc.tao.corp
127.0.0.1 local.tao.com
```

**For `.com` TLD (optional):**
```
127.0.0.1 abc-be.tao.com
127.0.0.1 abc.tao.com
127.0.0.1 local.abc.com
```

### SSL Certificates
The project uses self-signed certificates. You can generate them using the provided script:

```bash
./gen-certs.sh
```

This will create `certs/server.key` and `certs/server.cert`. You will need to accept the security warnings in your browser or add the certificate to your system keychain.

## Installation

```bash
pnpm install
```

## Running the Servers

You can run the servers from the root directory using TurboRepo:

```bash
pnpm start:all
```

Or from this directory:

### Default (`.corp`)
Starts all 3 servers and the Swift Webview simulation:

```bash
pnpm run start:all
```

### Custom TLD (`.com`)
To use `.com` domains (requires host mapping above):

```bash
TLD=com pnpm run start:all
```

## Architecture

- **BE Server** (`abc-be.tao.corp` / `3001`): Sets a cookie with `Domain=.tao.corp` (or `.tao.com`).
- **FE Server 1** (`abc.tao.corp` / `3002`): Main frontend. Redirects to BE to set cookie, then displays it.
- **FE Server 2** (`local.tao.com` / `3003`): Embeds FE Server 1 in an iframe to test third-party cookie access.
- **Swift Webview**: A native macOS app using `WKWebView` to simulate Safari/iOS behavior.

## Verification Steps

### 1. Subdomain Cookie Sharing
1.  Open [https://abc.tao.corp:3002](https://abc.tao.corp:3002).
2.  Click **"Go to BE to set cookie"**.
3.  Verify redirection and return.
4.  "Current Cookie Value" should show a timestamp.
5.  Click **"Ping BE"** to verify the cookie is sent with fetch requests.

### 2. Iframe Cookie Access
1.  Open [https://local.tao.com:3003](https://local.tao.com:3003).
2.  Interact with the iframe (Set Cookie, Ping BE).
3.  Observe if third-party cookies are blocked (expected in modern browsers).

### 3. Native Webview (Swift)
1.  Run `pnpm run start:all`.
2.  A native window will open.
3.  Verify cookie behavior in this isolated environment.
