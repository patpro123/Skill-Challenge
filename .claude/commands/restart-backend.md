# Restart Backend

Kill any running Node.js process on port 3001 and restart the backend server.

## Steps

1. Kill the process currently using port 3001 (if any):
   ```bash
   lsof -ti :3001 | xargs kill -9 2>/dev/null || true
   ```

2. Start the backend server in the background from the `backend/` directory:
   ```bash
   cd /Users/srinikamukherjee/Documents/Claude-AgentOS/backend && node server.js &
   ```

3. Wait 1 second, then confirm it is running by hitting the health endpoint:
   ```bash
   sleep 1 && curl -s http://localhost:3001/health
   ```

4. Report the result to the user — confirm the server is up or surface any errors.
