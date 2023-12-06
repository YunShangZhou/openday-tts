FROM node:20-alpine

RUN mkdir ./app

WORKDIR /app
RUN npm install -g pnpm

# COPY ./package*.json ./fronted
COPY ./package.json ./
COPY ./package-lock.json ./

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 3100

CMD ["npm","start"]
