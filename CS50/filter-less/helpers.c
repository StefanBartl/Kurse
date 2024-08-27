#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop trough image
    for (int i = 0; i < height; i++)
    {
        for (int y = 0; y < width; y++)
        {
            // Get average value (bypass truncating by casting to float, divide trouguh 3.0 and than round)
            BYTE average = round(((float)image[i][y].rgbtRed + (float)image[i][y].rgbtGreen + (float)image[i][y].rgbtBlue) / 3.0);
            // Set new values to image
            image[i][y].rgbtRed = average;
            image[i][y].rgbtGreen = average;
            image[i][y].rgbtBlue = average;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop trough image
    for (int i = 0; i < height; i++)
    {
        for (int y = 0; y < width; y++)
        {
            // Calulate sepia red value for this pixel
            int sepiaRed = round(.393 * (float)image[i][y].rgbtRed + .769 * (float)image[i][y].rgbtGreen + .189 * (float)image[i][y].rgbtBlue);
            int sepiaGreen = round(.349 * (float)image[i][y].rgbtRed + .686 * (float)image[i][y].rgbtGreen + .168 *
                                   (float)image[i][y].rgbtBlue);
            int sepiaBlue = round(.272 * (float)image[i][y].rgbtRed + .534 * (float)image[i][y].rgbtGreen + .131 * (float)image[i][y].rgbtBlue);

            // Capping and/or setting values
            if (sepiaRed > 255)
            {
                image[i][y].rgbtRed = 255;
            }
            else
            {
                image[i][y].rgbtRed = sepiaRed;
            }

            if (sepiaGreen > 255)
            {
                image[i][y].rgbtGreen = 255;
            }
            else
            {
                image[i][y].rgbtGreen = sepiaGreen;
            }

            if (sepiaBlue > 255)
            {
                image[i][y].rgbtBlue = 255;
            }
            else
            {
                image[i][y].rgbtBlue = sepiaBlue;
            }

        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop from top trough hole image
    for (int i = 0; i < height; i++)
        // Loop trough half image width
        for (int j = 0; j < (width / 2); j++)
        {
            // Save running rgb values in temo
            int temp_red = image[i][j].rgbtRed;
            int temp_green = image[i][j].rgbtGreen;
            int temp_blue = image[i][j].rgbtBlue;

            // Set running pixel to reflected pixels and vice versa
            image[i][j].rgbtRed = image[i][width - j - 1].rgbtRed;
            image[i][width - j - 1].rgbtRed = temp_red;
            image[i][j].rgbtGreen = image[i][width - j - 1].rgbtGreen;
            image[i][width - j - 1].rgbtGreen = temp_green;
            image[i][j].rgbtBlue = image[i][width - j - 1].rgbtBlue;
            image[i][width - j - 1].rgbtBlue = temp_blue;
        }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE temp[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int sum_red = 0, sum_blue = 0, sum_green = 0;
            float neighbour_counter = 0.0;

            // Get the pixels around
            for (int x = -1; x < 2; x++)
            {
                for (int y = -1; y < 2; y++)
                {
                    // Skip to next iteration if...
                    if (i + x < 0 || i + x > (height - 1) || j + y < 0 || j + y > (width - 1))
                    {
                        continue;
                    }
                    // Add values to sum
                    sum_red += image[i + x][j + y].rgbtRed;
                    sum_green += image[i + x][j + y].rgbtGreen;
                    sum_blue += image[i + x][j + y].rgbtBlue;
                    neighbour_counter++;
                }
                // Set new RGB values
                temp[i][j].rgbtRed = round(sum_red / neighbour_counter);
                temp[i][j].rgbtGreen = round(sum_green / neighbour_counter);
                temp[i][j].rgbtBlue = round(sum_blue / neighbour_counter);
            }
        }

    }

    //copy the blur image to the original image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j].rgbtRed = temp[i][j].rgbtRed;
            image[i][j].rgbtGreen = temp[i][j].rgbtGreen;
            image[i][j].rgbtBlue = temp[i][j].rgbtBlue;
        }
    }

    return;
}
