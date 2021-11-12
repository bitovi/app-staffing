#!/bin/bash

#updating repository sources && installing nginx reverse proxy server
apt-get update && apt-get install -y nginx

#deactivating the default host
 unlink /etc/nginx/sites-enabled/default

 touch  /etc/nginx/sites-available/reverse-proxy.conf

#configuring proxy server redirects from port 80 to 3000
 echo """    
    server {
      listen 80;
      listen [::]:80;
      access_log /var/log/nginx/reverse-access.log;
      error_log /var/log/nginx/reverse-error.log;
      root /usr/src/app;
      location / {
        #proxy_pass http://localhost:3000;
        try_files $uri /index.html;
      }
    }
     """ > /etc/nginx/sites-available/reverse-proxy.conf
    



#linking /etc/nginx/sites-available to /etc/nginx/sites-enabled

ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf

