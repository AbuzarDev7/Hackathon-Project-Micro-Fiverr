@echo off
echo ===================================================
echo     Micro Fiverr - Starting Both Servers
echo ===================================================

:: Increase memory limit for Node.js to prevent memory allocation crashes
set NODE_OPTIONS=--max-old-space-size=4096

echo [1] Starting Backend Server (Port 5000)...
start cmd /k "title Backend Server && cd back-end && npm run dev"

echo [2] Starting Frontend App (Vite)...
start cmd /k "title Frontend Server && cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo If you see a memory error, please wait a moment and try again.
pause
