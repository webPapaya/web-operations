---
layout: default
title: Web Operations
nav: nav-index.html
---

# <a name="basic"></a>Einführung
---

A german language textbook on Web Operations. Developed on github,
published at http://eliias.github.io/web-operations.

## <a name="basic-unix-shell"></a>UNIX-Shell
Die Unix-Shell ist das Werkzeug das Sie benötigen um in die Welt der Server
einzusteigen. Um mit der Arbeit beginnen zu können sollten Sie sich zumindest
einen minimalen Schatz an Shell Kommandos aneignen.


### Dateisystem
#### Beispiele
Gibt eine Liste aus Dateien und Ordnern zurück

``` bash
ls
_config.yml	_layouts	_posts		css		index.html
```

Falls Sie eine Darstellung in Listenform bevorzugen, z.B. aus Übersichtlichkeit.

``` bash
ls -l

-rw-r--r--+ 1 hannesmoser  staff   62 Mar  2 23:32 _config.yml
drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 _layouts
drwxr-xr-x+ 3 hannesmoser  staff  102 Mar  2 23:32 _posts
drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 css
-rw-r--r--+ 1 hannesmoser  staff  291 Mar  2 23:32 index.html
```

Wenn nun auch verstecke Dateien und Ordner in der Liste auftauchen sollen,
benutzen Sie folgende Anweisung.

``` bash
ls -la

drwxr-xr-x+ 8 hannesmoser  staff  272 Mar  2 23:32 .
drwx------+ 9 hannesmoser  staff  306 Mar  2 23:33 ..
-rw-r--r--+ 1 hannesmoser  staff    5 Mar  2 23:32 .gitignore
-rw-r--r--+ 1 hannesmoser  staff   62 Mar  2 23:32 _config.yml
drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 _layouts
drwxr-xr-x+ 3 hannesmoser  staff  102 Mar  2 23:32 _posts
drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 css
-rw-r--r--+ 1 hannesmoser  staff  291 Mar  2 23:32 index.html
```

### Besitzer und Gruppe
#### Beispiele
Nun kommen wir zu einigen sehr wichtigen Befehlen. Diese betreffen die Rechte
von Dateien, deren Besitz und wie dieser geändert werden kann.

Folgende Ausgabe des Befehls *ls -la* zeigt eine *.gitignore* Datei die den
Besitzer *hannesmoser* und die Gruppe *staff* zugeordnet hat.

``` bash
-rw-r--r--+ 1 user1  staff    5 Mar  2 23:32 .gitignore
```

Folgender Befehl ändert den Besitzer der Datei.

``` bash
chown neueruser .gitignore
```

``` bash
-rw-r--r--+ 1 neueruser  staff    5 Mar  2 23:32 .gitignore
```

Falls Sie die Gruppe zusätzlich zum Besitzer ändern wollen, funktioniert dies wie folgt.

``` bash
chown neueruser:neuegruppe .gitignore

-rw-r--r--+ 1 neueruser  neuegruppe    5 Mar  2 23:32 .gitignore
```

Sie können auch nur die Gruppe alleine ändern.

``` bash
chown :neuegruppe .gitignore

-rw-r--r--+ 1 user1  neuegruppe    5 Mar  2 23:32 .gitignore
``

### Berechtigungen
#### Beispiele

Nun zu den Berechtigungen einer Datei.

``` bash
chmod 700 .gitignore

