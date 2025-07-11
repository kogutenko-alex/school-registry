# 🏫 School Registry - Реєстр Шкіл України

Система управління реєстром українських шкіл з веб-інтерфейсом та REST API.

## 📋 Про проект

**School Registry** - це веб-додаток для управління реєстром навчальних закладів України. Система дозволяє:
- 📚 Переглядати список усіх шкіл 
- 🔍 Фільтрувати школи за назвою, регіоном, типом та статусом
- ➕ Додавати нові школи до реєстру
- 🔻 Деактивувати школи (м'яке видалення)

## 🛠 Технології

### Backend
- **Java 17** + **Spring Boot 3.2**
- **PostgreSQL 15** - база даних
- **Liquibase** - міграції БД
- **MapStruct** - маппінг DTO ↔ Entity
- **Swagger/OpenAPI** - документація API

### Frontend  
- **React 18** + **Vite**
- **Chakra UI** - UI компоненти
- **Axios** - HTTP клієнт

### DevOps
- **Docker + Docker Compose** - контейнеризація
- **Nginx** - веб-сервер для React

## 🚀 Як запустити

### Передумови
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Запуск системи

```bash
# Клонувати репозиторій
git clone <repository-url>
cd school-registry

# Запустити всі сервіси (перша збірка ~3-5 хвилин)
docker-compose up --build -d

# Перевірити статус
docker-compose ps

# Переглянути логи (опціонально)
docker-compose logs -f
```

### Зупинка

```bash
# Зупинити всі сервіси
docker-compose down

# Повне очищення (включаючи дані БД)
docker-compose down -v
```

## 🔗 Корисні посилання

| Сервіс | URL | Опис |
|--------|-----|------|
| 🌐 **Frontend** | http://localhost:3000 | Веб-інтерфейс додатку |
| 📖 **Swagger UI** | http://localhost:8080/swagger-ui/index.html | Документація та тестування API |
| 🔌 **API Base** | http://localhost:8080/api/v1 | REST API endpoints |
| 💚 **Health Check** | http://localhost:8080/actuator/health | Статус бекенду |

## 📋 API Endpoints

| Метод | URL | Опис |
|-------|-----|------|
| `GET` | `/api/v1/schools` | Список шкіл з фільтрацією |
| `GET` | `/api/v1/schools/{schoolId}` | Отримати школу за ID |
| `POST` | `/api/v1/schools` | Створити нову школу |
| `PATCH` | `/api/v1/schools/{schoolId}/deactivate` | Деактивувати школу |

### Приклади запитів

```bash
# Отримати всі школи
curl "http://localhost:8080/api/v1/schools"

# Фільтрація за типом (гімназії та ліцеї)
curl "http://localhost:8080/api/v1/schools?types=GYMNASIUM&types=LYCEUM"

# Фільтрація за регіоном
curl "http://localhost:8080/api/v1/schools?region=Київська область"

# Деактивувати школу
curl -X PATCH "http://localhost:8080/api/v1/schools/{schoolId}/deactivate"
```

## 🏗 Структура даних

### School Entity
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Київська гімназія №1", 
  "edrpou": "12345678",
  "region": "Київська область",
  "type": "GYMNASIUM",
  "isActive": true
}
```

### Типи шкіл
- `GYMNASIUM` - Гімназія
- `LYCEUM` - Ліцей
- `GENERAL_SECONDARY_SCHOOL` - ЗЗСО

### Регіони України
Підтримуються всі 24 області + м. Київ + АР Крим

## 🗄 База даних

### Доступ до PostgreSQL
- **Host**: localhost:5432
- **Database**: schooldb
- **Username**: user
- **Password**: pass

### Тестові дані
Система автоматично створює тестові записи:
- Київська гімназія №1 (Гімназія, Київська область)
- Львівський ліцей №15 (Ліцей, Львівська область)  
- Харківська ЗЗСО №7 (ЗЗСО, Харківська область)

## 🐳 Docker

### Сервіси
- `postgres` - PostgreSQL база даних
- `backend` - Spring Boot API (порт 8080)
- `frontend` - React додаток (порт 3000)

### Корисні команди

```bash
# Перебудувати конкретний сервіс
docker-compose build backend
docker-compose build frontend

# Переглянути логи сервісу
docker-compose logs -f backend
docker-compose logs -f frontend

# Перезапустити сервіс
docker-compose restart backend
```

---

> 💡 **Швидкий старт**: `docker-compose up --build -d` → http://localhost:3000 
 