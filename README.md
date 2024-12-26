# Spot-Difference-Game
Spot the difference is a basic game where you have to spot the differences between two images.
You can do so by left-clicking on the differences in the left image through the mouse pointer.
There's a timer to make the game more fast-paced and a score meter to keep an eye on the number of differences spotted.
If you run out of time, just press ok on the pop-up that appears and the game resets.

The game uses the JSON file to dynamically load its configuration. The JSON file provides:

Game Title: Displayed on the game screen.
Image Paths: Specifies the two images to be displayed.
Differences Data: Contains coordinates (x, y) and dimensions (width, height) of the areas where the differences exist.
The script fetches the JSON data and uses it to set up the game environment. It checks the player's clicks against the provided coordinates to determine if they found a difference.
