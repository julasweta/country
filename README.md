# Створення бази даних
```bash
psql -U postgres -c "CREATE DATABASE your_database_name;"
```

# Змініть DATABASE_URL
```bash
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/your_database_name"
```
# (Замініть USER, PASSWORD, HOST, PORT і your_database_name відповідно до ваших налаштувань)

# Застосування міграцій до бази даних
```bash
npx prisma migrate deploy
```

# Запуск проекту у режимі розробки (TypeScript)
npm run start:dev

# Парсінг через Postman
http://localhost:3000/countries/fetch

# Отримання даних по назві через Postman
http://localhost:3000/countries/search/Ukraine

# Створення нової міграції та застосування її
npx prisma migrate dev

# Генерація після змін у schema.prisma
npx prisma generate
