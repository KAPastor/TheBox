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
sudo chmod 755 ../AdminDashboard/adminDashboard.py

# Copy the job sh file
sudo cp AdminService.sh /etc/init.d
sudo chmod 755 /etc/init.d/AdminService.sh
sudp tr '\r' '\n' < /etc/init.d/AdminService.sh > /etc/init.d/AdminService.sh
sudo /etc/init.d/AdminService.sh start





# Need to show the ip and ssh access command for us
# After this is done we can go headless
# If running the admin show the url to access
