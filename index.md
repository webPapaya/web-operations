---
layout: default
title: Web Operations
---

# <a name="basic"></a>Einführung
---

A german language textbook on Web Operations. Developed on github,
published at [http://web-operations.github.io](http://web-operations.github.io).

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
