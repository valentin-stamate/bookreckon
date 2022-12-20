FROM node:19-alpine
WORKDIR /home/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npx prisma generate
CMD ["npm", "start"]
