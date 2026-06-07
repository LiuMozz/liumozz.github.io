@echo off
setlocal

:: Get root directory of the script
set "DIR=%~dp0"

:: Add portable Node.js to PATH
set "PATH=%DIR%node_portable\node-v22.12.0-win-x64;%PATH%"

echo Starting Astro development server in the background...

:: Start npm run dev in background (running as a separate job in command line)
start /B "" npm.cmd run dev > dev-server.log 2>&1

echo ------------------------------------------------
echo 🚀 Astro Dev Server has been started in the background!
echo 📍 Local URL: http://localhost:4321/
echo 📝 Server logs: dev-server.log
echo 🛑 Close this Command Prompt window to stop the server.
echo ------------------------------------------------
pause
