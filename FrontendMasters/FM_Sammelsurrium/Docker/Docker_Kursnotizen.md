# Docker / x / Mitte Oktober 23

[Course Website](https://btholt.github.io/complete-intro-to-containers)
[Course Repo](https://github.com/btholt/complete-intro-to-containers)
[Course Files in Repo](https://github.com/btholt/projects-for-complete-intro-to-containers)

## Takeaways

+

## Bind Mounts

Bindung von Verzeichnissen: Wenn du beim Starten des Containers Verzeichnisse mit dem -v-Flag verknüpfst, kannst du Daten zwischen dem Host und dem Container teilen. Hier ist ein Beispiel:

**Starte einen Container und binde ein Verzeichnis ein**

docker run -d --name mycontainer -v /pfad/zum/verzeichnis:/pfad/im/container myimage

Alle Änderungen in diesem Verzeichnis auf dem Host werden auch im Container sichtbar sein und umgekehrt.

**Bind Mounts**
Let's start here because this is easier to see the use case for. Bind mounts allow you to mount files from your host computer into your container. This allows you to use the containers a much more flexible way than previously possible: you don't have to know what files the container will have when you build it and it allows you to determine those files when you run it.

Let's go over an example of how this could be useful.

In the previous project, we used the NGINX container to build a container with our static assets baked into the container. In general this what I recommend you do since now we can ship that container anywhere and it'll just work. It's totally self-contained. But what if we just want to run a NGINX container locally to test stuff out? Sure, we could make a new Dockerfile and write it, but wouldn't it be cool if we could just use the NGINX container directly? We can! Let's try it. Go back to your static site project from the previous lesson. Let's use the nginx container to serve directly from it.

### from the root directory of your CRA app

docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx

This is how you do bind mounts. It's a bit verbose but necessary. Let's dissect it.

We use the --mount flag to identify we're going to be mounting something in from the host.
As far as I know the only two types are bind and volume. Here we're using bind because we to mount in some piece of already existing data from the host.
In the source, we identify what part of the host we want to make readable-and-writable to the container. It has to be an absolute path (e.g we can't say "./build") which is why use the "$(pwd)" to get the present working directory to make it an absolute path.
The target is where we want those files to be mounted in the container. Here we're putting it in the spot that NGINX is expecting.
As a side note, you can mount as many mounts as you care to, and you mix bind and volume mounts. NGINX has a default config that we're using but if we used another bind mount to mount an NGINX config to /etc/nginx/nginx.conf it would use that instead.

## Volumes

Volumes
Bind mounts are great for when you need to share data between your host and your container as we just learned. Volumes, on the other hand, are so that your containers can maintain state between runs. So if you have a container that runs and the next time it runs it needs the results from the previous time it ran, volumes are going to be helpful. Volumes can not only be shared by the same container-type between runs but also between different containers. Maybe if you have two containers and you want to log to consolidate your logs to one place, volumes could help with that.

They key here is this: bind mounts are file systems managed the host. They're just normal files in your host being mounted into a container. Volumes are different because they're a new file system that Docker manages that are mounted into your container. These Docker-managed file systems are not visible to the host system (they can be found but it's designed to be.)

Let's make a quick Node.js app that reads from a file that a number in it, prints it, writes it to a volume, and finishes. Create a new Node.js project.

mkdir docker-volume
cd docker-volume
touch index.js Dockerfile
Inside that Node.js file, put this:

const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(process.env.DATA_PATH || "./data.txt");

fs.readFile(dataPath)
  .then(buffer => {
    const data = buffer.toString();
    console.log(data);
    writeTo(+data + 1);
  })
  .catch(e => {
    console.log("file not found, writing '0' to a new file");
    writeTo(0);
  });

const writeTo = data => {
  fs.writeFile(dataPath, data.toString()).catch(console.error);
};
Don't worry too much about the Node.js. It looks for a file $DATA_PATH if it exists or ./data.txt if it doesn't and if it exists, it reads it, logs it, and writes back to the data file after incrementing the number. If it just run it right now, it'll create a data.txt file with 0 in it. If you run it again, it'll have 1 in there and so on. So let's make this work with volumes.

FROM node:12-alpine
COPY --chown=node:node . /src
WORKDIR /src
CMD ["node", "index.js"]
Now run

docker build --tag=incrementor .
docker run incrementor
Every time you run this it'll be the same thing. This is nothing is persisted once the container finishes. We need something that can live between runs. We could use bind mounts and it would work but this data is only designed to be used and written to within Docker which makes volumes preferable and recommended by Docker. If you use volumes, Docker can handle back ups, clean ups, and more security for you. If you use bind mounts, you're on your own.

So, without having to rebuild your container, try this

docker run --env DATA_PATH=/data/num.txt --mount type=volume,src=incrementor-data,target=/data incrementor
Now you should be to run it multiple times and everything should work! We use the --env flag to set the DATA_PATH to be where we want Node.js to write the file and we use --mount to mount a named volume called incrementor-data. You can leave this out and it'll be an anonymous volume that will persist beyond the container but it won't automatically choose the right one on future runs. Awesome!

named pipes, tmpfs, and wrap up
Prefer to use volumes when you can, use bind mounts where it makes sense. If you're still unclear, the [official Docker][storage] docs are pretty good on the subject.

There are two more that we didn't talk about, tmpfs and npipe. The former is Linux only and the latter is Windows only (we're not going over Windows containers at all in this workshop.) tmpfs imitates a file system but actually keeps everything in memory. This is useful for mounting in secrets like database keys. The latter is useful for mounting third party tools for Windows containers. If you need more info than that, refer to the docs. I've never directly used either.

## Docker CLI

Docker CLI
Let's take a look at some more cool features of the Docker CLI.

pull / push
pull allows you to pre-fetch container to run. P

docker pull jturpin/hollywood
docker run -it jturpin/hollywood hollywood # notice it's already loaded and cached here; it doesn't redownload it
That will pull the hollywood container from the user jturpin's user account. The second line will execute this fun container which is just meant to look a hacker's screen in a movie (it doesn't really do anything than look cool.)

push allows you to push containers to whatever registry you're connected to (probably normally Docker Hub or something like Azure Container Registry).

inspect
docker inspect node
This will dump out a lot of info about the container. Helpful when figuring out what's going on with a container

pause / unpause
As it looks, these pauses or unpause all the processes in a container. Feel free to try

docker run -dit jturpin/hollywood hollywood
docker ps # see container running
docker pause <ID or name>
docker ps # see container paused
docker unpause <ID or name>
docker ps # see container running again
docker kill <ID or name> # see container is gone
exec
This allows you to execute a command against a running container. This is different from docker run because docker run will start a new container whereas docker exec runs the command in an already-running container.

docker run -dit jturpin/hollywood hollywood
docker ps # grab the name or ID
docker exec <ID or name> ps aux # see it output all the running processes of the container
If you haven't seen ps aux before, it's a really useful way to see what's running on your computer. Try running ps aux on your macOS or Linux computer to see everything running.

import / export
Allows you to dump out your container to a tar ball (which we did above.) You can also import a tar ball as well.

history
We'll get into layers in a bit but this allow you to see how this Docker image's layer composition has changed over time and how recently.

docker history node
info
Dumps a bunch of info about the host system. Useful if you're on a VM somewhere and not sure what the environment is.

docker info
top
Allows you to see processes running on a container (similar to what we did above)

docker run mongo
docker top <ID outputted by previous command> # you should see MongoDB running
rm / rmi
If you run docker ps --all it'll show all containers you've stopped running in addition to the runs you're running. If you want to remove something from this list, you can do docker rm <id or name>.

If you want to remove an image from your computer (to save space or whatever) you can run docker rmi mongo and it'll delete the image from your computer. This isn't a big deal since you can always reload it again

logs
Very useful to see the output of one of your running containers.

docker run -d mongo
docker logs <id from previous command> # see all the logs
restart
Pretty self explanatory. Will restart a running container

search
If you want to see if a container exists on Docker Hub (or whatever registry you're connected to), this will allow you to take a look.

docker search python # see all the various flavors of Python containers you can run
docker search node # see all the various flavors of Node.js containers you can r

## Ubuntu mit GUI

### Image

Das offizielle Ubuntu-Docker-Image enthält standardmäßig keine GUI-Komponenten. Um ein Ubuntu-Docker-Image mit einer grafischen Benutzeroberfläche (GUI) zu erstellen, müsstest du ein benutzerdefiniertes Image erstellen und darin die benötigte GUI-Software installieren.

Ein häufig verwendetes Ubuntu-basiertes Docker-Image mit einer grafischen Benutzeroberfläche ist "dorowu/ubuntu-desktop-lxde-vnc". Dieses Image enthält eine LXDE-Desktopumgebung und ist für die Verwendung in Containern mit GUI-Anwendungen optimiert.

Du kannst es wie folgt verwenden:

1. Pull das Docker-Image von Docker Hub:

```bash
docker pull dorowu/ubuntu-desktop-lxde-vnc
```

2. Führe einen Container aus:

```bash
docker run -p 6080:80 -e HOME=/ dorowu/ubuntu-desktop-lxde-vnc
```

Das obige Beispiel erstellt einen Container, der die GUI über einen Webbrowser unter `http://localhost:6080` anzeigen kann. Dieses Image verwendet das "noVNC"-Tool, um den Desktop anzuzeigen.

Bitte beachte, dass die GUI-Container-Unterstützung von Docker aufgrund von Einschränkungen und Sicherheitsüberlegungen auf Linux-Systemen möglicherweise einfacher zu implementieren ist. Auf Windows- und Mac-Systemen kann die Einrichtung einer GUI in einem Docker-Container komplexer sein.

Je nachdem, welche spezifische GUI-Anwendung du ausführen möchtest, gibt es möglicherweise spezielle Docker-Images und -Konfigurationen, die besser zu deinen Anforderungen passen. Such auf Docker Hub oder in den offiziellen Repositories nach solchen Images und deren Dokumentation, um die für deine Anwendung am besten geeignete Lösung zu finden.

### Erklärung

Ja, du kannst eine grafische Benutzeroberfläche (GUI) für Docker-Container haben, die du über Visual Studio Code (VS Code) ausführst. Hier sind die Schritte, um dies zu erreichen:

1. **Installiere Docker**: Stelle sicher, dass Docker auf deinem System installiert ist.

2. **Installiere Docker-Erweiterungen in VS Code**: Du kannst Docker-bezogene Erweiterungen für VS Code installieren, um die Containerverwaltung zu erleichtern. Eine beliebte Erweiterung ist "Docker" von Microsoft. Du kannst sie über den Erweiterungsmarkt in VS Code finden und installieren.

3. **Starte Container mit GUI-Anwendung**: Du kannst Docker-Container erstellen, die GUI-Anwendungen enthalten. Dazu benötigst du spezielle Images, die die erforderliche GUI-Unterstützung bieten. Zum Beispiel gibt es Docker-Images für Anwendungen wie Firefox oder Visual Studio Code, die eine GUI-Oberfläche verwenden.

4. **Verbinde VS Code mit dem Container**: Mit den Docker-Erweiterungen in VS Code kannst du Container erstellen und ausführen. Du kannst auch eine Verbindung zu einem laufenden Container herstellen. Dies ermöglicht es dir, die GUI-Anwendung in einem Container in einem VS Code-Fenster zu öffnen und darauf zuzugreifen.

5. **X11-Forwarding (Linux)**: Wenn du auf einem Linux-Host arbeitest, benötigst du X11-Forwarding, um die GUI von Containern auf deinem Host anzuzeigen. Du kannst dies einrichten, um die GUI-Anwendung im Container auf deinem Linux-Desktop anzuzeigen.

6. **X-Server (Windows)**: Wenn du auf einem Windows-Host arbeitest, benötigst du einen X-Server, um GUI-Anwendungen aus Containern anzuzeigen. Ein beliebter X-Server für Windows ist Xming.

Bitte beachte, dass die Einrichtung einer GUI für Docker-Container in VS Code je nach Anwendungsfall und Betriebssystem einige Konfigurationsschritte erfordern kann. Die genauen Schritte hängen von der GUI-Anwendung und den spezifischen Anforderungen ab.

Wenn du beispielsweise eine grafische Anwendung in einem Docker-Container ausführen möchtest, könntest du Docker-Compose verwenden, um die erforderlichen Dienste und Volumes zu konfigurieren. Dann könntest du mit VS Code auf diesen Container zugreifen und die GUI-Anwendung starten. In der Docker-Compose-Konfiguration könntest du auch das X11-Forwarding oder den X-Server konfigurieren, um die GUI anzuzeigen.

Die genaue Umsetzung hängt von deinem Anwendungsfall und deiner spezifischen Umgebung ab. Es kann komplex sein, aber es ist möglich, GUI-Anwendungen in Docker-Containern auf deinem System auszuführen und über VS Code darauf zuzugreifen.

## Ubuntu Container from zero

[Ubuntu Docker Hub](https://hub.docker.com/_/ubuntu)
`docker run -it --name docker-host --rm --privileged ubuntu:bionic`

To see what version of Ubuntu you're using, run `cat /etc/issue/`. cat reads a file and dumps it into the output which means we can read it, and /etc/issue is a file that will tell us what distro we're using.

### chroot

Okay, so let's attempt to use chroot right now.

Make a new folder in your home directory via mkdir /my-new-root.
Inside that new folder, run echo "my super secret thing" >> /my-new-root/secret.txt.
Run:

mkdir /my-new-root/bin
cp /bin/bash /bin/ls /my-new-root/bin/

$ ldd /bin/bash
  linux-vdso.so.1 (0x00007fffa89d8000)
  libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f6fb8a07000)
  libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f6fb8803000)
  libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f6fb8412000)
  /lib64/ld-linux-x86-64.so.2 (0x00007f6fb8f4b000)

These are the libraries we need for bash. Let's go ahead and copy those into our new environment.

mkdir /my-new-root/lib /my-new-root/lib64 or you can do /my-new-root/lib{,64} 

Then we need to copy all those paths (ignore the lines that don't have paths) into our directory. Make sure you get the right files in the right directory. In my case above (yours likely will be different) it'd be two commands:

cp /lib/x86_64-linux-gnu/libtinfo.so.5 /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib
cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64

Do it again for ls. Run ldd /bin/ls
Follow the same process to copy the libraries for ls into our my-new-root.

cp /lib/x86_64-linux-gnu/libselinux.so.1 /lib/x86_64-linux-gnu/libpcre.so.3 /lib/x86_64-linux-gnu/libpthread.so.0 /my-new-root/lib

Now, finally, run chroot /my-new-root bash and run ls. 
You should successfully see everything in the directory. Now try pwd to see your working directory. You should see /. You can't get out of here! This, before being called containers, was called a jail for this reason. At any time, hit CTRL+D or run exit to get out of your chrooted environment.

### debootstrap

Vorbereitungen für Namespace Einrichtung zum Schützen von Prozessen durch andere User:

    ```bash
    exit # from our chroot'd environment if you're still running it, if not skip this
    # install debootstrap
    apt-get update -y
    apt-get install debootstrap -y
    debootstrap --variant=minbase bionic /better-root

    # head into the new namespace'd, chroot'd environment
    unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash # this also chroot's for us
    mount -t proc none /proc # process namespace
    mount -t sysfs none /sys # filesystem
    mount -t tmpfs none /tmp # filesystem
    ```

This will create a new environment that's isolated on the system with its own PIDs, mounts (like storage and volumes), and network stack. Now we can't see any of the processes!

### cgroups

    ```bash
    # outside of unshare'd environment get the tools we'll need here
    apt-get install -y cgroup-tools htop

    # create new cgroups
    cgcreate -g cpu,memory,blkio,devices,freezer:/sandbox

    # add our unshare'd env to our cgroup
    ps aux # grab the bash PID that's right after the unshare one
    cgclassify -g cpu,memory,blkio,devices,freezer:sandbox <PID>

    # list tasks associated to the sandbox cpu group, we should see the above PID
    cat /sys/fs/cgroup/cpu/sandbox/tasks

    # show the cpu share of the sandbox cpu group, this is the number that determines priority between competing resources, higher is is higher priority
    cat /sys/fs/cgroup/cpu/sandbox/cpu.shares

    # kill all of sandbox's processes if you need it
    # kill -9 $(cat /sys/fs/cgroup/cpu/sandbox/tasks)

    # Limit usage at 5% for a multi core system
    cgset -r cpu.cfs_period_us=100000 -r cpu.cfs_quota_us=$[ 5000 * $(getconf _NPROCESSORS_ONLN) ] sandbox

    # Set a limit of 80M
    cgset -r memory.limit_in_bytes=80M sandbox
    # Get memory stats used by the cgroup
    cgget -r memory.stat sandbox

    # in terminal session #2, outside of the unshare'd env
    htop # will allow us to see resources being used with a nice visualizer

    # in terminal session #1, inside unshared'd env
    yes > /dev/null # this will instantly consume one core's worth of CPU power
    # notice it's only taking 5% of the CPU, like we set
    # if you want, run the docker exec from above to get a third session to see the above command take 100% of the available resources
    # CTRL+C stops the above any time

    # in terminal session #1, inside unshare'd env
    yes | tr \\n x | head -c 1048576000 | grep n # this will ramp up to consume ~1GB of RAM
    # notice in htop it'll keep the memory closer to 80MB due to our cgroup
    # as above, connect with a third terminal to see it work outside of a cgroup
    ```

And now we can call this a container. Using these features together, we allow Bob, Alice, and Eve to run whatever code they want and the only people they can mess with is themselves.
