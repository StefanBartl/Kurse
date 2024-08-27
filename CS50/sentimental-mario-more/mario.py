# TODO
# Implement a program that prints out a double half-pyramid of a specified height

from cs50 import get_int

# Prompt user for input with loop
while True:
    height = get_int("Heigth: ")

    # Check if input is valid with conditions; loop again if not valid
    if not height > 0:
        continue
    if not height < 9:
        continue

    # Else exit the loop
    else:
        break

# Start main loop for printing
for x in range(1, height + 1):

    # Use print(... end="") to stay in same line. Start with padding left...
    print(" " * (height - x), end="")

    # Place bricks (hashes #) left
    print("#" * x, end="")

    # Middle space of 2
    print("  ", end="")

    # Place bricks (hashes #) right
    print("#" * x)