-rwx------+ 1 hannesmoser  staff    5 Mar  2 23:32 .gitignore
```

Die oktale Angabe von Berechtigungen kann wie folgt vorgenommen werden.


| Code          | Beschreibung                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| 644           | Der Eigentümer darf lesen und schreiben, alle anderen nur lesen. (6 = 4 + 2)                               |
| 744           | Der Eigentümer darf lesen, schreiben und ausführen, alle anderen nur lesen. (7 = 4 + 2 + 1)                |
| 660           | Eigentümer und Gruppe dürfen lesen und schreiben, der Rest nichts.                                         |
| 4755          | Alle dürfen lesen und ausführen, der Eigentümer auch schreiben. Zusätzlich wird das SetUID-Bit gesetzt.    |

Mehr Informationen zum SetUID-Bit finden Sie hier http://de.wikipedia.org/wiki/Setuid.

Es gibt jedoch noch eine wesentlich elegantere und auch besser lesbare Variante
um Berechtigungen zu setzen.

``` bash
chmod ugo-rwx,ug+rwX,o+r .gitignore
```

Die Syntax ist sehr einfach und wenn man erst einmal die Abkürzungen kennt, auch
ganz und gar logisch.

| Alias     | Beschreibung                                      |
| --------- | ------------------------------------------------- |
| u         | user (Besitzer)                                   |
| g         | group (Gruppe)                                    |
| o         | others (Alle anderen)                             |

| Privilege | Beschreibung                                      |
| --------- | ------------------------------------------------- |
| r         | read                                              |
| w         | write                                             |
| x         | execute                                           |

Mittels *chmod* kann ich nun als Rechte für User, Gruppe und Andere hinzufügen **+**
oder auch wieder wegnehmen **-**.
In obigem Beispiel kommt zusätzlich noch eine Variation vor die es sich lohnt
näher zu betrachten.

``` bash
ug+rwX
```

Das große **X** bedeutet in diesem Fall, dass für alle Ordner ein Executable Bit
gesetzt werden soll, damit diese auch gelesen (geöffnet) werden können.

Weitere wichtige Informationen z.B. zu dem [Sticky Bit](http://en.wikipedia.org/wiki/Sticky_bit)
gibt es in jeder *NIX Doku zu finden.

## <a name="basic-sudo"></a>sudo

Ein Befehl den Sie öfter verwenden werden ist **sudo**. Mit Hilfe von **sudo** können sie auf unixartigen
Betriebssystemen (Linux, Mac), Befehle im Kontext eines anderen Nutzers ausführen (**s**ubstitute **u**ser **do**).

Es gilt als gute Praxis, sich nicht mit Hilfe des *superuser* **root** anzumelden. Bevorzugt wird die Nutzung eines
eigenen Benutzers (z.B. webop) unter der Zuhilfenahme von sudo.

### Beispiele

``` bash
# Restart Apache
sudo service apache2 restart
```

## <a name="basic-pakete"></a>Pakete
### Aptitude
> Das Computerprogramm aptitude ist ein Frontend für das Advanced Packaging Tool (APT). Es zeigt eine Liste von Software-Paketen an und erlaubt dem Benutzer, interaktiv Pakete zu verwalten. Ursprünglich wurde es für die Debian GNU/Linux-Distribution erstellt, taucht aber auch in RPM-basierten Distributionen, wie zum Beispiel Conectiva, auf.

Kurz gesagt, wir verwenden *Aptitude* um Software auf unserem Server zu verwalten.

#### Beispiele

Install

``` bash
apt-get install ssh
apt-get install apache2
apt-get install php5
apt-get isntall mysql-server
apt-get install php5-mysql
apt-get install php5-intl
apt-get install git
```

Remove

``` bash
apt-get remove php5
apt-get remove mysql
apt-get remove apache2
```

Update aller Paketrepositories

``` bash
apt-get update
```

Upgrade aller Pakete

``` bash
apt-get upgrade
```

#### Korrupte Pakete reparieren

Wenn gar nichts mehr geht, kann man sich mit folgenden Befehlen abhelfen.
Beachten Sie, dass dabei alle Konfigurationen der betroffenen Pakete verlorengehen.

``` bash
apt-get remove --purge mysql-server mysql-client mysql-common
apt-get install --reinstall mysql-server mysql-client mysql-common

apt-get remove --purge apache2.2-common
apt-get install --reinstall apache2

apt-get remove --purge php*
apt-get install --reinstall php5

apt-get install --reinstall libapache2-mod-php5

