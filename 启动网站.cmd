@echo off
setlocal
set "PROJECT_DIR=%~dp0"
set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%CODEX_NODE%" (
  echo.
  echo Node.js runtime was not found. Please install Node.js LTS, then run: pnpm dev
  pause
  exit /b 1
)

cd /d "%PROJECT_DIR%"
start "Huayin Healthcare Website" http://127.0.0.1:5173
"%CODEX_NODE%" ".\node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173

