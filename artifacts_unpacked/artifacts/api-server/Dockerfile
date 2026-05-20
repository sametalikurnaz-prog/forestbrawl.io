FROM node:20-alpine
WORKDIR /app

# Copy package manifest and compiled output
COPY package.json ./
COPY dist ./dist
COPY data ./data

ENV NODE_ENV=production

# Install runtime dependencies
RUN npm install --no-audit --no-fund --production || true

EXPOSE 3000

CMD ["node","--enable-source-maps","./dist/index.mjs"]