apt-get install --reinstall phpmyadmin
```

#### Upgrade the system

Ubuntu releases a new LTS (Long Time Support) version of their operating system from time to time.
If you want to upgrade a whole system you have to take care of several steps:

* Backup everything
* If you SSH to your server, your connection might get cut (check firewall for alternative SSH port)
* Be aware that some software might not be available anymore after the upgrade
* Expect downtime for your services
* If you can do a fresh install -> DO IT!
* Otherwise use the following command to upgrade:

``` bash
do-release-upgrade
```

## <a name="basic-ssh"></a>SSH

> Secure Shell oder SSH bezeichnet sowohl ein Netzwerkprotokoll als auch entsprechende Programme, mit deren Hilfe man auf eine sichere Art und Weise eine verschlüsselte Netzwerkverbindung mit einem entfernten Gerät herstellen kann.

Wir nutzen SSH für die Authentifzierung, für Down- und Upload von Dateien, sowie
für die entfernte Befehlseingabe.

### Authentifizierung
Für die Anmeldung an unserem entfernten System verwenden wir ein Verfahren das
sich *Public Key Based Authentication* nennt. Damit dies funktioniert, benötigen
wir ein Tool, dass es uns erlaub ein Schlüsselpaar zu erzeugen, dass wir später
für die Authentifizierung nutzen werden.

Auf *NIX Systemen können Sie davon ausgehen, dass dieses Tool bereits in der
Form von *ssh-keygen* vorhanden ist. Dementsprechend einfach gestaltet sich die
Erzeugung des Schlüsselpaars.

``` bash
ssh-keygen
```

Die folgende Eingabeaufforderung kann wie folgt aussehen.

``` bash
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/username/.ssh/id_rsa):
```

In Normalfall werden die Schlüssel im Verzeichnis *.ssh* abgelegt und zwar
mit den Namen *id_rsa* und *id_rsa.pub*. Wir wollen in unserem Fall den
Schlüssel nicht mit einem Passwort schützen. Dies würde bei der Authentifzierung
zur einer Eingabeaufforerung für das Passwort führen und genau dies wollen
wir vermeiden.`

``` bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Die gezeigte Eingabeaufforderung kann daher mit 2 x *leerer Eingabe* quittiert werden.

**ACHTUNG Windows Nutzer!**

Wenn Sie die Git Installation von http://git-scm.com nutzen, können Sie via
*Git Bash* auch *ssh-keygen* nutzen. Alternativ müssen sie auf Tools wie
[PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
zurückgreifen.

## <a name="basic-copy"></a>Copy & Move

### Lokal

Ein sehr häufig genutzter Befehl ist das Kopieren und Bewegen von Dateien und Ordner innerhalb eines Dateisystems.

#### Beispiele

``` bash
# Copies a file
cp test.html new.html

# Copies a directory
cp -R ./dirname ./newdir

# Moves a file
mv test.html new.html

# Moves a directory
mv ./dirname ./newdir
```

### scp

#### Beispiele

``` bash
# Copies a local file to your server
scp test.html webop@vm181.webops.mediacube.at:/yourdir/new.html
```

### rsync

``` bash
# Backup your projects directory to server
rsync -a ~/Documents/projects webop@vm181.webops.mediacube.at:/backups/
```

## <a name="basic-dns"></a>DNS

### Lokale hosts Datei

Diese Datei finden Sie im Normallfall unter */etc/hosts*. Dort können Sie ohne großen Aufwand, DNS Mappings erstellen,
die sich auf ihr gesamtes lokales System auswirken. Sie könnten damit auch *google.com* betreiben.

#### Beispiel

``` bash
# Opens hosts file in vim editor
sudo vim /etc/hosts

# google.com is on my machine now!
127.0.0.1 google.com
```

Nun können Sie in einen beliebigen Browser Ihres Betriebssystems die Adresse *google.com* eintippen und Sie werden das
sehen was Sie auf Ihrem Webserver konfiguriert haben (z.B. It works).

### Eigener DNS Server

In manchen Fällen und vor allem in größeren Firmennetzwerken ist es üblich einen eigenen DNS Server zu betreiben, der sich
um die Verwaltung der internen Adressräume kümmert. Wenn Sie zum Beispiel in einem Entwicklungsteam mit
mehreren Personen an einer Webapplikation arbeiten, könnte es sein, dass Sie sich gemeinsam mit Ihren Kollegen
ein *staging* System teilen.

``` bash
# Address of the staging system
http://app.stage.dev
```

Um Ihnen und Ihren Kollegen die Arbeit zu erleichtern, wird Ihnen der Administrator des Netzwerkes, entweder automatisiert
via DHCP oder auch per Installationsanleitung mitteilen, wie Sie den DNS Server Ihrer Firma erreichen können. Dieser
DNS Server wird darauf von Ihrem Gerät kontaktiert um namentliche Adressen in IP Adressen umzuwandeln.

#### Beispiele

``` bash
# Staging again
http://app.stage.dev --> 192.186.123.11
http://app2.stage.dev --> 192.186.123.12
```

Fall Sie selbst so ein System betreiben möchten, gibt es in der Linuxwelt ein sehr weit verbreitetes Programm namens
**BIND9**. Eine Anleitung um BIND9 unter Ubuntu zu betreiben finden Sie [hier](https://help.ubuntu.com/community/BIND9ServerHowto).

### Globale DNS Server

Normalerweise bekommen Sie von Ihrem <abbr title="Internet Service Provider">ISP</abbr> die Nameserver mittels DHCP automatisch mitgeteilt. Im Falle des Falles, können
Sie jedoch jederzeit selbst bestimmen woher Sie Ihre DNS Auflösung beziehen wollen. Einen der bekanntesten DNS Server
wird von Google betrieben.

``` bash
# Google Nameserver
8.8.8.8
```

## <a name="basic-firewall"></a>Firewall

### UFW

Unter Ubuntu gibt es eine einfache Möglichkeit die Firewall des Systems zu verwalten. **ufw** ist ein Programm, dass
es Ihnen erlaubt die IPTables Konfiguration des Systems mit einem Satz einfach zu verstehender Befehle auszuführen.

Mehr zu **ufw** erfahren sie [hier](http://wiki.ubuntuusers.de/ufw).

Was ufw so einfach macht, ist die relativ natürliche Kommandostruktur. So können Sie Ports mit Hilfe von bekannten
Aliasnamen öffnen (http, https, mysql, imap, ...).

#### Beispiele

```bash
# Current ufw status and list of rules
ufw status

