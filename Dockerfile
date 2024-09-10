# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder

WORKDIR /app

ARG PUBLIC_API_BASE_URL
ARG NODE_ENV
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

RUN npm i @rollup/rollup-linux-x64-musl
RUN npm i

COPY . .

RUN npm run build

FROM scratch as binary
COPY --from=builder /app/dist/ /
