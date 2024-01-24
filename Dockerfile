# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

# Create a non-root user
RUN addgroup app && adduser -S -G app app

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Change ownership of the working directory to the non-root user
RUN chown -R app:app .

# Switch to the non-root user
USER app

# Install npm packages
RUN npm install

# Copy the rest of the source files into the image
COPY . .

# Expose the port that the application listens on
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]
