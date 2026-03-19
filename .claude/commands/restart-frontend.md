# Restart Frontend

Kill any running process on port 5174 and restart the Vite dev server.

## Steps

1. Kill the process currently using port 5174 (if any):
   ```bash
   lsof -ti :5174 | xargs kill -9 2>/dev/null || true
   ```

2. Start the Vite dev server in the background from the `frontend/` directory:
   ```bash
   cd /Users/srinikamukherjee/Documents/Claude-AgentOS/frontend && npm run dev &
   ```

3. Wait 2 seconds, then confirm it is running:
   ```bash
   sleep 2 && curl -s -o /dev/null -w "%{http_code}" http://localhost:5174
   ```

4. Report the result to the user — confirm the dev server is up at http://localhost:5174 or surface any errors.