# Starts ufw daemon
ufw enable

# Add new rule (allow incoming HTTP connections -> port 80)
ufw allow http

# Remove an existing rule
ufw delete allow http

# Add arbitrary port
ufw allow 443

# Allow all connections from IP
ufw allow from x.x.x.x
```

### Iptables

Iptables haben eine höhere Lernkurve, sind dafür praktisch auf jeder Linux Distribution zu finden.
Eine Einführung zu Iptables finden Sie [hier](https://help.ubuntu.com/community/IptablesHowTo).

#### Beispiele

``` bash
# List of rules
iptables -L

# Open port for incoming connections (SSH)
iptables -A INPUT -p tcp --dport ssh -j ACCEPT

# Open port for incoming connections (HTTP)
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

## <a name="basic-backup"></a>Backup

### System backups with rsync (and backuppc)

backuppc ist ein in Perl geschriebenes Programm, dass sich hervorragend dazu eignet inkrementelle und vollständige Backups
Ihres Filesystems zu machen. In Kombination mit *rsync* ergibt sich daraus die Möglichkeit, ein Backup/Restore System
zu implementieren, dass es Ihnen erlaubt jederzeit auf einen vorherigen Stand Ihres Dateisystems zu wechseln.
Dies funktioniert auch für einzelne Ordner und Dateien.

backuppc liefert dafür eine vollständige Bedienoberfläche, die Sie über eine Webadresse erreichen können.

![backuppc][backuppc-1]

