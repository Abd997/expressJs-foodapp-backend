FROM node:16-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm ci --production

EXPOSE 8080

CMD ["npm", "start"]