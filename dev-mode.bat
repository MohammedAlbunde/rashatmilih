@echo off
echo Switching to development mode...

REM Switch to development branch
git checkout development

REM Pull latest changes from development branch
git pull origin development

echo.
echo ========================================
echo Development Mode Active!
echo.
echo You can now make changes safely.
echo Your changes won't affect the live site.
echo.
echo To save your changes:
echo 1. git add .
echo 2. git commit -m "Your message"
echo 3. git push origin development
echo.
echo When ready to go live, run deploy.bat
echo ========================================
echo.

pause
