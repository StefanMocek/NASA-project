FROM node:lts-alpine

WORKDIR /app

COPY ./server ./server

RUN npm install --omit=dev --prefix server

# RUN npm run build --prefix client

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 5000