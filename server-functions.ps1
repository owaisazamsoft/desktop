function Start-Server {

    param([int]$Port, [string]$Folder)
    
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
    Write-Host "Server started at http://localhost:$Port"
    return $listener
}


function Serve-Requests {
    param([System.Net.HttpListener]$Listener, [int]$EdgePID, [string]$Folder)
    
    while ($true) {

        # Handle HTTP requests
        if ($Listener.IsListening) {

                $context = $Listener.GetContext()
                $req = $context.Request
                $res = $context.Response
                
                $path = $req.RawUrl.TrimStart('/')
                if ($path -eq '' -or $path.EndsWith('/')) { $path += 'index.html' }

                $cleanPath = $path.Split('?')[0]
                $full = Join-Path $Folder $cleanPath
                # $full = Join-Path $Folder $path

                if (Test-Path $full) {

                    $ext = [IO.Path]::GetExtension($full).ToLower()
                    $res.ContentType = myExtension -Ext $ext
                    $bytes = [IO.File]::ReadAllBytes($full)
                    $res.ContentLength64 = $bytes.Length
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                    
                } else {

                    # SPA fallback: serve index.html for all unknown routes
                    $indexFile = Join-Path $Folder "index.html"
                    if (Test-Path $indexFile) {
                        $res.ContentType = "text/html; charset=utf-8"
                        $bytes = [IO.File]::ReadAllBytes($indexFile)
                        $res.ContentLength64 = $bytes.Length
                        $res.OutputStream.Write($bytes, 0, $bytes.Length)
                    } else {
                        # Only real 404 if index.html is missing
                        $res.StatusCode = 404
                        $msg = [Text.Encoding]::UTF8.GetBytes("Not found")
                        $res.ContentLength64 = $msg.Length
                        $res.OutputStream.Write($msg, 0, $msg.Length)
                    }

                }

                $res.Close()
        }


    }

}


function Stop-ExistingServer {
    param([int]$Port)

    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

    if ($connections) {
        $procIds = $connections.OwningProcess | Where-Object { $_ -is [int] } | Select-Object -Unique

        if (-not $procIds) {
            Write-Host "Port ${Port} appears in use but no valid PID found."
            return
        }

        Write-Host "Existing server detected on port ${Port}. Stopping PID(s): $($procIds -join ', ')"

        foreach ($procId in $procIds) {
            try {
                Stop-Process -Id $procId -Force
                Write-Host "Stopped PID ${procId}"
            } catch {
                Write-Host "Could not stop PID ${procId}: $_"
            }
        }

        Start-Sleep -Seconds 1
    } else {
        Write-Host "No existing server running on port ${Port}"
    }
    
}

function myExtension {
    param (
        [string]$Ext
    )

    switch ($Ext.ToLower()) {
        ".html"  { return "text/html; charset=utf-8" }
        ".js"    { return "application/javascript" }
        ".css"   { return "text/css" }
        ".json"  { return "application/json" }

        ".svg"   { return "image/svg+xml" }
        ".png"   { return "image/png" }
        ".jpg"   { return "image/jpeg" }
        ".jpeg"  { return "image/jpeg" }
        ".ico"   { return "image/x-icon" }
        ".webp"  { return "image/webp" }

        # 🔥 REQUIRED FOR VUETIFY / ICONS
        ".woff"  { return "font/woff" }
        ".woff2" { return "font/woff2" }
        ".ttf"   { return "font/ttf" }
        ".otf"   { return "font/otf" }
        ".eot"   { return "application/vnd.ms-fontobject" }

        ".map"   { return "application/json" }

        default  { return "application/octet-stream" }
    }
}