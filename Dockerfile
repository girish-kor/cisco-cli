FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN chmod +x bin/cisco-cli.js
ENTRYPOINT ["node", "bin/cisco-cli.js"]
