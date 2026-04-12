@echo off
setlocal
echo ===================================================
echo     Micro Fiverr - Starting Both Servers
echo ===================================================

:: Increase memory limit for Node.js
set NODE_OPTIONS=--max-old-space-size=4096

echo [1] Checking Backend Server (PM2)...
pm2 status micro-fiverr-backend | findstr "online" >nul
if errorlevel 1 (
    echo [*] Backend not running. Starting it...
    cd /d "D:\Abuzar web and app developer\Hackathon-Project-Micro-Fiverr\back-end"
    pm2 start server.js --name micro-fiverr-backend
) else (
    echo [OK] Backend is already active in the background.
)

echo [2] Launching Frontend App (Vite Window)...
start "Frontend" cmd /k "cd /d D:\Abuzar web and app developer\Hackathon-Project-Micro-Fiverr\frontend && npm run dev"

echo.
echo ===================================================
echo  - Backend: Managed by PM2 (Background)
echo  - Frontend: Starting in a new browser/tab...
echo ===================================================
pause
