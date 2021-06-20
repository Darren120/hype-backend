# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-slim
# Create and change to the app directory. usr/src already exist, we're actually just creating an app inside src.

WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./app

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN npm install --only=production 
# Copy local code to the container image into WORKDIR
COPY . /app
# RUN npx knex migrate:latest --env production

# COPY prisma ./prisma
# RUN npm install -g @prisma/client prisma && prisma generate && npm run build

# Run the web service on container startup. 
# ur currently in app/src, the dist is copied to ./app so u gotta go out a directory

RUN npm run build
CMD [ "node", "./dist/main.js" ] 