---
layout: default
title: Web Operations
nav: nav-lamp.html
---

# <a name="basic"></a>Install
---

    apt-get update
    apt-get upgrade

    which node

    apt-get install nodejs
    which node
    node -v

    which npm

    apt-get install npm
    which npm
    npm -v

    # http://slopjong.de/2012/10/31/how-to-install-the-latest-nodejs-in-ubuntu/
    # http://askubuntu.com/questions/49390/how-do-i-install-the-latest-version-of-node-js

    apt-get install mongodb

## Server

### Setup

    cd ~/projects
    mkdir mean

    touch package.json
    vim package.json

    npm init
    vim package.json

    # https://www.npmjs.org/doc/cli/npm-install.html
    # https://www.npmjs.org/

    npm install

    touch app.js
    vim app.js

    var express = require( 'express' );
    var app = express();

    app.get( '/', function( req, res ) {
      res.send( 'Hello World' );
    });

    app.listen(3000);

    node app.js

    ufw allow 3000

    which nodemon
    npm install -g nodemon

    # Dev only
    nodemon app.js

    # Proxy requests over Apache
    <VirtualHost *:80>
            ServerAdmin box@dovigo.com
            ServerName vm181.webops.mediacube.at

            ProxyRequests Off
            ProxyPass / http://127.0.0.1:3000/ retry=1
            ProxyPassReverse / http://127.0.0.1:3000
            ProxyPass / ws://127.0.0.1:3000/ retry=1
            ProxyPassReverse / ws://127.0.0.1:3000/

            ErrorLog /var/log/apache2/error.log

            # Possible values include: debug, info, notice, warn, error, crit,
            # alert, emerg.
            LogLevel info

            CustomLog /var/log/apache2/access.log combined

    </VirtualHost>

    # cluster.js
    require( 'cluster' );

    if (cluster.isMaster && process.env.NODE_ENV === 'production') {
        for (core = 0; core < maxCores; core++) {
            cluster.fork();
        }
    } else {
        ... your code goes here
    }

    # https://www.npmjs.org/package/mongodb
    # https://www.npmjs.org/package/mongoose
    # Add counter

    # upstart
    # app server
    #
    # description "node.js app server"
    # author      "Hannes Moser"

    start on startup
    stop on shutdown

    script
        export HOME="/root"

        echo $$ > /var/run/app-server.pid
        exec sudo -u www-data /usr/bin/node /home/projects/mean/app.js >> /var/log/app-server.log 2>&1
    end script

    pre-start script
        # Date format same as (new Date()).toISOString() for consistency
        echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> /var/log/app-server.log
    end script

    pre-stop script
        rm /var/run/app-server.pid
        echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> /var/log/app-server.log
    end script

    cd /etc/init
    initctl reload-configuration

### Coninous Integration

#### Tests
#### Jira