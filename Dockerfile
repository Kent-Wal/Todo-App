# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json .

# Install the depenedencies
RUN npm install

# Copy the rest of the application files
# The first period is the current local directory and the second is the location in the docker environment (/app)
COPY . .

# Expose the port that the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "./src/server.js"]