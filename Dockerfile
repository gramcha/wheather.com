FROM node:0.10.48
RUN mkdir -p /home/wheather.com/dist/build

COPY *.* /home/wheather.com/
COPY src /home/wheather.com/src
WORKDIR "/home/wheather.com"
RUN npm install
