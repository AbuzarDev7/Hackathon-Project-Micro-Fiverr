@echo off
echo ===================================================
echo     Micro Fiverr - Backend Management (PM2)
echo ===================================================
echo [LOG] Checking backend status...
pm2 status micro-fiverr-backend | findstr "online" >nul
if errorlevel 1 (
    echo [!] Backend is not running. Starting it now...
    cd /d "D:\Abuzar web and app developer\Hackathon-Project-Micro-Fiverr\back-end"
    pm2 start server.js --name micro-fiverr-backend
) else (
    echo [OK] Backend is already running in the background.
)

echo.
echo ===================================================
echo     STREEMING LOGS (Press Ctrl+C to stop logs)
echo ===================================================
pm2 logs micro-fiverr-backend
pause
