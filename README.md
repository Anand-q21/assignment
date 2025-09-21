# Microservices Backend with NestJS & PostgreSQL

A microservices-based backend system built with **NestJS**, **PostgreSQL**, and **Nx monorepo** featuring Products and Orders services with an API Gateway.

## 📝 Developer Note

**Hi! I'm a fresher developer** who worked on this microservices project with guidance from a senior developer who helped me learn many new concepts. I gave my best effort to implement the requirements, but due to **time constraints**, I wasn't able to complete:
- ❌ **Docker containerization** (Docker files are provided but not fully tested)
- ❌ **Frontend implementation** (NextJS structure exists but UI is not developed)
- ❌ **PostgreSQL integration** (currently using in-memory storage)

However, the **core backend functionality is working** with JWT authentication, microservices communication, and Swagger documentation. This has been an amazing learning experience!

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌──────────────────┐
│                 │      │                 │      │                 │      │                  │
│   Frontend      │◄───► │   API Gateway   │◄───► │  Products       │◄───► │  Products DB   │
│   (Next.js)     │      │   (NestJS)      │ REST │  Service        │ TCP  │  (PostgreSQL)    │
│   Port: 4200    │      │   Port: 3000    │      │  (TCP: 3001)    │      │                  │
│                 │      │                 │      │                 │      │                  │
└─────────────────┘      └─────────────────┘      └─────────────────┘      └──────────────────┘
                           │ ▲
                           │ │ TCP
                           ▼ │
                         ┌─────────────────┐      ┌──────────────────┐
                         │                 │      │                  │
                         │   Orders        │◄───► │   Orders DB      │
                         │   Service       │ TCP  │   (PostgreSQL)   │
                         │   (TCP: 3002)   │      │                  │
                         │                 │      │                  │
                         └─────────────────┘      └──────────────────┘
```

## 🚀 Features

### Products Service
- ✅ CRUD operations for products
- ✅ Product Code, Name, Description, Rate, Image
- ✅ TCP microservice communication
- ✅ In-memory storage (easily switchable to PostgreSQL)

### Orders Service
- ✅ Create and view orders
- ✅ Customer details (name, phone)
- ✅ Product associations
- ✅ Total amount calculation

### API Gateway
- ✅ Single REST API entry point
- ✅ JWT Authentication
- ✅ Request routing to microservices
- ✅ Swagger documentation

### Frontend
- ⚠️ NextJS structure created (UI not implemented due to time constraints)
- ⚠️ Basic TypeScript setup
- ❌ Product and Order management UI (not completed)
- ❌ Authentication integration (not completed)

## 📋 Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **PostgreSQL** (optional - currently using in-memory storage)
- **Docker** & **Docker Compose** (files provided but not fully tested)

## 🛠️ Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd my-org
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file in root:
```env
# Database credentials
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password

# Database names
PRODUCTS_DB_NAME=products-service
ORDERS_DB_NAME=orders-service

# JWT Configuration
JWT_SECRET=superSecretKey
JWT_EXPIRES_IN=1h
```

### 4. Start Services

#### Option A: Development Mode
```bash
# Terminal 1 - API Gateway
npx nx serve api-gateway

# Terminal 2 - Products Service
npx nx serve products-service

# Terminal 3 - Orders Service
npx nx serve orders-service

# Terminal 4 - Frontend (UI not implemented)
# npx nx serve frontend
```

#### Option B: Docker Compose (Not fully tested)
```bash
# Note: Docker setup provided but not fully tested due to time constraints
# docker-compose up -d
```

## 🔗 Service URLs

| Service | URL | Documentation |
|---------|-----|---------------|
| API Gateway | http://localhost:3000 | http://localhost:3000/docs |
| Products Service | TCP:3001 | - |
| Orders Service | TCP:3002 | - |
| Frontend | http://localhost:4200 | ❌ Not implemented |

## 🔐 Authentication

### Login Credentials
```json
{
  "username": "bob",
  "password": "secret"
}
```
or
```json
{
  "username": "alice", 
  "password": "password"
}
```

### Using JWT Token
1. **Login** via `/auth/login` endpoint
2. **Copy** the `access_token` from response
3. **Add** to Authorization header: `Bearer <token>`
4. **Or use Swagger**: Click 🔒 "Authorize" button and paste token

## 📚 API Documentation

### Authentication Endpoints
```http
POST /auth/login
Content-Type: application/json

{
  "username": "bob",
  "password": "secret"
}
```

### Products Endpoints (Protected)
```http
# Create Product
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "productCode": "P1001",
  "productName": "Laptop",
  "productDescription": "High performance laptop",
  "productRate": 1200,
  "productImage": "http://example.com/laptop.png"
}

# Get All Products
GET /products
Authorization: Bearer <token>

# Get Product by ID
GET /products/{id}
Authorization: Bearer <token>

