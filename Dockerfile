
FROM node:18-alpine AS builder


WORKDIR /usr/src/app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001


COPY package*.json ./


RUN npm ci --only=production && npm cache clean --force


FROM node:18-alpine AS production


RUN apk add --no-cache dumb-init


WORKDIR /usr/src/app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001


COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs . .

RUN rm -rf .git .github tests docs

USER nodeuser

# Expose port
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "index.js"]