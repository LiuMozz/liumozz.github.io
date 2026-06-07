#!/bin/bash

echo "Stopping Astro Dev Server running on port 4321..."

# Check if running on Windows (Git Bash / MSYS / Cygwin)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  # Get PIDs listening on port 4321
  PIDS=$(netstat -aon | grep :4321 | awk '{print $5}' | sort -u)
  if [ -n "$PIDS" ]; then
    for pid in $PIDS; do
      echo "Killing Windows process $pid..."
      taskkill -F -PID $pid 2>/dev/null || kill -9 $pid
    done
    echo "Successfully stopped."
  else
    echo "No server process found running on port 4321."
  fi
else
  # Standard Linux / macOS using lsof
  if command -v lsof >/dev/null 2>&1; then
    PID=$(lsof -t -i:4321)
    if [ -n "$PID" ]; then
      echo "Killing Linux/macOS process $PID..."
      kill $PID
      echo "Successfully stopped."
    else
      echo "No server process found running on port 4321."
    fi
  else
    # Fallback to fuser
    PID=$(fuser 4321/tcp 2>/dev/null)
    if [ -n "$PID" ]; then
      echo "Killing Linux process $PID..."
      kill -9 $PID
      echo "Successfully stopped."
    else
      echo "No server process found running on port 4321."
    fi
  fi
fi
