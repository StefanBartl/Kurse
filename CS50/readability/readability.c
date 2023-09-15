// The programm "readability" prompts for text input and gives the Coleman-Liau index of the text back,
// which is as index of the text's reading level in grades, where a higher grade corresponds with a higher reading level.

#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>

int count_letters(string text);
int count_sentences(string text);
int count_words(string text);
int get_grade(string text);

int main(void)
{
    // Prompt user for text input
    string text = get_string("Text: ");
    // Get Coleman-Liau index
    int grade = get_grade(text);
    // Print grade to user
    if (grade < 1)
    {
        printf("Before Grade 1\n");
    }
    else if (grade >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %i\n", grade);
    }
}

int count_letters(string text)
{
    int i = 0, counter = 0;
    // Loop trough string
    while (text[i] != '\0')
    {
        // Check for alphanumeric values in the string
        if (isalpha(text[i]) != 0)
        {
            counter++;
        }
        i++;
    }
    return counter;
}

int count_sentences(string text)
{
    // Check for blank text with only whitespaces
    if (count_letters(text) == 0)
    {
        return 0;
    }

    int i = 0, counter = 0;
    // Loop trough string
    while (text[i] != '\0')
    {
        // Check for endings of sentences in the string
        if (text[i] == '.' || text[i] == '?' || text[i] == '!')
        {
            counter++;
        }
        i++;
    }

    return counter;
}

int count_words(string text)
{
    // Check for blank text with only whitespaces
    if (count_letters(text) == 0)
    {
        return 0;
    }

    int i = 0, counter = 1;
    // Loop trough string
    while (text[i] != '\0')
    {
        // Check for whitespaces in the string
        if (isspace(text[i]))
        {
            counter++;
        }
        i++;
    }

    return counter;
}

int get_grade(string text)
{
    // Get word letters
    int letters = count_letters(text);
    // Get number of words
    int words = count_words(text);
    // Get number of sentences
    int sentences = count_sentences(text);
    // Calculate L, which is the average number of letters per 100 words in the text
    float L = ((float) letters / (float) words) * 100;
    // Calculate S, which is the average number of sentences per 100 words in the text
    float S = ((float) sentences / (float) words) * 100;
    // Calculate Coleman-Liau index
    float index = 0.0588 * L - 0.296 * S - 15.8;
    // Round result to nearest integer and than return it
    int resulting_grade = round(index);

    return resulting_grade;
}