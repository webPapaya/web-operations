---
layout: default
title: Web Operations
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

Normalerweise bekommen Sie von Ihrem ISP die Nameserver mittels DHCP automatisch mitgeteilt. Im Falle des Falles, können
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
Ein unter Linux sehr verbreitetes Programm zur Organisation von Massenspeicher ist [LVM](http://en.wikipedia.org/wiki/Logical_Volume_Manager).

Eine Funktion von LVM eignet sich dabei hervorragend um Backups des Dateisystems zu bestimmen Zeitpunkten zu erstellen.
Damit können Sie also tatsächlich Ihre Datenbank wieder als einfache Datei betrachten und dementsprechend ein einfaches
Backup des Dateisystems durchführen.

In Szenarien in denen es sich anbietet LVM Snapshots zu verwenden, gilt es auch zu überlegen ob es möglich ist, dies
während des Produktivbetriebs durchzuführen oder etwa zusätzlich eine Replikation der Datenbank zu betreiben und das
Backup an dieser Stelle vorzunehmen.

Eine detailierte Anleitung zur Installation von LVM und Backups von MySQL mit Hilfe von Snapshots finden Sie
[hier](http://www.lullabot.com/blog/article/mysql-backups-using-lvm-snapshots).

## Cronjob
### Crontab
### /etc/cron.d

## Log
### Log Rotate
https://www.digitalocean.com/community/articles/how-to-manage-log-files-with-logrotate-on-ubuntu-12-10

## Upstart
### Am Beispiel node.js

## Proxies
### Proxy requests via Apache zu Node.js server

## Mail

### ISPmail Tutorial(s)
https://workaround.org/ispmail

## Nette Kleinigkeiten
### Figlets

## Images

[backuppc-1]: /img/backuppc-1.png "backuppc"

## Abbrevations

*[ISP]: Internet Service Provider
*[LVM]: Logical Volume Manager