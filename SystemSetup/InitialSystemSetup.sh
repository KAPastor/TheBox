#!/bin/bash
# Initial System Setup for TheBox V0.1.
# Run repo updates and install list of needed packages

echo "The Box (v0.1): Initial System Setup"

### Variables:
sudo apt-get install python3.6
# Need to install python packages based on the requirements.txt in this directory
pip3 install -r requirements.txt

# NEed to include adminDashboardFlask.py as a cron job
# Have to set up the hotspot information (possibly via admin panel)

# In the end we will run the admin on local host
cd ./AdminDashboard
python3 adminDashboardFlask.py

# Need to show the ip and ssh access command for us
# After this is done we can go headless
# If running the admin show the url to access
