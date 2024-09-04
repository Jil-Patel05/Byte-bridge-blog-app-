# FROM node:16-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["npm","run","start"]

# # Backend Dockerfile
# FROM node:18-alpine AS backend

# WORKDIR /app/backend

# COPY backend/package*.json ./
# RUN npm install --production

# COPY backend/ .

# EXPOSE 5000
# CMD ["node", "server.js"]

# # Frontend Dockerfile
# FROM node:18-alpine AS build-frontend

# WORKDIR /app/frontend

# # Copy package.json and install dependencies
# COPY frontend/package*.json ./
# RUN npm install

# # Copy all frontend source files
# COPY frontend/ .


# # Build the React app
# RUN npm run build


# # Production image
# FROM nginx:stable-alpine AS production

# COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]




# Use the Node.js image to build the frontend and backend
FROM node:18-alpine AS build

# Set the working directory for the build
WORKDIR /app

# Copy both backend and frontend package.json and install dependencies
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install --production --prefix backend
RUN npm install --prefix frontend

# Copy the backend and frontend source files
COPY backend ./backend
COPY frontend ./frontend

# Build the frontend
RUN npm run build --prefix frontend

# Prepare production image
FROM node:18-alpine AS production

# Set the working directory for the production
WORKDIR /app

# Copy the backend files
COPY --from=build /app/backend ./

# Copy the frontend build files to the backend's public folder
COPY --from=build /app/frontend/build ./public

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
