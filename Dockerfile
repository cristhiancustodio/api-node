FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

# Use the host or compose provided environment variables (via --env-file or env_file)
CMD ["node", "src/app.js"]
