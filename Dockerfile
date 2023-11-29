FROM node:20-alpine

RUN mkdir ./fronted

WORKDIR ./fronted

# COPY ./package*.json ./fronted
COPY ./package.json /fronted/
COPY ./package-lock.json /fronted/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]