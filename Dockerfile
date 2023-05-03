FROM node:16

WORKDIR /usr/src/ieee_recruitment

COPY package*.json ./
RUN npm install

COPY . .

ARG PORT
EXPOSE ${PORT}

CMD [ "node", "index.js" ]
