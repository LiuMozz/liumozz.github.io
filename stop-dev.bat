@echo off
setlocal

echo Stopping Astro Dev Server running on port 4321...

:: Find and kill processes listening on port 4321
set "FOUND="
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4321') do (
    echo Killing process %%a...
    taskkill /F /PID %%a 2>nul
    set FOUND=1
)

if not defined FOUND (
    echo No server process found running on port 4321.
) else (
    echo Successfully stopped.
)

pause
