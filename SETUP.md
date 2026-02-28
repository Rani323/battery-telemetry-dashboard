# Setup: "npm is not recognized"

This means **Node.js** is not installed or not on your system PATH.

## Fix it

### 1. Install Node.js (Windows)

1. Open **https://nodejs.org**
2. Download the **LTS** (recommended) version
3. Run the installer
4. Keep **"Add to PATH"** checked, then complete the install

### 2. Restart your terminal

- Close the current PowerShell/Command Prompt (or Cursor/VS Code)
- Open a **new** terminal so it picks up the new PATH

### 3. Check that it worked

In the new terminal, run:

```bash
node --version
npm --version
```

You should see version numbers (e.g. `v20.x.x` and `10.x.x`).

### 4. Run the project

In the project folder:

```bash
cd c:\Users\ranir\OneDrive\Desktop\Assignment_React\battery-telemetry-dashboard
npm install
npm start
```

Then open **http://localhost:5173** in your browser.
