@echo off
echo Starting deployment process...
echo.

REM Save current branch name
for /f "tokens=* USEBACKQ" %%F in (`git rev-parse --abbrev-ref HEAD`) do set current_branch=%%F

REM Check if there are uncommitted changes
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: You have uncommitted changes!
    echo Please commit or stash your changes before deploying.
    echo.
    echo To commit your changes:
    echo 1. git add .
    echo 2. git commit -m "Your message"
    echo.
    pause
    exit /b 1
)

REM Switch to main branch
echo Switching to main branch...
git checkout main

REM Pull latest changes from main
echo Pulling latest changes from main...
git pull origin main

REM Merge development branch
echo Merging development branch into main...
git merge development

REM Push to main
echo Pushing changes to live site...
git push origin main

REM Switch back to development branch
echo Switching back to development branch...
git checkout development

echo.
echo ========================================
echo Deployment Complete!
echo.
echo Your changes are now live on the website.
echo You're back in development mode for more changes.
echo ========================================
echo.

pause
