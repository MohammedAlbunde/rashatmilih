@echo off
color 0B
cls
echo.
echo =======================================
echo    RASHAT MILIH - DEPLOYMENT
echo =======================================
echo.

REM Save current branch name
for /f "tokens=* USEBACKQ" %%F in (`git rev-parse --abbrev-ref HEAD`) do set current_branch=%%F

REM Check if there are uncommitted changes
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [!] WARNING: You have uncommitted changes!
    echo.
    echo Please commit or stash your changes before deploying:
    echo ----------------------------------------------
    echo 1. git add .
    echo 2. git commit -m "Your message"
    echo.
    echo Press any key to exit...
    pause > nul
    exit /b 1
)

REM Switch to main branch
echo [*] Switching to main branch...
git checkout main

REM Pull latest changes from main
echo [*] Pulling latest changes from main...
git pull origin main

REM Merge development branch
echo [*] Merging development branch into main...
git merge development

REM Push to main
echo [*] Pushing changes to live site...
git push origin main

REM Switch back to development branch
echo [*] Switching back to development branch...
git checkout development

echo.
echo =======================================
echo       DEPLOYMENT COMPLETE!
echo =======================================
echo.
echo Your changes are now live on the website!
echo You're back in development mode.
echo.
echo Want to make more changes?
echo Just continue working - you're in dev mode!
echo =======================================
echo.
echo Press any key to close this window...
pause > nul
