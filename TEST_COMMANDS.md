# 🧪 Test Commands - Тестування системи

## Команди для перевірки після запуску

### 1. Перевірка запуску сервісів

```bash
# Статус всіх контейнерів
docker-compose ps

# Логи всіх сервісів
docker-compose logs

# Логи конкретного сервісу
docker-compose logs postgres
docker-compose logs backend
docker-compose logs frontend
```

### 2. Перевірка доступності API

```bash
# Health check backend
curl http://localhost:8080/actuator/health

# Список шкіл (повинен повернути JSON)
curl http://localhost:8080/api/schools/all

# Отримати конкретну школу
curl http://localhost:8080/api/schools/550e8400-e29b-41d4-a716-446655440001

# Створити нову школу
curl -X POST http://localhost:8080/api/schools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тестова школа №1",
    "edrpou": "99999999",
    "region": "Тестова область",
    "type": "GYMNASIUM",
    "isActive": true
  }'
```

### 3. Перевірка frontend

```bash
# Health check frontend
curl http://localhost:3000/health

# Головна сторінка (повинна повернути HTML)
curl -I http://localhost:3000/
```

### 4. Перевірка бази даних

```bash
# Підключення до PostgreSQL
docker-compose exec postgres psql -U user -d schooldb

# Виконати в psql:
# \dt - показати таблиці
# SELECT * FROM schools; - показати всі школи
# \q - вийти
```

### 5. Швидка перевірка всієї системи

```bash
#!/bin/bash
echo "🔍 Перевірка системи School Registry..."

echo "1. Перевірка PostgreSQL..."
docker-compose exec postgres pg_isready -U user -d schooldb && echo "✅ PostgreSQL готовий" || echo "❌ PostgreSQL не готовий"

echo "2. Перевірка Backend..."
curl -s http://localhost:8080/actuator/health | grep -q "UP" && echo "✅ Backend готовий" || echo "❌ Backend не готовий"

echo "3. Перевірка Frontend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ | grep -q "200" && echo "✅ Frontend готовий" || echo "❌ Frontend не готовий"

echo "4. Перевірка API..."
curl -s http://localhost:8080/api/schools/all | grep -q '\[' && echo "✅ API повертає дані" || echo "❌ API не повертає дані"

echo "🏫 Перевірка завершена!"
```

### 6. Очікувані результати

#### Backend Health Check
```json
{
  "status": "UP",
  "groups": ["liveness", "readiness"]
}
```

#### API Schools List
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Київська гімназія №1",
    "edrpou": "12345678",
    "region": "Київська область",
    "type": "GYMNASIUM",
    "isActive": true
  }
]
```

#### Docker Compose Status
```
Name                        Command                  State             Ports
------------------------------------------------------------------------------------
school-registry-backend     java -jar app.jar        Up               0.0.0.0:8080->8080/tcp
school-registry-db          docker-entrypoint.s...   Up               0.0.0.0:5432->5432/tcp
school-registry-frontend    nginx -g daemon off;     Up               0.0.0.0:3000->3000/tcp
```

---

**Всі команди повинні виконуватися успішно після `docker-compose up --build`** 
 

## Команди для перевірки після запуску

### 1. Перевірка запуску сервісів

```bash
# Статус всіх контейнерів
docker-compose ps

# Логи всіх сервісів
docker-compose logs

# Логи конкретного сервісу
docker-compose logs postgres
docker-compose logs backend
docker-compose logs frontend
```

### 2. Перевірка доступності API

```bash
# Health check backend
curl http://localhost:8080/actuator/health

# Список шкіл (повинен повернути JSON)
curl http://localhost:8080/api/schools/all

# Отримати конкретну школу
curl http://localhost:8080/api/schools/550e8400-e29b-41d4-a716-446655440001

# Створити нову школу
curl -X POST http://localhost:8080/api/schools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тестова школа №1",
    "edrpou": "99999999",
    "region": "Тестова область",
    "type": "GYMNASIUM",
    "isActive": true
  }'
```

### 3. Перевірка frontend

```bash
# Health check frontend
curl http://localhost:3000/health

# Головна сторінка (повинна повернути HTML)
curl -I http://localhost:3000/
```

### 4. Перевірка бази даних

```bash
# Підключення до PostgreSQL
docker-compose exec postgres psql -U user -d schooldb

# Виконати в psql:
# \dt - показати таблиці
# SELECT * FROM schools; - показати всі школи
# \q - вийти
```

### 5. Швидка перевірка всієї системи

```bash
#!/bin/bash
echo "🔍 Перевірка системи School Registry..."

echo "1. Перевірка PostgreSQL..."
docker-compose exec postgres pg_isready -U user -d schooldb && echo "✅ PostgreSQL готовий" || echo "❌ PostgreSQL не готовий"

echo "2. Перевірка Backend..."
curl -s http://localhost:8080/actuator/health | grep -q "UP" && echo "✅ Backend готовий" || echo "❌ Backend не готовий"

echo "3. Перевірка Frontend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ | grep -q "200" && echo "✅ Frontend готовий" || echo "❌ Frontend не готовий"

echo "4. Перевірка API..."
curl -s http://localhost:8080/api/schools/all | grep -q '\[' && echo "✅ API повертає дані" || echo "❌ API не повертає дані"

echo "🏫 Перевірка завершена!"
```

### 6. Очікувані результати

#### Backend Health Check
```json
{
  "status": "UP",
  "groups": ["liveness", "readiness"]
}
```

#### API Schools List
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Київська гімназія №1",
    "edrpou": "12345678",
    "region": "Київська область",
    "type": "GYMNASIUM",
    "isActive": true
  }
]
```

#### Docker Compose Status
```
Name                        Command                  State             Ports
------------------------------------------------------------------------------------
school-registry-backend     java -jar app.jar        Up               0.0.0.0:8080->8080/tcp
school-registry-db          docker-entrypoint.s...   Up               0.0.0.0:5432->5432/tcp
school-registry-frontend    nginx -g daemon off;     Up               0.0.0.0:3000->3000/tcp
```

---

**Всі команди повинні виконуватися успішно після `docker-compose up --build`** 