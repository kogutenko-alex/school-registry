# 🚀 Quick Start - School Registry

## Швидкий запуск

### Передумови
- [Docker](https://docs.docker.com/get-docker/) встановлено
- [Docker Compose](https://docs.docker.com/compose/install/) встановлено

### Запуск системи

```bash
# Клонуємо репозиторій
git clone <your-repo-url>
cd school-registry

# Запускаємо всю систему однією командою
docker-compose up --build
```

### ✅ Результат

Після успішного запуску (2-4 хвилини) будуть доступні:

- **🌐 Frontend**: http://localhost:3000
- **⚙️ Backend API**: http://localhost:8080
- **📚 Swagger UI**: http://localhost:8080/swagger-ui/index.html
- **❤️ Health Check**: http://localhost:8080/actuator/health
- **🗄️ PostgreSQL**: localhost:5432
  - База: `schooldb`
  - Користувач: `user`
  - Пароль: `pass`

### 🛑 Зупинка

```bash
# Зупинити всі сервіси
docker-compose down

# Зупинити і видалити дані
docker-compose down -v
```

### 📝 Тестові дані

Система автоматично створює тестові школи:
- Київська гімназія №1 (ЄДРПОУ: 12345678)
- Львівський ліцей №15 (ЄДРПОУ: 87654321)  
- Харківська ЗЗСО №7 (ЄДРПОУ: 11223344)

### 🔧 Логи та діагностика

```bash
# Переглянути логи всіх сервісів
docker-compose logs -f

# Переглянути логи конкретного сервісу
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Перевірити статус сервісів
docker-compose ps
```

---

**Готово! 🎉 Система повністю налаштована та готова до роботи.** 
 

## Швидкий запуск

### Передумови
- [Docker](https://docs.docker.com/get-docker/) встановлено
- [Docker Compose](https://docs.docker.com/compose/install/) встановлено

### Запуск системи

```bash
# Клонуємо репозиторій
git clone <your-repo-url>
cd school-registry

# Запускаємо всю систему однією командою
docker-compose up --build
```

### ✅ Результат

Після успішного запуску (2-4 хвилини) будуть доступні:

- **🌐 Frontend**: http://localhost:3000
- **⚙️ Backend API**: http://localhost:8080
- **📚 Swagger UI**: http://localhost:8080/swagger-ui/index.html
- **❤️ Health Check**: http://localhost:8080/actuator/health
- **🗄️ PostgreSQL**: localhost:5432
  - База: `schooldb`
  - Користувач: `user`
  - Пароль: `pass`

### 🛑 Зупинка

```bash
# Зупинити всі сервіси
docker-compose down

# Зупинити і видалити дані
docker-compose down -v
```

### 📝 Тестові дані

Система автоматично створює тестові школи:
- Київська гімназія №1 (ЄДРПОУ: 12345678)
- Львівський ліцей №15 (ЄДРПОУ: 87654321)  
- Харківська ЗЗСО №7 (ЄДРПОУ: 11223344)

### 🔧 Логи та діагностика

```bash
# Переглянути логи всіх сервісів
docker-compose logs -f

# Переглянути логи конкретного сервісу
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Перевірити статус сервісів
docker-compose ps
```

---

**Готово! 🎉 Система повністю налаштована та готова до роботи.** 