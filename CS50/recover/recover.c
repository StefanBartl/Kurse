#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
/*
                        Specification

The files you generate should each be named ###.jpg, where ### is a three-digit decimal number,
 starting with 000 for the first image and counting up.

Your program, if it uses malloc, must not leak any memory.
*/

int main(int argc, char *argv[])
{
    // Accept only one CLI argument
    if (argc != 2)
    {
        printf("Please start the program with the name of a forensic image from which to recover JPEG, like: ./recover NAME\n");
        return 1;
    }

    // Try to read the file
    FILE *file = fopen(argv[1], "r");
    if (file == NULL)
    {
        printf("Sorry, forensic image not found!\n");
        return 1;
    }

    // Get file name
    char *file_name = argv[1];
    char filename[8];

    // Initialize counter for images
    int counter = 0;

    // Initialise image pointer
    FILE *image_pointer = NULL;

    // Initialize BLOCK_SIZE and buffer for saving images
    int BLOCK_SIZE = 512;
    uint8_t buffer[BLOCK_SIZE];

    // Read block per block
    while (fread(&buffer, BLOCK_SIZE, 1, file) == 1)
    {
        // If new JPEG block (0xff 0xd8 0xff 0xe)....
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // Close image pointer from before (except in first block itaration)
            if (counter > 0)
            {
                fclose(image_pointer);
            }
            // Initialize new image file
            sprintf(filename, "%03i.jpg", counter);
            // declare former closed image pointer to write mode win new image block
            image_pointer = fopen(filename, "w");
            // Increase counter for next image
            counter++;
        }
        // Write
        if (counter > 0)
        {
            fwrite(&buffer, 512, 1, image_pointer);
        }
    }

    fclose(file);
    fclose(image_pointer);

    return 0;
}