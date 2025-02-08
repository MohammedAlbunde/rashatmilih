@echo off
color 0A
cls
echo.
echo =======================================
echo      RASHAT MILIH - DEV MODE
echo =======================================
echo.

REM Switch to development branch
echo [*] Switching to development branch...
git checkout development

REM Pull latest changes from development branch
echo [*] Checking for updates...
git pull origin development

echo.
echo =======================================
echo          DEV MODE ACTIVE!
echo =======================================
echo.
echo You can now make changes safely.
echo Your changes won't affect the live site.
echo.
echo TO SAVE YOUR CHANGES:
echo -------------------
echo 1. git add .
echo 2. git commit -m "Your message"
echo 3. git push origin development
echo.
echo TO GO LIVE:
echo ----------
echo Just run deploy.bat when ready
echo.
echo =======================================
echo.
echo Press any key to close this window...
pause > nul
