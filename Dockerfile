FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]