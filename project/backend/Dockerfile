FROM node:19-alpine
WORKDIR /home/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD sh -c "npx prisma migrate dev --name init; npm start"
