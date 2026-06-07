#!/bin/bash

# Determine script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Add portable Node.js to PATH
export PATH="$DIR/node_portable/node-v22.12.0-win-x64:$PATH"

echo "Starting Astro development server in the background..."

# Start dev server in the background and redirect output to logs
nohup npm run dev > dev-server.log 2>&1 &

# Store PID
PID=$!

echo "------------------------------------------------"
echo "🚀 Astro Dev Server has been started in the background!"
echo "📍 Local URL: http://localhost:4321/"
echo "📝 Server logs: dev-server.log"
echo "🛑 To stop the server, run: kill $PID"
echo "------------------------------------------------"
