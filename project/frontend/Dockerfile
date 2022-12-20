FROM node:19-alpine
WORKDIR /home/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
