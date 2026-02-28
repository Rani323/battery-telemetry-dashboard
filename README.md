# Battery Telemetry Dashboard

A React dashboard for visualizing battery telemetry data (SoC, voltage, current, temperature).

**Requirement:** [Node.js](https://nodejs.org) (LTS) must be installed and on your PATH.

---

## If you see "npm is not recognized"

1. **Install Node.js**  
   - Go to [https://nodejs.org](https://nodejs.org) and download the **LTS** version.  
   - Run the installer and leave "Add to PATH" checked.  
   - Finish the setup.

2. **Use a new terminal**  
   - Close PowerShell/Command Prompt and open a **new** window (or restart Cursor/VS Code so its terminal gets the updated PATH).

3. **Try again** in the project folder:
   ```bash
   npm install
   npm start
   ```

---

## Run the app

```bash
npm install
npm start
```

Then open the URL shown (e.g. **http://localhost:5173**).

---

## All commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` or `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |

---

## Structure

- **public/battery.json** – Static telemetry data (simulates API)
- **src/components/** – Common, chart, and dashboard components
- **src/hooks/useBatteryData.js** – Fetches and formats battery data
- **src/utils/** – Time formatting, calculations, constants
