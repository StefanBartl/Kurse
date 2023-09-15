# TODO
# Implement a program that computes the approximate grade level needed to comprehend some text

from cs50 import get_string

# Prompt user for text input
text = get_string("Text: ")


def count_letters(text):
    i = counter = 0

    # Loop trough string
    while (i < len(text)):

        # Check for alphanumeric values in the string
        if text[i].isalpha() == True:
            counter += 1
        i += 1
    return counter


def count_sentences(text):
    # Check for blank text with only whitespaces
    if count_letters(text) == 0:
        return 0

    # Loop trough string
    i = counter = 0
    while (i < len(text)):
        # Check for endings of sentences in the string
        if text[i] == '.' or text[i] == '?' or text[i] == '!':
            counter += 1
        i += 1
    return counter


def count_words(text):
    # Check for blank text with only whitespaces
    if count_letters(text) == 0:
        return 0

    # Loop trough string
    i = counter = 1
    while (i < len(text)):

        # Check for whitespaces in the string
        if text[i].isspace() == True:
            counter += 1
        i += 1
    return counter


def get_grade(text):
    # Get word letters
    letters = count_letters(text)

    # Get number of words
    words = count_words(text)

    # Get number of sentences
    sentences = count_sentences(text)

    # Calculate L, which is the average number of letters per 100 words in the text
    L = (letters / words) * 100

    # Calculate S, which is the average number of sentences per 100 words in the text
    S = (sentences / words) * 100

    # Calculate Coleman-Liau index
    index = 0.0588 * L - 0.296 * S - 15.8

    # Round result to nearest integer and than return it
    resulting_grade = round(index)

    return resulting_grade


# Get Coleman-Liau index
grade = get_grade(text)

# Print grade to user
if grade < 1:
    print("Before Grade 1")
elif (grade >= 16):
    print("Grade 16+")
else:
    print("Grade %i", grade)