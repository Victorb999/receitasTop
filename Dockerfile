# Build stage
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
# Install ALL dependencies (including devDependencies like typescript)
RUN npm install --ignore-scripts

COPY . .
RUN npm run build

# Production stage
FROM node:20-slim

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
# Install ONLY production dependencies and IGNORE postinstall scripts 
# (which would fail because they require typescript/tsc)
RUN npm install --production --ignore-scripts

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist
COPY knexfile.js ./

EXPOSE 3333

# Run migrations and start the server
# We use npx knex because knex is a production dependency
CMD ["sh", "-c", "npx knex migrate:latest --knexfile knexfile.js && npm start"]
