---
layout: default
title: Web Operations
nav: nav-rails.html
---

# <a name="basic"></a>Packages
---

https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-precise-pangolin-with-rvm

# Ruby with RVM

``` bash
# Update system
apt-get update

# Get curl
apt-get install curl

# Install RVM + Ruby (ATTENTION! -> as user, not with sudo)
\curl -sSL https://get.rvm.io | bash -s stable --ruby

source ~/.rvm/scripts/rvm

rvm requirements

rvm install ruby

rvm use ruby --default

rvm rubygems current
```

## Apache + Rails

``` bash
# Build Tools
apt-get install build-essential

# Apache dev headers
apt-get install apache2-prefork-dev

# CURL with dev headers
apt-get install libcurl4-openssl-dev

# Passenger
gem install passenger

# Build
passenger-install-apache2-module

# Read the instructions carefully
```

## Create RAILS app

``` bash
cd ~/projects
rails new ./ror
```

## Apache + Rails (Reverse Proxy)

``` bash
# Start Rails
rails server

# Proxy config
<VirtualHost *:80>
        ServerAdmin hmoser.lba@fh-salzburg.ac.at
        ServerName vm199.webops.mediacube.at

        ProxyRequests Off
        ProxyPass /app http://127.0.0.1:3000/ retry=1
        ProxyPassReverse /app http://127.0.0.1:3000

</VirtualHost>

# Reload apache config
service apache2 reload
```

## Apache Module passenger

``` bash
cd /etc/apache2/mods-available/
touch passenger.conf
touch passenger.load

vim passenger.conf
<IfModule mod_passenger.c>
    PassengerRoot /home/webop/.rvm/gems/ruby-2.1.1/gems/passenger-4.0.41
    PassengerDefaultRuby /home/webop/.rvm/gems/ruby-2.1.1/wrappers/ruby
</IfModule>

vim passenger.load
LoadModule passenger_module /home/webop/.rvm/gems/ruby-2.1.1/gems/passenger-4.0.41/buildout/apache2/mod_passenger.so

a2enmod passenger

service apache2 restart
```

# Apache VHost

``` bash
<VirtualHost *:80>
        ServerAdmin hmoser.lba@fh-salzburg.ac.at
        ServerName vm199.webops.mediacube.at

        DocumentRoot /home/webop/projects/ror/public # Public is IMPORTANT!
        <Directory /home/webop/projects/ror/pubic>
                AllowOverride All
                Options -MultiViews
        </Directory>

</VirtualHost>
```

``` bash
service apache2 restart
```