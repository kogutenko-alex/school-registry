# 🏫 School Registry - Docker Setup

Автоматизована система розгортання з Docker Compose.

## 🚀 Швидкий запуск

### Варіант 1: Звичайний запуск
```bash
./start.sh
```

### Варіант 2: Повний перезапуск (з очищенням)
```bash
./restart.sh
```

### Варіант 3: Ручне керування
```bash
# Запуск
docker-compose up -d

# Зупинка
docker-compose down

# Перезбудова і запуск
docker-compose up --build -d
```

## 📦 Архітектура

### 1. База даних (PostgreSQL)
- **Порт**: 5432
- **Користувач**: user
- **Пароль**: pass  
- **БД**: schooldb
- **Health check**: `pg_isready`
- **Запускається першою**

### 2. Backend (Spring Boot)
- **Порт**: 8080
- **Multi-stage Dockerfile**: білдить JAR автоматично
- **Health check**: `/actuator/health`
- **Залежить від**: PostgreSQL
- **Liquibase**: автоматичні міграції

### 3. Frontend (React + Nginx)
- **Порт**: 3000
- **Multi-stage Dockerfile**: білдить React app
- **Health check**: основна сторінка
- **Залежить від**: Backend

## 🔄 Автоматизація

### Особливості Docker Compose:
- `pull_policy: build` - завжди перебілдить при зміні коду
- `depends_on` з `condition: service_healthy` - правильна послідовність
- Health checks з таймаутами - перевіряє готовність сервісів
- Автоматичний restart при падінні

### Multi-stage Dockerfiles:
- **Backend**: Maven build → JRE runtime
- **Frontend**: Node build → Nginx serve
- Кешування залежностей для швидкості

## 🔗 Ендпоінти

### Backend API
- **Health**: http://localhost:8080/actuator/health
- **Schools**: http://localhost:8080/api/v1/schools
- **Swagger**: http://localhost:8080/swagger-ui/index.html

### Frontend
- **App**: http://localhost:3000 (коли frontend працює)

### База даних
- **Host**: localhost:5432
- **Connection**: `jdbc:postgresql://localhost:5432/schooldb`

## 🛠️ Команди для дебагу

```bash
# Статус контейнерів
docker-compose ps

# Логи всіх сервісів
docker-compose logs -f

# Логи конкретного сервісу
docker-compose logs backend
docker-compose logs postgres
docker-compose logs frontend

# Перевірка health endpoints
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/v1/schools

# Підключення до БД
docker-compose exec postgres psql -U user -d schooldb

# Зайти в контейнер
docker-compose exec backend bash
```

## 🔧 Налаштування

### Послідовність запуску:
1. **PostgreSQL** стартує і чекає health check
2. **Backend** стартує після здорової БД
3. **Frontend** стартує після здорового backend

### Таймаути:
- **БД**: 10s start period
- **Backend**: 120s start period (Maven білд)  
- **Frontend**: 60s start period

## 🎯 Результат

✅ **Повністю автоматизований білд і деплой**  
✅ **Мінімум команд - максимум автоматизації**  
✅ **Правильна послідовність запуску сервісів**  
✅ **Health checks забезпечують надійність**  
✅ **Multi-stage builds оптимізують розмір образів**

**Одна команда `./restart.sh` перебілдить і запустить всю систему!** 