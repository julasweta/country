# Створення бази даних
psql -U postgres -c "CREATE DATABASE your_database_name;"

# Створення файлу .env на основі .env.example
cp .env.example .env

# Відкрийте файл .env і змініть DATABASE_URL (вручну через редактор, наприклад, nano)
nano .env

# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/your_database_name"
# (Замініть USER, PASSWORD, HOST, PORT і your_database_name відповідно до ваших налаштувань)

# Застосування міграцій до бази даних
npx prisma migrate deploy


# Запуск проекту у режимі розробки (TypeScript)
npm run start

# парсінг через Postman
http://localhost:3000/countries/fetch

# отримання даних через Postman
http://localhost:3000/countries/search/Ukraine
___________________________________________________
# Створення нової міграції та застосування її
npx prisma migrate dev

# Генерація  після змін у schema.prisma
npx prisma generate

