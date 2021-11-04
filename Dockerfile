
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# get files
COPY ./package.json .
RUN npm build
COPY . .

# expose your ports
EXPOSE 3000

# start it up
CMD [ "npm", "build", "prod" ]
