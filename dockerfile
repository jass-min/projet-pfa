# Step 1: Use an official Node.js base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the Next.js app (this will generate the .next folder)
RUN npm run build

# Step 7: Use a lightweight image to serve the built app
FROM node:18-alpine AS production

# Step 8: Set the working directory inside the container
WORKDIR /app

# Step 9: Copy only the necessary files from the previous build stage
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next


# Step 10: Install only production dependencies
RUN npm install --production

# Step 11: Expose the port Next.js will run on
EXPOSE 8002

# Step 12: Set the command to start the Next.js app
CMD ["npm", "start"]
