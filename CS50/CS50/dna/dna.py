# Implement a program that identifies a person based on their DNA

import csv
import sys

# Specification

# The program should require as its first command-line argument the name of a CSV file
# containing the STR counts for a list of individuals and should require as its
# second command-line argument the name of a text file containing the DNA sequence to identify.

# If your program is executed with the incorrect number of command-line arguments,
# your program should print an error message of your choice (with print).
# If the correct number of arguments are provided, you may assume that the
# first argument is indeed the filename of a valid CSV file and that the second
# argument is the filename of a valid text file.

# Your program should open the CSV file and read its contents into memory.

# You may assume that the first row of the CSV file will be the column names.
# The first column will be the word name and the remaining columns will be the STR sequences themselves.

# Your program should open the DNA sequence and read its contents into memory.

# For each of the STRs (from the first line of the CSV file), your program should compute
# the longest run of consecutive repeats of the STR in the DNA sequence to identify.
# Notice that we’ve defined a helper function for you, longest_match, which will do just that!

# If the STR counts match exactly with any of the individuals in the CSV file,
# your program should print out the name of the matching individual.

# You may assume that the STR counts will not match more than one individual.

# If the STR counts do not match exactly with any of the individuals in the CSV file, your program should print No match.


def main():

    # TODO: Check for command-line usage

    # Check if there are 2 CLI commands
    if len(sys.argv) != 3:
        print("Usage: python dna.py data.csv sequence.txt")
        return

    # Check if first CLI command is a csv file
    db_name = sys.argv[1]
    if db_name[len(db_name) - 4] != "." or db_name[len(db_name) - 3] != "c" or db_name[len(db_name) - 2] != "s" or db_name[len(db_name) - 1] != "v":
        print("Usage: python dna.py data.csv sequence.txt")
        return

    # Check if second CLI command is a txt file
    seq_name = sys.argv[2]
    if seq_name[len(seq_name) - 4] != "." or seq_name[len(seq_name) - 3] != "t" or seq_name[len(seq_name) - 2] != "x" or seq_name[len(seq_name) - 1] != "t":
        print("Usage: python dna.py data.csv sequence.txt")
        return

    # TODO: Read database file into a variable

    # Open csv file
    with open(db_name, "r") as csvfile:
        database = csv.DictReader(csvfile)
        # Get STRs
        str = list(database)

    # TODO: Read DNA sequence file into a variable

    # Read txt file
    with open(seq_name, "r") as file:
        seq_file = file.read()

    # TODO: Find longest match of each STR in DNA sequence

    profile = {}

    # Start with 1 to get over "names" key
    for i in range(1, len(database.fieldnames)):
        # Get str key
        key = database.fieldnames[i]
        # Find longest countings and save it in profile
        profile[i] = longest_match(seq_file, key)

    # TODO: Check database for matching profiles

    # Compare against data
    # Loop trough strs
    for i in range(len(str)):
        matched_strs_counter = 0
        # Loop trough databse fieldnames
        for j in range(1, len(database.fieldnames)):
            # Check if seq str key matched with databases str key
            if int(profile[j]) == int(str[i][database.fieldnames[j]]):
                # If so, increase counter
                matched_strs_counter += 1
            # Check if all seq strs matched with database strs
            if matched_strs_counter == (len(database.fieldnames) - 1):
                # If so, print out name and return out of programm
                print(str[i]['name'])
                return

    # If not returned it's a mismatch, inform user
    print("No match")


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
