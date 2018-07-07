# TheBox
ToDo:
- Make separate classes for each sensor type which includes the GPIO pin inputs, and outputs
- Include a test function for each sensor to make sure they are working
- MAke a puzzle pipeline class that is able to connect the sensors outputs together, or read a SQLite DB
- Make a sqlite class for the pipeline 
- Make a csv input/output class for the pipeline
- Generate main puzzle loop class that registers the pipeline elements.
- Create a test for the main loop to mimic activations
- Create puzzle state objects for saving the current state of the puzzle

- Need to make a Flask admin dashboard to load new puzzles or reset them
- Interface needs to also allow for adding Wifi networks or renaming of the box network etc.
- Should interface with puzzle repo to see new puzzle configurations
