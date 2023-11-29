FROM node:20-alpine

RUN mkdir ./fronted

WORKDIR /fronted
RUN npm install -g pnpm

# COPY ./package*.json ./fronted
COPY ./package.json ./
COPY ./package-lock.json ./

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]