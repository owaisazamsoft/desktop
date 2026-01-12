function Launch-Edge {

    param([int]$Port)
    $edgeProcess = Start-Process "chrome.exe" "--app=http://localhost:$Port" -PassThru
    return $edgeProcess.Id
    
}
