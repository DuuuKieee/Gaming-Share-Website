FROM node:lasted
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD ['node', 'main.js', 'db.js']