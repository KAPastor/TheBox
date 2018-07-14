#!/bin/bash
# Initial System Setup for TheBox V0.1.
# Run repo updates and install list of needed packages

echo "The Box (v0.1): Initial System Setup"
echo "___ Installing python3+pip"
sudo apt-get install python3-pip

# Need to install python packages based on the requirements.txt in this directory
echo "___ Installing required python packages"
pip3 install -r requirements.txt

echo "___ Adding the admin server to the boot list"
# In the end we will run the admin on local host
cd ../AdminDashboard
sudo cp /etc/rc.local /etc/rc.local_bkp
sudo chmod 777 /etc/rc.local
!!! NEED TO DO THIS BEFORE exit0 !!!!!
sudo echo "python3 ~/TheBox/AdminDashboard/adminDashboard.py &" >> /etc/rc.local



# Need to show the ip and ssh access command for us
# After this is done we can go headless
# If running the admin show the url to access
