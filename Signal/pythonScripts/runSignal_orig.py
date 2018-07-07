import sqlite3
import PiFm
import os

conn = sqlite3.connect('../signal.db')
c = conn.cursor()

# Insert a row of data

# Save (commit) the changes
# conn.commit()


def checkInteraction():
	print "Checking interactions"
	interaction=True
	if interaction:
    		updateSandCounter()
	else:
		print "No interaction yet"

def updateSandCounter(): # WORKS!
	print "Updating database"
    	print " Getting sand counter current"
    	c.execute("SELECT sand_counter FROM signal_solution")
    	curr_sand_counter = c.fetchone();
    	c.execute("UPDATE signal_solution SET sand_counter=" + str(curr_sand_counter[0]+1))
    	conn.commit()

def checkSignal():
    	print "Checking if we should start the Signal"
    	c.execute("SELECT sand_counter FROM signal_solution")
    	curr_sand_counter = c.fetchone();
    	if curr_sand_counter[0]>=3:
        	print "Starting signal loop"
		
        	return True
    	else:
        	print "Sand still stuck"
        	return False




# Script start:
# updateSandCounter()
while True:
	checkSignal()

