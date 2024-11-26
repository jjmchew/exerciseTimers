# Quick Exercise Timer project

- deployed version uses a simple express backend on port 3003 to serve an imported db.json file

  - this was done to allow relatively easy updates of db.json file (i.e., it's not incoporated into "compiled" front-end js)
  - NOTE: run `pm2 restart server` to ensure updated db.json file is served by backend

- deploy updates using `git pull` on VPS

- no effort spent on UI design
- coding focus ended up being on managing timers (set, start / pause, autoRun, etc.)

## To deploy

- used systemd:

  - `sudo systemctl daemon-reload`
  - `sudo systemctl enable exercise.service`
  - `sudo systemctl start exercise.service`
  - `systemctl status test.service`

- make sure nginx config allows root access to domain to return files (serve static react assets)
- create alternate location to /workouts to proxy pass to localhost:3003
