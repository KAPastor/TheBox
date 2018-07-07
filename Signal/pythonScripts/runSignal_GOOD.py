import sqlite3
import PiFm
import os
import RPi.GPIO as GPIO
from subprocess import call
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(18,GPIO.IN, pull_up_down=GPIO.PUD_UP)

conn = sqlite3.connect('/home/pi/TheBox/Signal/signal.db')
c = conn.cursor()
def checkInteraction():
#	print "Checking interactions"
	interaction=True
	if interaction:
    		updateSandCounter()
	else:
		print "No interaction yet"

def updateSandCounter(): # WORKS!
#	print "Updating database"
 #   	print " Getting sand counter current"
    	c.execute("SELECT sand_counter FROM signal_solution")
    	curr_sand_counter = c.fetchone();
    	c.execute("UPDATE signal_solution SET sand_counter=" + str(curr_sand_counter[0]+1))
    	conn.commit()

def checkSignal():
  #  	print "Checking if we should start the Signal"
    	c.execute("SELECT sand_counter FROM signal_solution")
    	curr_sand_counter = c.fetchone();
    	print curr_sand_counter
	if curr_sand_counter[0]>=3:
#        	print "Starting signal loop"
		os.system("sudo /home/pi/TheBox/Signal/pythonScripts/pifm /home/pi/TheBox/Signal/pythonScripts/morsecode.wav 108.0")
        	return True
    	else:
 #       	print "Sand still stuck"
        	return False

# Script start:
# updateSandCounter()
while True:
	checkSignal()
	input_state = GPIO.input(18)
	if input_state == False:
		updateSandCounter()
		time.sleep(3)



