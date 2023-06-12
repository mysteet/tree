FROM node:20.2.0

# Setting the working directory in the Docker container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the code
COPY . .

# Exposing the port that the app runs on
EXPOSE 3000

# The command to start the app
CMD [ "npm", "start" ]
