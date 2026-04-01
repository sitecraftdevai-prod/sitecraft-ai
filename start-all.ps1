# SiteCraft AI Quick Start Script
Write-Host "🚀 Starting SiteCraft AI Platform..." -ForegroundColor Cyan

# Start Backend Services in separate windows
Write-Host "📦 Starting Backend Services..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd gateway; npm start" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/auth-service; npm start" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/project-service; npm start" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/chat-service; npm start" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/ai-service; npm start" -WindowStyle Normal

# Start Frontends
Write-Host "🎨 Starting Frontends..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client-web; npm run dev" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd admin-web; npm run dev" -WindowStyle Normal

Write-Host "✅ All services are spinning up in separate windows!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Gateway: http://localhost:5000"
