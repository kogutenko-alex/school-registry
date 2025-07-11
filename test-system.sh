#!/bin/bash

# Test script for School Registry system

echo "🔍 Перевірка системи School Registry..."
echo "======================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Wait for services to be ready
echo "⏳ Очікування готовності сервісів (30 секунд)..."
sleep 30

# Test PostgreSQL
echo -n "1. Перевірка PostgreSQL... "
if docker-compose exec -T postgres pg_isready -U user -d schooldb &>/dev/null; then
    echo -e "${GREEN}✅ Готовий${NC}"
    POSTGRES_OK=true
else
    echo -e "${RED}❌ Не готовий${NC}"
    POSTGRES_OK=false
fi

# Test Backend Health
echo -n "2. Перевірка Backend Health... "
if curl -s http://localhost:8080/actuator/health | grep -q "UP"; then
    echo -e "${GREEN}✅ Готовий${NC}"
    BACKEND_OK=true
else
    echo -e "${RED}❌ Не готовий${NC}"
    BACKEND_OK=false
fi

# Test Backend API
echo -n "3. Перевірка Backend API... "
if curl -s http://localhost:8080/api/schools/all | grep -q '\['; then
    echo -e "${GREEN}✅ API повертає дані${NC}"
    API_OK=true
else
    echo -e "${RED}❌ API не повертає дані${NC}"
    API_OK=false
fi

# Test Frontend
echo -n "4. Перевірка Frontend... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Готовий (HTTP $HTTP_CODE)${NC}"
    FRONTEND_OK=true
else
    echo -e "${RED}❌ Не готовий (HTTP $HTTP_CODE)${NC}"
    FRONTEND_OK=false
fi

# Test Swagger UI
echo -n "5. Перевірка Swagger UI... "
SWAGGER_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/swagger-ui/index.html)
if [ "$SWAGGER_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Доступний (HTTP $SWAGGER_CODE)${NC}"
    SWAGGER_OK=true
else
    echo -e "${RED}❌ Недоступний (HTTP $SWAGGER_CODE)${NC}"
    SWAGGER_OK=false
fi

echo ""
echo "📊 Результати тестування:"
echo "========================="

if [ "$POSTGRES_OK" = true ] && [ "$BACKEND_OK" = true ] && [ "$API_OK" = true ] && [ "$FRONTEND_OK" = true ] && [ "$SWAGGER_OK" = true ]; then
    echo -e "${GREEN}🎉 Всі сервіси працюють правильно!${NC}"
    echo ""
    echo "🌐 Доступні посилання:"
    echo "• Frontend: http://localhost:3000"
    echo "• Backend API: http://localhost:8080"
    echo "• Swagger UI: http://localhost:8080/swagger-ui/index.html"
    echo "• Health Check: http://localhost:8080/actuator/health"
    echo ""
    echo "🗄️ База даних:"
    echo "• Host: localhost:5432"
    echo "• Database: schooldb"
    echo "• User: user"
    echo "• Password: pass"
    exit 0
else
    echo -e "${RED}❌ Деякі сервіси не працюють правильно${NC}"
    echo ""
    echo -e "${YELLOW}💡 Рекомендації:${NC}"
    echo "• Перевірте логи: docker-compose logs"
    echo "• Перезапустіть: docker-compose down && docker-compose up --build"
    echo "• Очистіть volumes: docker-compose down -v && docker-compose up --build"
    exit 1
fi 
 

# Test script for School Registry system

echo "🔍 Перевірка системи School Registry..."
echo "======================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Wait for services to be ready
echo "⏳ Очікування готовності сервісів (30 секунд)..."
sleep 30

# Test PostgreSQL
echo -n "1. Перевірка PostgreSQL... "
if docker-compose exec -T postgres pg_isready -U user -d schooldb &>/dev/null; then
    echo -e "${GREEN}✅ Готовий${NC}"
    POSTGRES_OK=true
else
    echo -e "${RED}❌ Не готовий${NC}"
    POSTGRES_OK=false
fi

# Test Backend Health
echo -n "2. Перевірка Backend Health... "
if curl -s http://localhost:8080/actuator/health | grep -q "UP"; then
    echo -e "${GREEN}✅ Готовий${NC}"
    BACKEND_OK=true
else
    echo -e "${RED}❌ Не готовий${NC}"
    BACKEND_OK=false
fi

# Test Backend API
echo -n "3. Перевірка Backend API... "
if curl -s http://localhost:8080/api/schools/all | grep -q '\['; then
    echo -e "${GREEN}✅ API повертає дані${NC}"
    API_OK=true
else
    echo -e "${RED}❌ API не повертає дані${NC}"
    API_OK=false
fi

# Test Frontend
echo -n "4. Перевірка Frontend... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Готовий (HTTP $HTTP_CODE)${NC}"
    FRONTEND_OK=true
else
    echo -e "${RED}❌ Не готовий (HTTP $HTTP_CODE)${NC}"
    FRONTEND_OK=false
fi

# Test Swagger UI
echo -n "5. Перевірка Swagger UI... "
SWAGGER_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/swagger-ui/index.html)
if [ "$SWAGGER_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Доступний (HTTP $SWAGGER_CODE)${NC}"
    SWAGGER_OK=true
else
    echo -e "${RED}❌ Недоступний (HTTP $SWAGGER_CODE)${NC}"
    SWAGGER_OK=false
fi

echo ""
echo "📊 Результати тестування:"
echo "========================="

if [ "$POSTGRES_OK" = true ] && [ "$BACKEND_OK" = true ] && [ "$API_OK" = true ] && [ "$FRONTEND_OK" = true ] && [ "$SWAGGER_OK" = true ]; then
    echo -e "${GREEN}🎉 Всі сервіси працюють правильно!${NC}"
    echo ""
    echo "🌐 Доступні посилання:"
    echo "• Frontend: http://localhost:3000"
    echo "• Backend API: http://localhost:8080"
    echo "• Swagger UI: http://localhost:8080/swagger-ui/index.html"
    echo "• Health Check: http://localhost:8080/actuator/health"
    echo ""
    echo "🗄️ База даних:"
    echo "• Host: localhost:5432"
    echo "• Database: schooldb"
    echo "• User: user"
    echo "• Password: pass"
    exit 0
else
    echo -e "${RED}❌ Деякі сервіси не працюють правильно${NC}"
    echo ""
    echo -e "${YELLOW}💡 Рекомендації:${NC}"
    echo "• Перевірте логи: docker-compose logs"
    echo "• Перезапустіть: docker-compose down && docker-compose up --build"
    echo "• Очистіть volumes: docker-compose down -v && docker-compose up --build"
    exit 1
fi 