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

    ls

    _config.yml	_layouts	_posts		css		index.html

Falls Sie eine Darstellung in Listenform bevorzugen, z.B. aus Übersichtlichkeit.

    ls -l

    -rw-r--r--+ 1 hannesmoser  staff   62 Mar  2 23:32 _config.yml
    drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 _layouts
    drwxr-xr-x+ 3 hannesmoser  staff  102 Mar  2 23:32 _posts
    drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 css
    -rw-r--r--+ 1 hannesmoser  staff  291 Mar  2 23:32 index.html

Wenn nun auch verstecke Dateien und Ordner in der Liste auftauchen sollen,
benutzen Sie folgende Anweisung.

    ls -la

    drwxr-xr-x+ 8 hannesmoser  staff  272 Mar  2 23:32 .
    drwx------+ 9 hannesmoser  staff  306 Mar  2 23:33 ..
    -rw-r--r--+ 1 hannesmoser  staff    5 Mar  2 23:32 .gitignore
    -rw-r--r--+ 1 hannesmoser  staff   62 Mar  2 23:32 _config.yml
    drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 _layouts
    drwxr-xr-x+ 3 hannesmoser  staff  102 Mar  2 23:32 _posts
    drwxr-xr-x+ 4 hannesmoser  staff  136 Mar  2 23:32 css
    -rw-r--r--+ 1 hannesmoser  staff  291 Mar  2 23:32 index.html

### Besitzer und Gruppe
#### Beispiele
Nun kommen wir zu einigen sehr wichtigen Befehlen. Diese betreffen die Rechte
von Dateien, deren Besitz und wie dieser geändert werden kann.

Folgende Ausgabe des Befehls *ls -la* zeigt eine *.gitignore* Datei die den
Besitzer *hannesmoser* und die Gruppe *staff* zugeordnet hat.

    -rw-r--r--+ 1 user1  staff    5 Mar  2 23:32 .gitignore

Folgender Befehl ändert den Besitzer der Datei.

    chown neueruser .gitignore

    -rw-r--r--+ 1 neueruser  staff    5 Mar  2 23:32 .gitignore

Falls Sie die Gruppe zusätzlich zum Besitzer ändern wollen, funktioniert dies wie folgt.

    chown neueruser:neuegruppe .gitignore

    -rw-r--r--+ 1 neueruser  neuegruppe    5 Mar  2 23:32 .gitignore

Sie können auch nur die Gruppe alleine ändern.

    chown :neuegruppe .gitignore

    -rw-r--r--+ 1 user1  neuegruppe    5 Mar  2 23:32 .gitignore

### Berechtigungen
#### Beispiele

Nun zu den Berechtigungen einer Datei.

    chmod 700 .gitignore

    -rwx------+ 1 hannesmoser  staff    5 Mar  2 23:32 .gitignore

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

    chmod ugo-rwx,ug+rwX,o+r .gitignore

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

    ug+rwX

Das große **X** bedeutet in diesem Fall, dass für alle Ordner ein Executable Bit
gesetzt werden soll, damit diese auch gelesen (geöffnet) werden können.

Weitere wichtige Informationen z.B. zu dem [Sticky Bit](http://en.wikipedia.org/wiki/Sticky_bit)
gibt es in jeder *NIX Doku zu finden.

## <a name="basic-superuser"></a>Superuser
http://wiki.ubuntuusers.de/sudo

## <a name="basic-pakete"></a>Pakete
### Aptitude
> Das Computerprogramm aptitude ist ein Frontend für das Advanced Packaging Tool (APT). Es zeigt eine Liste von Software-Paketen an und erlaubt dem Benutzer, interaktiv Pakete zu verwalten. Ursprünglich wurde es für die Debian GNU/Linux-Distribution erstellt, taucht aber auch in RPM-basierten Distributionen, wie zum Beispiel Conectiva, auf.

Kurz gesagt, wir verwenden *Aptitude* um Software auf unserem Server zu verwalten.

#### Beispiele

Install

    apt-get install ssh
    apt-get install apache2
    apt-get install php5
    apt-get isntall mysql-server
    apt-get install php5-mysql
    apt-get install php5-intl
    apt-get install git

Remove

    apt-get remove php5
    apt-get remove mysql
    apt-get remove apache2

Update aller Paketrepositories

    apt-get update

Upgrade aller Pakete

    apt-get upgrade


#### Korrupte Pakete reparieren

Wenn gar nichts mehr geht, kann man sich mit folgenden Befehlen abhelfen.
Beachten Sie, dass dabei alle Konfigurationen der betroffenen Pakete verlorengehen.

    apt-get remove --purge mysql-server mysql-client mysql-common
    apt-get install --reinstall mysql-server mysql-client mysql-common

    apt-get remove --purge apache2.2-common
    apt-get install --reinstall apache2

    apt-get remove --purge php*
    apt-get install --reinstall php5

    apt-get install --reinstall libapache2-mod-php5

    apt-get install --reinstall phpmyadmin


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

    ssh-keygen

Die folgende Eingabeaufforderung kann wie folgt aussehen.

    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/username/.ssh/id_rsa):

In Normalfall werden die Schlüssel im Verzeichnis *.ssh* abgelegt und zwar
mit den Namen *id_rsa* und *id_rsa.pub*. Wir wollen in unserem Fall den
Schlüssel nicht mit einem Passwort schützen. Dies würde bei der Authentifzierung
zur einer Eingabeaufforerung für das Passwort führen und genau dies wollen
wir vermeiden.

    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:

Die gezeigte Eingabeaufforderung kann daher mit 2 x *leerer Eingabe* quittiert werden.

Achtung Windows Nutzer!

Wenn Sie die Git Installation von http://git-scm.com nutzen, können Sie via
*Git Bash* auch *ssh-keygen* nutzen. Alternativ müssen sie auf Tools wie
[PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
zurückgreifen.

## <a name="basic-copy"></a>Copy

### Lokal
### scp
### rsync

## <a name="basic-dns"></a>DNS

### Lokale hosts Datei
### Eigener DNS Server
### Globale DNS Server

## <a name="basic-firewall"></a>Firewall

### UFW
http://wiki.ubuntuusers.de/ufw

### IPTables
https://help.ubuntu.com/community/IptablesHowTo

## <a name="basic-backup"></a>Backup

### System backups with rsync (and backuppc)
https://help.ubuntu.com/community/BackupPC

### Database

#### Für den täglichen Gebrauch
http://sourceforge.net/projects/automysqlbackup/

#### LVM Snapshots
http://www.lullabot.com/blog/article/mysql-backups-using-lvm-snapshots

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