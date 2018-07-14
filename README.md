# The Box: A Hardware Repository for the Raspberry Pi
Whenever I start a new RPi project there are a few annoying bits.  Flashing the OS, getting the Wifi to work and getting my python scripts up to date.  Even when all of this is done, the barrier to entry to get hardware to interface into my project can be annoying to dreadful.  The Box is part set of instructions, part hardware web admin panel and part project repository.  It takes you from hardware setup and presents you with a web interface with pre-programmed sensor components that you can test on your browser (on the Pi or on your local network).  This means headless work and no need for a monitor.  Finally it interfaces with a repository of user projects that you can download, configure and launch.

## Getting Started
We start by assuming you have your new RPi3B board and a totally blank SD card. The first thing to do is download a few things:
1. [Raspbain Lite Image](https://www.raspberrypi.org/downloads/)
2. [SDFormatter](https://www.sdcard.org/downloads/formatter_4/)
3. [Etcher](https://etcher.io/)

Once you have these you can follow the directions at [This Link](https://www.raspberrypi.org/learning/software-guide/quickstart/) to flash the SD card and get the OS ready to go.

Now that the SD card is ready insert it into the RPi3B.  It will boot up and eventually ask for a username and password.  The default username is **pi** and the default password is **raspberry**.  Once you are logged in we can start on connecting up to the internet and downloading the most basic packages needed for getting The Box online.

### Setting up WIFI
As you know without internet we cant do any updates or pull code so lets get this online first.  I am referencing [this Adafruit Tutorial ](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-3-network-setup/setting-up-wifi-with-occidentalis) for the setup. To get things set u follow the commands below:

```
sudo nano /etc/network/interfaces
```
This will open up a nano window where you will need to add the following syntax:
```
auto lo
iface lo inet loopback
iface eth0 inet dhcp
allow-hotplug wlan0
auto wlan0
iface wlan0 inet dhcp
wpa-ssid "ssid"
wpa-psk "password"
```
As you may have guessed the **"ssid"** and **"password"** are specific to your wifi at home.  Save this by hitting Ctrl-X.
Now that this file has been saved we reboot the RPi with `sudo reboot`.  Say goodnight for 30 seconds!

### SSH Tunnel
In general it is way better to develop on another machine and SSH into the Pi.  What I noticed is that SSH is not available by default so we need to update that now that we have wifi.  Follow the commands:
```
sudo raspi-config
```

Select Interfacing Options

Navigate to and select SSH

Choose Yes

Select Ok

Choose Finish

Start the SSH service with systemctl


```
sudo systemctl enable ssh
sudo systemctl start ssh
```
Now we have SSH always available. The last question is what is the Pi's IP address.  To find out type `hostname -I`.

Finally we can test.  Grab your development machine, go to the console and type `ssh pi@MY-PI-IP` and you should be able to log into the pi remotely! Congrats!  Now you can unplug the monitors and keyboards from the Pi and just use it as a headless machine!

## Updating and Pulling Repository
Now that we have internet connectivity we will do some house keeping.  First lets update the repos and install git:
```
sudo apt-get update
sudo apt-get install git
```
Once that runs go to *~/* and run

```
sudo git clone https://github.com/KAPastor/TheBox.git
cd SystemSetup
sudo chmod +x InitialSystemSetup.sh
sudo ./InitialSystemSetup.sh
```
What the above lines do is pull this repository, navigates to the SystemSetup subdirectory, makes the setup Bash script executable and finally runs it.  This script will do all of the rest including adding **apt-get** packages, updating python installing python requirements, adding a Flask admin web server to the boot sequence (next reboot it will be up) and configuring the RPi as a Wireless hotspot.  In the end the system will automatically reboot.

## Connecting to the Hotspot
Now when you try to SSH back into the RPi you will notice that it doesn't work.  Don't be alarmed!  This is because the RPi is now working in "Hotspot Mode".  What you should see is a new network in your Wifi connections called "TheBox".  Connect to this hotspot with the default password **OMG_The_Box_Rox** (you can change this later :P).  Once logged into the network you will be able to SSH back into the system once again if you like.

## Connect to the Admin dashboard
Remember the whole point of this is to get to the web interface that helps us develop easier.  To do this you can actually connect to the admin dashboard by going into your web browser and navigating to **[http://0.0.0.0:5000](http://0.0.0.0:5000)**.  Here you should see the Admin Webpage!  

At this point the Admin page has all you need including the Wiki, so I bid you goodbye and have fun!  


ADMIN PANEL:
- Switch Modes - hot swap when wanting to use external internet....
- Show IP on networks

TODO: PLZ IGNORE lols

Projects:
- Puzzle
- Garden Sensor


ToDo:
__ Hardware stuff
- Make separate classes for each sensor type which includes the GPIO pin inputs, and outputs
- Include a test function for each sensor to make sure they are working
- MAke a puzzle pipeline class that is able to connect the sensors outputs together, or read a SQLite DB
- Make a sqlite class for the pipeline
- Make a csv input/output class for the pipeline
- Generate main puzzle loop class that registers the pipeline elements.
- Create a test for the main loop to mimic activations
- Create puzzle state objects for saving the current state of the puzzle

___ Web/Admin Stuff
- Need to make a Flask admin dashboard to load new puzzles or reset them
- Interface needs to also allow for adding Wifi networks or renaming of the box network etc.
- Should interface with puzzle repo to see new puzzle configurations

___ Setup stuff
- Make a script that checks the wifi for avialable networks
- Script to automatically update and download everything for generating a wifi hotspot network in one go.
- Python script to switch between hotspot mode (during a puzzle) to wifi mode to connect to the internet. The admin site will then be on the non localhost IP but the shared IP.
- Make a fairly detailed setup document on this.
- Ideally I could get the hardware and pull git from here and run the system setup script which would do everything.  This first step needs to be documented.  ie. Get NOOBS, sudo update sudo apt-get install git, git pull this repo and run...
