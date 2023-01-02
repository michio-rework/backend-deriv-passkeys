###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 As development

WORKDIR /usr/src/app

COPY --chown=node:node package-lock.json ./

COPY --chown=node:node . .
RUN npm install

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build

WORKDIR /usr/src/app

COPY --chown=node:node package-lock.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm install --omit=dev

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app


COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma .
COPY --chown=node:node --from=build /usr/src/app/start.sh .

RUN chmod +x ./start.sh
RUN npm i -g prisma

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV DB_PASSWORD=postgres
ENV DB_USERNAME=postgres
ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432
ENV DB_DATABASE_NAME=backend
ENV DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWORD}@${POSTGRES_PORT}:5432/backend?${DB_DATABASE_NAME}=public
ENV SECRET=mycustomuselongsecret
ENV EXPIRATION="60 days"
ENV RELYING_PARTY_NAME="Deriv POC PASSKEYS"
ENV RELYING_PARTY_ID=regentmarkets
ENV ORIGIN=https://test-passkeys.regentmarkets.com
ENV PORT=3000

ENTRYPOINT [ "sh", "/usr/src/app/start.sh" ]