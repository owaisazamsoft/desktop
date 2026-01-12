param (
    [switch]$StartEdge
)


# ---------------------------
# Load all function files
# ---------------------------
. "$PSScriptRoot\server-functions.ps1"
. "$PSScriptRoot\edge-functions.ps1"

# ---------------------------
# Config
# ---------------------------
$Port = 8080
$Folder = Join-Path $PSScriptRoot "dist"


# Check Existing Port
# -------------------------
# 1️⃣ Check if server is running
# -------------------------
$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connections) {
    Write-Host "Server is already running at http://localhost:$Port"
    # Optionally launch Edge to existing server
    Start-Process msedge "--app=http://localhost:$Port"
    exit
}



# ---------------------------
# Start server
# ---------------------------
$listener = Start-Server -Port $Port -Folder $Folder



# ---------------------------
# Opening In Browser
# ---------------------------
if ($StartEdge) {
    $EdgePID = Launch-Edge -Port $Port
    Write-Host "$EdgePID"
} else {
    $EdgePID = $null
}



# ---------------------------
# Serve requests
# ---------------------------
Serve-Requests -Listener $listener -EdgePID $EdgePID -Folder $Folder



