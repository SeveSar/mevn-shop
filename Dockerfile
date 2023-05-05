# Использовать официальный образ Node.js версии 14 в качестве базового образа
FROM node

# Установить рабочую директорию внутри контейнера
WORKDIR /app

# Скопировать файлы package.json и package-lock.json в рабочую директорию контейнера
#если нужно будеет брать из кеша если уже такое было
COPY package.json /app

# Установить зависимости из файла package.json
RUN npm install

# Скопировать остальные файлы приложения в рабочую директорию контейнера
COPY . .

# Собрать Vue.js приложение
RUN npm run build

ENV VITE_BASE_URL http://localhost:5000
ENV PORT 3000 
# Открыть порт n на контейнере
EXPOSE 3000

# Запустить приложение
CMD ["npm", "run", "preview"]