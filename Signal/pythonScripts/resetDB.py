import sqlite3
import PiFm
import os
import RPi.GPIO as GPIO
from subprocess import call
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(18,GPIO.IN, pull_up_down=GPIO.PUD_UP)

conn = sqlite3.connect('../signal.db')
c = conn.cursor()

def main(): # WORKS!
	print "Resetting counter"
    	c.execute("UPDATE signal_solution SET sand_counter=0")
    	conn.commit()
main()

