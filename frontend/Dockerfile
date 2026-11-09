# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the project (Vite outputs to the /app/dist folder)
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

# Copy the compiled static files from the build stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration to handle React Router single-page application routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
