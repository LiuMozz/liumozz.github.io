# Determine path to the portable hugo binary
$hugoPath = Resolve-Path (Join-Path $PSScriptRoot "..\hugo_bin\hugo.exe") -ErrorAction SilentlyContinue

if (-not $hugoPath) {
    $hugoPath = Resolve-Path (Join-Path $PSScriptRoot "hugo_bin\hugo.exe") -ErrorAction SilentlyContinue
}

if (-not $hugoPath -or -not (Test-Path $hugoPath.Path)) {
    Write-Error "Cannot find hugo.exe! Please make sure it exists in ../hugo_bin/ or ./hugo_bin/"
    Read-Host "Press Enter to exit..."
    Exit
}

Write-Host "Starting Hugo local preview server (with drafts enabled)..." -ForegroundColor Cyan
Write-Host "Please open in browser: http://localhost:1313/" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host "------------------------------------------------"

# Run hugo server
& $hugoPath.Path server -D
