# Quick Exercise Timer project

- deployed version uses a simple express backend on port 3003 to serve an imported db.json file
  - this was done to allow relatively easy updates of db.json file (i.e., it's not incoporated into "compiled" front-end js)
  - NOTE:  run `pm2 restart server` to ensure updated db.json file is served by backend

- deploy updates using `git pull` on VPS

- no effort spent on UI design
- coding focus ended up being on managing timers (set, start / pause, autoRun, etc.)

## Todos
- quick code to incorporate environment variables into code to facilitate local testing and remote deployment (api.ts: setting of API URL) had unresolved type errors with TS and was removed

