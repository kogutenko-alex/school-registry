#!/bin/bash

echo "🚀 Starting School Registry application..."

# Check if services are already running
if docker-compose ps | grep -q "Up"; then
  echo "ℹ️  Some services are already running. Use ./restart.sh for a fresh start."
fi

echo "📦 Starting all services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to become healthy..."
echo "  📊 Database status:"
docker-compose ps postgres

echo "  🖥️  Backend status:"
docker-compose ps backend

echo "  🌐 Frontend status:"
docker-compose ps frontend

echo ""
echo "✅ Services are starting up!"
echo "🔗 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8080"
echo "  Database: localhost:5432"

echo ""
echo "💡 Commands:"
echo "  Check status: docker-compose ps"
echo "  View logs:    docker-compose logs -f"
echo "  Stop all:     docker-compose down"
echo "  Fresh start:  ./restart.sh"

echo ""
echo "📋 Showing live logs (Ctrl+C to exit):"
docker-compose logs -f 