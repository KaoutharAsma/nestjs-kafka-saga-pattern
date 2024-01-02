ARG NODEJS_DOCKER_IMAGE

FROM ${NODEJS_DOCKER_IMAGE} 

WORKDIR /app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

CMD [ "yarn", "start" ]