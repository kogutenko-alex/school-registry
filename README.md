# 🎓 School Registry Ukraine

A modern full-stack web application for managing Ukrainian schools registry built with **Spring Boot** backend and **React** frontend.

## 📸 Screenshots

![School Registry Interface](https://github.com/kogutenko-alex/school-registry/blob/main/docs/screenshots/main-interface.png)

## 🚀 Features

- ✅ **CRUD Operations**: Create, read, update, and deactivate schools
- 🔍 **Advanced Filtering**: Filter by name, region, school type, and status  
- 📊 **Pagination**: Efficient data loading with customizable page sizes
- 📅 **Audit Trail**: Automatic tracking of creation dates
- 🔄 **Real-time Updates**: Automatic table refresh after operations
- 🏷️ **Multi-select Filters**: Support for multiple selection criteria
- 🎨 **Modern UI**: Built with Chakra UI for excellent UX
- 🐳 **Docker Ready**: Full containerization with Docker Compose
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🌐 **Internationalization**: Ukrainian language support

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.2.1** - Java framework
- **Spring Data JPA** - Database ORM
- **PostgreSQL 15** - Primary database
- **Liquibase** - Database migration management
- **MapStruct** - Bean mapping
- **Lombok** - Code generation
- **OpenAPI 3** - API documentation (Swagger)
- **Maven** - Dependency management

### Frontend
- **React 18** - UI framework
- **Chakra UI** - Component library
- **Vite** - Build tool
- **JavaScript (ES6+)** - Programming language

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Web server for frontend
- **GitHub Actions** - CI/CD (planned)

## 📁 Project Structure

```
school-registry/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/schoolregistry/
│   │       ├── common/      # Shared utilities and configs
│   │       └── school/      # School domain logic
│   └── src/main/resources/
│       ├── application.yml  # App configuration
│       └── db/changelog/    # Liquibase migrations
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── postgres-init/          # Database initialization
├── docker-compose.yml      # Docker services config
└── README.md              # This file
```

## 🔧 Quick Start

### Prerequisites
- **Docker** and **Docker Compose**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/kogutenko-alex/school-registry.git
cd school-registry
```

### 2. Start the Application
```bash
docker-compose up --build -d
```

### 3. Wait for Health Checks
```bash
docker-compose ps
```
All services should show "healthy" status.

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/v1/schools  
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/actuator/health

## 📊 Database Schema

### Schools Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(255) | School name |
| `edrpou` | VARCHAR(8) | Unique tax ID |
| `region` | VARCHAR(100) | Ukrainian region |
| `type` | ENUM | School type (GYMNASIUM, LYCEUM, etc.) |
| `is_active` | BOOLEAN | Active status |
| `created_date` | TIMESTAMP | Creation timestamp |

## 🔥 API Examples

### Create a School
```bash
curl -X POST http://localhost:8080/api/v1/schools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Київська гімназія №1",
    "edrpou": "12345678",
    "region": "Київська область",
    "type": "GYMNASIUM"
  }'
```

### Get Schools with Filters
```bash
# Get active schools in Kyiv region
curl "http://localhost:8080/api/v1/schools?region=Київська область&statuses=true&page=0&size=10"
```

### Deactivate a School
```bash
curl -X PATCH http://localhost:8080/api/v1/schools/{schoolId}/deactivate
```

## 🏗️ Development Setup

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development  
```bash
cd frontend
npm install
npm run dev
```

### Database Only
```bash
docker-compose up postgres -d
```

## 📈 Monitoring & Health

### Health Endpoints
- **Application Health**: `GET /actuator/health`
- **Database Health**: Included in health check
- **All Services Status**: `docker-compose ps`

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

## 🔄 Database Migrations

The project uses **Liquibase** with automatic folder scanning:

```
backend/src/main/resources/db/changelog/
└── v1/                    # Version 1 migrations
    ├── 01-init-schools.xml
    └── 02-add-created-date-to-schools.xml
```

To add new migrations, simply create `*.xml` files in the `v1/` folder.

## 🧪 Testing

### Test the Full System
```bash
./test-system.sh
```

### Manual Testing Commands
```bash
# Create test school
curl -X POST http://localhost:8080/api/v1/schools \
  -H "Content-Type: application/json" \
  -d '{"name":"Test School","edrpou":"99999999","region":"Київська область","type":"GENERAL_SECONDARY_SCHOOL"}'

# Verify creation
curl http://localhost:8080/api/v1/schools | jq '.total'
```

## 🎯 Key Features Explained

### Automatic Table Refresh
After creating or deactivating schools, the frontend automatically refreshes data from the server while preserving:
- ✅ Current filters
- ✅ Current page
- ✅ Sort settings

### Smart Filtering
- **Multi-select dropdowns** for school types and statuses
- **Text search** by school name
- **Region dropdown** with all Ukrainian regions
- **Real-time filtering** with 300ms debounce

### Responsive Design
- **Mobile-first** approach
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** controls

## 🔐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/schooldb` | Database URL |
| `SPRING_DATASOURCE_USERNAME` | `user` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `pass` | Database password |
| `SERVER_PORT` | `8080` | Backend server port |

## 🚀 Deployment

### Production Docker Compose
```bash
docker-compose -f docker-compose.yml up -d
```

### Health Checks
All services include health checks:
- **PostgreSQL**: Connection test
- **Backend**: Spring Boot actuator  
- **Frontend**: Nginx status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** community for excellent documentation
- **Chakra UI** for beautiful React components  
- **Liquibase** for reliable database migrations
- **Docker** for simplifying deployment

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/kogutenko-alex/school-registry/issues) tab
2. Create a new issue with detailed description
3. Contact: [GitHub Profile](https://github.com/kogutenko-alex)

---

**Made with ❤️ for Ukrainian education system** 
 