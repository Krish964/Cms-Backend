# Node.js ka lightweight official base image
FROM node:18-alpine

# Container ke andar working directory set karo
WORKDIR /app

# Package.json & package-lock.json copy karo aur dependencies install karo
COPY package*.json ./
RUN npm install

# Baaki saara source code copy karo
COPY . .

# Express app jo port use kar raha hai, wo expose karo (example: 7000)
EXPOSE 7000

# App start karne ka command (agar aapka main file index.js hai)
CMD ["node", "index.js"]