# Update Product
PUT /products/{id}
Authorization: Bearer <token>

# Delete Product
DELETE /products/{id}
Authorization: Bearer <token>
```

### Orders Endpoints (Protected)
```http
# Create Order
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerPhone": "+1234567890",
  "products": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 1200
    }
  ],
  "totalAmount": 2400
}

# Get All Orders
GET /orders
Authorization: Bearer <token>

# Get Order by ID
GET /orders/{id}
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
my-org/
├── apps/
│   ├── api-gateway/          # Main API Gateway
│   ├── products-service/     # Products Microservice
│   ├── orders-service/       # Orders Microservice
│   └── frontend/             # NextJS Frontend
├── libs/
│   └── shared-dtos/          # Shared TypeScript DTOs
├── docker-compose.yml        # Docker services
├── .env                      # Environment variables
└── README.md                 # This file
```

## 🧪 Testing

### Manual Testing with Swagger
1. Navigate to http://localhost:3000/docs
2. Click "Authorize" and login to get JWT token
3. Test all endpoints with authentication

### Manual Testing with cURL
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "bob", "password": "secret"}'

# Create Product (replace TOKEN)
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productCode": "P1001", "productName": "Laptop", "productDescription": "Gaming laptop", "productRate": 1500}'
```

## 🐳 Docker Deployment (Not Completed)

**Note**: Docker configuration files are provided but not fully tested due to time constraints.

### Docker Compose Configuration
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: microservices
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api-gateway:
    build: .
    command: npx nx serve api-gateway
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - products-service
      - orders-service

  products-service:
    build: .
    command: npx nx serve products-service
    depends_on:
      - postgres

  orders-service:
    build: .
    command: npx nx serve orders-service
    depends_on:
      - postgres

  frontend:
    build: .
    command: npx nx serve frontend
    ports:
      - "4200:4200"
    depends_on:
      - api-gateway

volumes:
  postgres_data:
```

### Build & Run (Not Tested)
```bash
# Note: These commands are provided but not fully tested
# docker-compose up --build
# docker-compose up -d
# docker-compose down
```

## 🔧 Development

### Adding New Features
```bash
# Generate new library
npx nx g @nx/js:lib packages/new-feature

# Generate new service
npx nx g @nx/nest:app apps/new-service

# Run specific service
npx nx serve <service-name>

# Build specific service
npx nx build <service-name>
```

### Database Migration (PostgreSQL)
```bash
# Enable PostgreSQL in services
# Update app.module.ts to use TypeORM configuration
# Run migrations
npm run migration:run
```

## 🚨 Troubleshooting

### Common Issues

**1. 401 Unauthorized Error**
- Ensure you're logged in and using valid JWT token
- Check token expiration (1 hour default)
- Verify Authorization header format: `Bearer <token>`

**2. 500 Internal Server Error**
- Check if all microservices are running
- Verify database connection (if using PostgreSQL)
- Check service logs for detailed errors

**3. Service Connection Issues**
- Ensure TCP ports 3001, 3002 are available
- Check if services are properly registered in API Gateway
- Verify microservice transport configuration

**4. Frontend Connection Issues**
- Frontend UI is not implemented yet
- NextJS structure exists but needs development
- API Gateway is accessible at port 3000

### Logs & Debugging
```bash
# View service logs
npx nx serve api-gateway --verbose
npx nx serve products-service --verbose

# Check running processes
netstat -an | findstr :3000
netstat -an | findstr :3001
netstat -an | findstr :3002
```

## 📝 TODO / Future Enhancements

### High Priority (Not Completed)
- [ ] **Frontend UI development** (NextJS components and pages)
- [ ] **Docker containerization testing** (files exist but need validation)
- [ ] **PostgreSQL integration** (currently using in-memory storage)
- [ ] **Orders service implementation** (basic structure exists)

### Medium Priority
- [ ] Unit tests for all services
- [ ] Integration tests
- [ ] Redis caching layer
- [ ] Rate limiting
- [ ] API versioning

### Low Priority
- [ ] Monitoring & logging (ELK stack)
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment
- [ ] GraphQL API option

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Development Journey

- **Backend**: ✅ NestJS Microservices with JWT Authentication (Working)
- **Frontend**: ⚠️ NextJS structure (UI not implemented)
- **DevOps**: ⚠️ Docker files provided (not fully tested)
- **Documentation**: ✅ Swagger/OpenAPI (Working)

## 🙏 Acknowledgments

Special thanks to the senior developer who mentored me throughout this project and helped me understand:
- Microservices architecture patterns
- NestJS framework and decorators
- JWT authentication implementation
- TCP communication between services
- Swagger API documentation
- Nx monorepo structure

This project has been an incredible learning experience as a fresher developer!

---

**Built with ❤️, determination, and lots of learning using NestJS and Nx**