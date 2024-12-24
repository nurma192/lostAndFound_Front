# Используем официальный образ Node.js
FROM node:16-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем React приложение
RUN npm run build

# Открываем порт 80
EXPOSE 80

# Запускаем сервер
CMD ["npx", "serve", "build"]
