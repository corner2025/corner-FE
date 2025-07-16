FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm install --include=dev

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
