// Implements a dictionary's functionality

// Hash table combined with a linked list for fast hash collision solution

#include <ctype.h>
#include "dictionary.h"
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

// Typedef nodes for hash hash_table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash_table (1/3 more than the current dictionary)
const unsigned int N = 143091 + (143091 / 3);

// Initialize hash_table
node *hash_table[N];

// Initialize variable for dictionary size
int dictionary_size = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // Hashing the word to search for
    int hash_word = hash(word);

    // Get node in hash_table
    node *n = hash_table[hash_word];

    // Check if n isn't NULL (hash is not in hash_table)
    while (n != NULL)
    {
        // Compare searched word with found word
        if (strcasecmp(word, n->word) == 0)
        {
            // If they are the same, return true
            return true;
        }
        // If they aren't, search next (Collision)
        n = n->next;
    }

    // If n is NULL (hash is not in hash_table), return false
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // Function should take a string and return an index (founded out, that long is faster than int or size_t !?!?)
    long sum = 0;
    // Loopr trough word and sum up all ASCI Values (founded out that, lower chars are faster than upper !?!?)
    for (size_t i = 0; i < strlen(word); i++)
    {
        sum += tolower(word[i]);
    }
    // Modulo sum with the size of array (standard proofen solution)
    return sum % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // Open dictionary file
    FILE *dictionary_file = fopen(dictionary, "rb");

    // Check if dictionary_file is NULL
    if (dictionary == NULL)
    {
        printf("Cannot open %s\n, please provide valid dictionary.", dictionary);
        return false;
    }

    // Initialise word array
    char dictionary_array[LENGTH + 1];

    // Read dictionary file (%s is for serious of chars null-terminated, EOF == End-Of-File)
    while (fscanf(dictionary_file, "%s", dictionary_array) != EOF)
    {
        // Malloc memory for every new word/node
        node *word_node = malloc(sizeof(node));
        // Check if programm malloced succesfully memory
        if (word_node == NULL)
        {
            return false;
        }

        // Copy the word in the created word node in the dictionary array
        strcpy(word_node->word, dictionary_array);

        // Get hash value for new word
        int hash_value = hash(dictionary_array);

        // Insert next
        word_node->next = hash_table[hash_value];

        // Insert node into hash_table
        hash_table[hash_value] = word_node;

        // Increase the size of thew dictionary
        dictionary_size++;
    }

    // Close file
    fclose(dictionary_file);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    return dictionary_size;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // Loop trough hash table and free ecery single node
    for (size_t x = 0; x < N; x++)
    {
        // Get running node
        node *n = hash_table[x];

        // Loop through linked list
        while (n != NULL)
        {
            // Assign running temp
            node *tmp = n;

            // Assign running node to next element
            n = n->next;

            // Free running temp
            free(tmp);
        }

        // Check for finish
        if (n == NULL && x == N - 1)
        {
            return true;
        }
    }

    // If function not returned true and jumped out of iteration, something went wrong
    return false;

}