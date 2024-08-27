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

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // Create temp image
    RGBTRIPLE temp[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            temp[i][j] = image[i][j];
        }
    }

    // Declare Sobel arrays
    int Sobel_GX[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int Sobel_GY[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

    // Loop through image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Initialise RGB GX values
            float gx_red = 0, gx_blue = 0, gx_green = 0, gy_red = 0, gy_blue = 0, gy_green = 0;
            // For each pixel, loop vertical and horizontal
            for (int x = -1; x < 2; x++)
            {
                for (int y = -1; y < 2; y++)
                {
                    // Skip to next iteration if...
                    if (i + x < 0 || i + x > (height - 1) || j + y < 0 || j + y > (width - 1))
                    {
                        continue;
                    }

                    // ...if not, add up
                    gx_red += temp[i + x][j + y].rgbtRed * Sobel_GX[x + 1][y + 1];
                    gx_green += temp[i + x][j + y].rgbtGreen * Sobel_GX[x + 1][y + 1];
                    gx_blue += temp[i + x][j + y].rgbtBlue * Sobel_GX[x + 1][y + 1];
                    gy_red += temp[i + x][j + y].rgbtRed * Sobel_GY[x + 1][y + 1];
                    gy_green += temp[i + x][j + y].rgbtGreen * Sobel_GY[x + 1][y + 1];
                    gy_blue += temp[i + x][j + y].rgbtBlue * Sobel_GY[x + 1][y + 1];
                }
            }

            // Calculate new RGB values
            int red = round(sqrt(gx_red * gx_red + gy_red * gy_red));
            int green = round(sqrt(gx_green * gx_green + gy_green * gy_green));
            int blue = round(sqrt(gx_blue * gx_blue + gy_blue * gy_blue));
            // Assign initialiazed RGB values or cut it by 255
            image[i][j].rgbtRed = (red > 255) ? 255 : red;
            image[i][j].rgbtBlue = (blue > 255) ? 255 : blue;
            image[i][j].rgbtGreen = (green > 255) ? 255 : green;
        }
    }

    return;
}
