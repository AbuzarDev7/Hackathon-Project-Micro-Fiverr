@echo off
setlocal
set PORT=5000
set APP_NAME=micro-fiverr-backend

echo ===================================================
echo     Micro Fiverr - Stop All Processes
echo ===================================================

echo [1/2] Stopping PM2 processes...
pm2 stop %APP_NAME%
pm2 delete %APP_NAME%

echo [2/2] Cleaning up any ghost processes on port %PORT%...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT% ^| findstr LISTENING') do (
    echo [!] Killing process %%a on port %PORT%...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ===================================================
echo [OK] All processes stopped.
echo ===================================================
pause
