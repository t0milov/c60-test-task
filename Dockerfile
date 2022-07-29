FROM node

# создание директории приложения
WORKDIR /home/Documents/c60-test-task

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json

COPY . .

WORKDIR /home/Documents/c60-test-task/server

RUN npm install

WORKDIR /home/Documents/c60-test-task/client

RUN npm install

WORKDIR /home/Documents/c60-test-task/

ADD run.sh /

RUN chmod +x /run.sh


# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код

EXPOSE 3000
EXPOSE 3333


CMD ["/run.sh"]