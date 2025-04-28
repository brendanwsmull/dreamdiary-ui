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

# expose both front and back end ports
EXPOSE 4000
EXPOSE 5173

# start the website
CMD ["npm", "start"]
