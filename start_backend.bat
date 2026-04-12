@echo off
setlocal
set PORT=5000
set APP_NAME=micro-fiverr-backend

echo ===================================================
echo     Micro Fiverr - Backend Management (PM2)
echo ===================================================

echo [1/3] Cleaning up port %PORT%...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT% ^| findstr LISTENING') do (
    echo [!] Killing process %%a on port %PORT%...
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/3] Checking PM2 process status...
pm2 stop %APP_NAME% >nul 2>&1
pm2 delete %APP_NAME% >nul 2>&1

echo [3/3] Starting backend in background...
cd /d "%~dp0back-end"
pm2 start server.js --name %APP_NAME%

echo.
echo ===================================================
echo [OK] Backend is now running in the BACKGROUND.
echo [OK] It will stay alive even if you close VS Code!
echo ===================================================
echo.
echo TIP: To see live logs, run: pm2 logs %APP_NAME%
echo TIP: To stop it, run: pm2 stop %APP_NAME%
echo.
pause
