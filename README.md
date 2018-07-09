# The Box: A Hardware Repository for the Raspberry Pi
Whenever I start a new RPi project there are a few annoying bits.  Flashing the OS, getting the Wifi to work and getting my python scripts up to date.  Even when all of this is done, the barrier to entry to get hardware to interface into my project can be annoying to dreadful.  The Box is part set of instructions, part hardware web admin panel and part project repository.  It takes you from hardware setup and presents you with a web interface with pre-programmed sensor componenets that you can test on your browser (on the Pi or on your local network).  This means headless work and no need for a monitor.  Finally it interfaces with a repository of user projects that you can download, configure and launch user generated admin panels.

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
