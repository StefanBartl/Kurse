#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height, hashes, row, spaces;

    // Prompt user for input
    do
    {
        height = get_int("Set heigth: \n");
    }
    while (height < 1 || height > 8);

    // Main loop
    for (row = 0; row < height; row++)
    {
        // Draw left spaces
        for (spaces = row + 1; spaces < height; spaces++)
        {
            printf(" ");
        }

        // Draw left hashes
        for (hashes = 0; hashes < row + 1; hashes++)
        {
            printf("#");
        }

        // Draw divider
        printf("  ");

        // Draw right hashes & end line break
        for (hashes = 0; hashes < row + 1; hashes++)
        {
            if (hashes == row)
            {
                printf("#\n");
                break;
            }
            printf("#");
        }
    }
}