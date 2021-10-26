# Getting base image from DockerHub
FROM ubuntu

# Updating packages
RUN apt-get update

# Installing CURL
RUN apt-get install curl -y

# Downloading Node 10.x
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

# Running Shell Script
RUN bash nodesource_setup.sh

# Installing Node.JS
RUN apt install nodejs -y

# Installing node modules required to run code
RUN npm install

# Exposing TCP Protocol
EXPOSE 3000

#Running NPM Start command to run node application
CMD [ "npm", "start" ]
