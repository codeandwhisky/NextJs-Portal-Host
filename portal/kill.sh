#!/usr/bin/env bash
set -euo pipefail

PORTS=(5001 5002 5003)

for port in "${PORTS[@]}"; do
  echo "Checking port $port..."
  # get PIDs listening on the port (works on macOS/linux)
  PIDS=$(lsof -ti tcp:"$port" || true)

  if [ -z "$PIDS" ]; then
    echo "  no process listening on port $port"
    continue
  fi

  echo "  found PIDs: $PIDS — sending SIGTERM"
  kill $PIDS || true

  # allow graceful shutdown
  sleep 1

  # if still present, force kill
  REMAINING=$(lsof -ti tcp:"$port" || true)
  if [ -n "$REMAINING" ]; then
    echo "  still running: $REMAINING — sending SIGKILL"
    kill -9 $REMAINING || true
  else
    echo "  stopped."
  fi
done

echo "All requested ports checked."