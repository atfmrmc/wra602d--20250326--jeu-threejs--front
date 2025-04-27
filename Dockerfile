FROM node:23-slim AS front-base

WORKDIR /app

# Installe nano/git si tu veux, mais pas obligatoire pour prod
RUN apt-get update && apt-get install -y nano git

FROM front-base AS front-dev

COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "npm run scss:watch & npm run dev"]