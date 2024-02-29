# Use the official Node.js image as a base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the parent directory into the working directory inside the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port that your frontend runs on
EXPOSE 5173

# Command to run the frontend development server
CMD ["npm", "start"]
