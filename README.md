This project is a simple Currency Converter web application deployed using Docker containers on two separate web servers and load-balanced using HAProxy. The app allows users to convert between different currencies using live exchange rates fetched from an external API.

To build the Docker image locally, I used the following command in the project directory:
docker build -t currency-converter:v1 .
Once built, I tagged the image and pushed it to Docker Hub under my account:
docker tag currency-converter:v1 kylealu/currency-converter:v1
docker push kylealu/currency-converter:v1
The Docker Hub repository for the application is: https://hub.docker.com/r/kylealu/currency-converter, and the main tag used is v1.

On each web server (Web01 and Web02), I pulled the image and ran it with this command:
docker run -d -p 80:80 --name app kylealu/currency-converter:v1
This exposed the app on port 80 of each server, making them accessible via their respective IP addresses.

For load balancing, I used HAProxy. I pulled the HAProxy image and created a custom configuration that routes traffic in a round-robin manner between the two backend servers. The relevant HAProxy configuration snippet looks like this:

pgsql
Copier
Modifier
frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web01 <WEB01_IP>:80 check
    server web02 <WEB02_IP>:80 check
I copied this configuration into the HAProxy container and reloaded it using docker restart

To verify the load balancer worked correctly, I accessed the public IP of the HAProxy container multiple times in the browser and observed that the responses alternated between the two servers. I also monitored the logs on each web server to confirm that traffic was being evenly distributed.