Eine komplette Anleitung zur Installation und Inbetriebnahme von backuppc finden Sie
[hier](http://askubuntu.com/questions/191991/how-to-configure-backuppc-in-ubuntu-12-04).

### Database

Eine sich im Produktivbetreib befindliche Datenbank zu sichern ist keine sehr leichte Aufgabe.
Sie müssen dabei einige Dinge beachten um den Datenstand nicht zu gefährden. Bei fast allen gängigen SQL Datenbanken
gibt es keine einfache und sichere Möglichkeit, die Datenbanken als eine Sammlung von Dateien zu verstehen und diese
einfach wegzukopieren.

Im Regelfall versucht man einen Dump der kompletten Datenbank zu erzeugen, der aus einer Liste von SQL Befehlen besteht.

#### Run backup
```bash
# Backup all databases from localhost
mysqldump --all-databases -u user -p -h 127.0.0.1 > backup.sql
```

#### Example Output
```sql
--
-- Current Database: `webops`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `webops` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `webops`;
```

Dieses Kommando kann man entweder selber regelmäßig ausführen, oder wesentlich besser, automatisiert von
einem Job erledigen lassen.
Weiters ist noch zu überlegen, wie häufig das Backup und zu welcher Uhrzeit es durchgeführt
werden soll. So ist es meist eine gute Idee eine relativ ruhige Zeit abzuwarten (Ruhig -> Der Zeitpunkt mit den relativ gesehen geringsten Zugriffszahlen).

#### automysqlbackup

Natürlich hat sich darüber auch schon jemand Gedanken gemacht und es gibt ein kleines Script, dass all diese
Überlegungen in eine kompakte Lösung vereint.

*automysqlbackup* ist ein kleines Programm, dass Sie [hier](http://sourceforge.net/projects/automysqlbackup/) finden können.

##### Konfiguration

``` bash
# Create or edit host specific config file
vim /etc/automysqlbackup/host.conf
```

``` bash
#version=3.0_rc2
# DONT'T REMOVE THE PREVIOUS VERSION LINE!
#
# Uncomment to change the default values (shown after =)
# WARNING:
# This is not true for UMASK, CONFIG_prebackup and CONFIG_postbackup!!!
#
# Default values are stored in the script itself. Declarations in
# /etc/automysqlbackup/automysqlbackup.conf will overwrite them. The
# declarations in here will supersede all other.

# Edit $PATH if mysql and mysqldump are not located in /usr/local/bin:/usr/bin:/bin:/usr/local/mysql/bin
#PATH=${PATH}:FULL_PATH_TO_YOUR_DIR_CONTAINING_MYSQL:FULL_PATH_TO_YOUR_DIR_CONTAINING_MYSQLDUMP

# Basic Settings

# Username to access the MySQL server e.g. dbuser
CONFIG_mysql_dump_username='root'

# Password to access the MySQL server e.g. password
CONFIG_mysql_dump_password='supersecretpassword'

# Host name (or IP address) of MySQL server e.g localhost
CONFIG_mysql_dump_host='localhost'
```

#### LVM Snapshots

Für professionelle und vor allem größere Anwendungen empfiehlt es sich, dem Problem eine Ebene tiefer zu anzugehen.
Ein unter Linux sehr verbreitetes Programm zur Organisation von Massenspeicher ist [<abbr title="Logical Volume Manager">LVM</abbr>](http://en.wikipedia.org/wiki/Logical_Volume_Manager).

Eine Funktion von LVM eignet sich dabei hervorragend um Backups des Dateisystems zu bestimmen Zeitpunkten zu erstellen.
Damit können Sie also tatsächlich Ihre Datenbank wieder als einfache Datei betrachten und dementsprechend ein einfaches
Backup des Dateisystems durchführen.

In Szenarien in denen es sich anbietet LVM Snapshots zu verwenden, gilt es auch zu überlegen ob es möglich ist, dies
während des Produktivbetriebs durchzuführen oder etwa zusätzlich eine Replikation der Datenbank zu betreiben und das
Backup an dieser Stelle vorzunehmen.

Eine detailierte Anleitung zur Installation von LVM und Backups von MySQL mit Hilfe von Snapshots finden Sie
[hier](http://www.lullabot.com/blog/article/mysql-backups-using-lvm-snapshots).

## <a name="basic-cron"></a>Cron

> Cron is a system daemon used to execute desired tasks (in the background) at designated times.

Eine genaue Einführung in Cron finden Sie [hier](https://help.ubuntu.com/community/CronHowto).
Sie können Cron nutzen um Aufgaben zu periodischen Zeitpunkten zu erledigen. Ein bekanntes Beispiel sind etwa
Nutzerstatistiken. Sie können in vielen Fällen keine Statistik in Echtzeit erzeugen und generieren daher zu bestimmten
Zeitpunkten eine Zusammenfassung, die von allen Nutzern angesehen werden kann.

### Schedule

All common cron implementations are using the same pattern to schedule a task.

```
# * * * * *  command to execute
# ┬ ┬ ┬ ┬ ┬
# │ │ │ │ │
# │ │ │ │ │
# │ │ │ │ └───── day of week (0 - 7) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday)
# │ │ │ └────────── month (1 - 12)
# │ │ └─────────────── day of month (1 - 31)
# │ └──────────────────── hour (0 - 23)
# └───────────────────────── min (0 - 59)
```

### Crontab

The crontab is the classic location to put cron tasks. On Ubuntu this is not the default location for crontabs
anymore and you should use the */etc/cron.d/* directory to put your tasks. Anyway the crontab does work the same
as all cron definitions work. You add a schedule and a task to the file.

``` bash
crontab -e
```

``` bash
# Execute cron tasks of app project every minute
* * * * * /usr/bin/php -f /home/www/projects/app/cron.php
```

### cron.d (anacron)

A typical *cron.d* file consists of 3 parts. The scheduler, the user which should execute the script and the path
to the executable with all options.

``` bash
0 1 * * * webop /usr/bin/automysqlbackup /etc/automysqlbackup/host.conf
```

#### Special strings

Someone may use special strings instead of the **m h dom mon dow** format.

``` bash
@daily ntpdate -s time.nist.gov
```

##### List of strings

| String    | Description                                       |
| --------- | ------------------------------------------------- |
| @reboot   | Run once on startup                               |
| @yearly   | Run once a year, "0 0 1 1 *"                      |
| @annually | alias for @yearly                                 |
| @monthly  | Run once a month, "0 0 1 * *"                     |
| @weekly   | Run once a week, "0 0 * * 0"                      |
| @daily    | Run once a day, "0 0 * * *"                       |
| @midnight | alias for @daily                                  |
| @hourly   | Run once an hour, "0 * * * *"                     |

#### cron.(hourly|daily|weekly|daily)

There are also predefined directories within */etc* that someone might use to execute tasks periodically.
You can put a shell script into */etc/cron.daily* and it will be executed once a day.

As of Ubuntu 12.04, the execution of those scripts is controlled by the */etc/crontab* file.

``` bash
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
```

## <a name="basic-log"></a>Log

### logrotate.d

``` bash
# GitLab logrotate settings
# based on: http://stackoverflow.com/a/4883967
/home/git/gitlab/log/*.log {
    weekly
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    copytruncate
}

/home/git/gitlab-shell/gitlab-shell.log {
    weekly
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    copytruncate
}
```
https://www.digitalocean.com/community/articles/how-to-manage-log-files-with-logrotate-on-ubuntu-12-10

## <a name="basic-upstart"></a>Upstart

### Beispiel

``` bash
# chess server
#
# description "node.js chess server"
# author      "Hannes Moser"

start on startup
stop on shutdown

script
    echo $$ > /var/run/chess-server.pid
    exec sudo -u www-data /usr/bin/node /var/lib/jenkins/jobs/chess/workspace/build/app.js >> /var/log/chess-server.log 2>&1
end script

pre-start script
    # Date format same as (new Date()).toISOString() for consistency
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> /var/log/chess-server.log
end script

pre-stop script
    rm /var/run/chess-server.pid
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> /var/log/chess-server.log
end script
```

## <a name="basic-proxies"></a>Proxies

### Beispiel

``` bash
<VirtualHost *:80>
    ServerAdmin webop@vm181.webops.mediacube.at
    ServerName vm181.webops.mediacube.at

    ProxyPass         / http://localhost:3000/
    ProxyPassReverse  / http://localhost:3000/
    ProxyRequests     Off

    ErrorLog /var/log/apache2/error.log

    LogLevel warn

    CustomLog /var/log/apache2/ssl_access.log combined
</VirtualHost>
```

## <a name="basic-mail"></a>Mail

### ISPmail Tutorial(s)
https://workaround.org/ispmail

## <a name="basic-utilities"></a>Utilities

### top

Gives you system stats and lists all processes.

``` bash
top
```

### Figlets

Install the figlet package.

``` bash
apt-get install figlet
```

Create a new figlet.

``` bash
# Create figlet
figlet vm181.webops
```

Select and copy the output to use it somewhere else.

```
                 _  ___  _              _
__   ___ __ ___ / |( _ )/ |_      _____| |__   ___  _ __  ___
\ \ / / '_ ` _ \| |/ _ \| \ \ /\ / / _ \ '_ \ / _ \| '_ \/ __|
 \ V /| | | | | | | (_) | |\ V  V /  __/ |_) | (_) | |_) \__ \
  \_/ |_| |_| |_|_|\___/|_(_)_/\_/ \___|_.__/ \___/| .__/|___/
                                                   |_|
```

### Message of the day

Create a new file.

``` bash
vim /etc/motd.tail
```

Write something and save the file.

``` bash
This is the message of the day.
```

Now quit the terminal session and login again.
You should see some text with system metadata and your message appended at the end of the block.

### tail

A nice program you can use to read frequently updated logs during a server session.

``` bash
# Get last lines of log and all newly added
tail -f /var/log/apache2/error.log
```

``` bash
# Get the last 100 lines and all newly added
tail -n 100 -f /var/log/apache2/error.log
```

[backuppc-1]: img/backuppc-1.png "backuppc"


*[ISP]:     Internet Service Provider
*[LVM]:     Logical Volume Manager
