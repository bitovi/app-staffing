#FROM beevelop/nodejs-python

FROM node:14
# Create app directory
WORKDIR /usr/src/app

# get files
COPY . .

# install dependencies
RUN npm install

# expose your ports
EXPOSE 3000

# start it up
CMD [ "npm", "run", "dev" ]
