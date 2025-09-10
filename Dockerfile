# USE A NODE JS BASE IMAGE TO BUILD AND INSTALL DEPS
FROM node:20-alpine AS BUILDER

# ITS LIKE CD /app BUT INSIDE THE CONTAINER
WORKDIR /app

COPY package*.json ./


RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]