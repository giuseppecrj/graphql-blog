# Set the base image to Ubuntu
FROM node:6.10.1

# File Author / Maintainer
MAINTAINER Giuseppe Rodriguez, g@herman-scheer.com

# Install Node.js and other dependencies
RUN apt-get update \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install yarn
RUN npm i -g yarn pm2

COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn install

RUN mkdir -p /src && \
    cp -a /tmp/node_modules /src/

WORKDIR /src
COPY . /src

EXPOSE 8443
CMD ["pm2-docker", "--no-daemon", "--env", "production", "pm2.json"]
