#!/bin/bash
# Initial System Setup for TheBox V0.1.
# Run repo updates and install list of needed packages

echo "The Box (v0.1): Initial System Setup"
echo "___ Installing python3+pip"
sudo apt-get install python3-pip python3-dev nginx

# Need to install python packages based on the requirements.txt in this directory
echo "___ Installing required python packages"
pip3 install -r requirements.txt

echo "___ Adding the admin server to the boot list"
# In the end we will run the admin on local host
sudo chmod 755 ../AdminDashboard/adminDashboard.py



/etc/systemd/system/adminDashboard.service
sudo systemctl start myproject
sudo systemctl enable myproject
sudo nano /etc/nginx/sites-available/myproject
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
sudo ufw delete allow 5000
sudo ufw allow 'Nginx Full'






# Need to show the ip and ssh access command for us
# After this is done we can go headless
# If running the admin show the url to access
