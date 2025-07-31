# Use a basic web server image
FROM nginx:alpine

# Copy everything from your current folder to the web server folder
COPY . /usr/share/nginx/html

# Expose port 80 so we can visit the app
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
