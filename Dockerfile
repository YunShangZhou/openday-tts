FROM node:20-alpine

ARG env

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install pnpm -g
RUN pnpm install

COPY . .

RUN pnpm run build

CMD NODE_ENV={env} pnpm run start

