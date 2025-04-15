FROM node:23

WORKDIR /app

# Installe nano/git si tu veux, mais pas obligatoire pour prod
RUN apt-get update && apt-get install -y nano git

COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
