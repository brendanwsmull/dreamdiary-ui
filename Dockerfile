# use official node image
FROM node:20

# set workind dir
WORKDIR /app

# copy package and package-lock json files
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of project code
COPY . .

# build front end
RUN npm run build

# expose both front and back end ports
EXPOSE 8080

# start the website
CMD ["node", "express_server.js"]
