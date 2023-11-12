#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "wav.h"

int check_format(WAVHEADER header);
int get_block_size(WAVHEADER header);

int main(int argc, char *argv[])
{
    // Ensure proper usage
    // TODO #1

    // Check if there are 2 CLI commands
    if (argc != 3)
    {
        printf("Start program like: ./reverse.c INPUT_FILENAME.wav OUTPUT_FILENAME.wav\n”");
        return 1;
    }

    // Check for .wav file format and its explicit specification for input file
    char *input_name = argv[1];
    if (input_name[strlen(input_name) - 4] != '.' && input_name[strlen(input_name) - 3] != 'w'
        && input_name[strlen(input_name) - 2] != 'a' && input_name[strlen(input_name) - 1] != 'v')
    {
        printf("Input file must be in & written with .wav format");
        return 1;
    }

    // Check for .wav file format and its explicit specification for output file
    char *output_name = argv[2];
    if (output_name[strlen(output_name) - 4] != '.' && output_name[strlen(output_name) - 3] != 'w'
        && output_name[strlen(output_name) - 2] != 'a' && output_name[strlen(output_name) - 1] != 'v')
    {
        printf("Output file must be in & written with .wav format");
        return 1;
    }

    // Open input file for reading
    // TODO #2

    // Open input file

    FILE *input_file;
    input_file = fopen(input_name, "rb");

    // Check if input file works properly
    if (input_file == NULL)
    {
        printf("Error: Cannot open input file.");
        return 1;
    }

    // Read header
    // TODO #3

    // Initialize buffer for the wav header
    WAVHEADER header_buffer;
    fread(&header_buffer, sizeof(WAVHEADER), 1, input_file);

    // Use check_format to ensure WAV format
    // TODO #4
    check_format(header_buffer);

    // Open output file for writing
    // TODO #5

    FILE *output_file;
    output_file = fopen(output_name, "wb");

    // Check if output file works properly
    if (output_file == NULL)
    {
        printf("Error: Cannot open output file.");
        return 1;
    }

    // Write header to file
    // TODO #6

    fwrite(&header_buffer, sizeof(WAVHEADER), 1, output_file);


    // Use get_block_size to calculate size of block
    // TODO #7

    int block_size = get_block_size(header_buffer);

    // Write reversed audio to file
    // TODO #8

    // Get length of audio sample size
    int sample_size = header_buffer.subchunk2Size / block_size;

    // Initialize array to read in
    BYTE *read_buffer = malloc(block_size);

    // Set file pointer to end of the file
    fseek(input_file, -block_size, SEEK_END);

    //
    while (ftell(input_file) >= sizeof(header_buffer))
    {
        // Read from input andf write to to buffer
        fread(read_buffer, block_size, 1, input_file);

        // Write to output file
        fwrite(read_buffer, block_size, 1, output_file);

        // Check for return
        if (fseek(input_file, -2 * block_size, SEEK_CUR))
        {
            return 1;
        }
    }

    // Free memory
    free(read_buffer);

    // Close opened files
    fclose(input_file);
    fclose(output_file);
    
}

int check_format(WAVHEADER header)
{
    // TODO #4
    if (header.format[0] != 'W' || header.format[1] != 'A' || header.format[2] != 'V' || header.format[3] != 'E')
    {
        return 1;
    }
    return 0;
}

int get_block_size(WAVHEADER header)
{
    // TODO #7

    // Get bytes per sample
    int bytes_per_sample = header.bitsPerSample / 8;

    // Get block size
    int block_size = header.numChannels * bytes_per_sample;

    return block_size;
}