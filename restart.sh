#!/bin/bash

echo "🛑 Stopping and removing containers..."
docker-compose down --volumes

echo "🧹 Cleaning up Docker images and cache..."
docker system prune -f

echo "🔨 Building fresh images (this may take a few minutes)..."
docker-compose build --no-cache

echo "🚀 Starting services in order..."
echo "  📊 Starting database..."
docker-compose up -d postgres

echo "  ⏳ Waiting for database to be healthy..."
while ! docker-compose ps postgres | grep -q "healthy"; do
  sleep 2
  echo "    Still waiting for database..."
done
echo "  ✅ Database is ready!"

echo "  🖥️  Starting backend..."
docker-compose up -d backend

echo "  ⏳ Waiting for backend to be healthy..."
timeout=300 # 5 minutes
counter=0
while ! docker-compose ps backend | grep -q "healthy" && [ $counter -lt $timeout ]; do
  sleep 5
  counter=$((counter + 5))
  echo "    Still waiting for backend... (${counter}s/${timeout}s)"
done

if [ $counter -ge $timeout ]; then
  echo "  ❌ Backend health check timed out"
  docker-compose logs backend
  exit 1
fi
echo "  ✅ Backend is ready!"

echo "  🌐 Starting frontend..."
docker-compose up -d frontend

echo "✅ All services started!"
echo "🔗 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8080"
echo "  Database: localhost:5432"

echo ""
echo "📋 Final status:"
docker-compose ps

echo ""
echo "📋 Showing logs (Ctrl+C to exit):"
docker-compose logs -f 