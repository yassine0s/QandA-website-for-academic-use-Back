FROM node:14

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install --silent

# add app
COPY . ./

ENV PORT=8080

EXPOSE 8080

# start app
CMD ["npm", "start"]
