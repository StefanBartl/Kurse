#include "helpers.h"

void colorize(int height, int width, RGBTRIPLE image[height][width])
{
    // Change all black pixels to a color of your choosing
    // Loop trough height of image
    for (int i = 0; i < height; i++)
    {
        // Loop trough width of image
        for (int y = 0; y <  width; y++)
        {
            // Get running pixel to refer to
            RGBTRIPLE helper_pixel = image[i][y];
            // Check if alle three RGB-Zones of the helper_pixel are set to black (0x00 in Hexadecimal)
            if (helper_pixel.rgbtRed == 0x00 && helper_pixel.rgbtGreen == 0x00 && helper_pixel.rgbtBlue == 0x00)
            {
                // If so, set the pixel (of the image (!), not the "helper_pixel" struct) to the colour darker orange - main of my portfolio :-)
                image[i][y].rgbtRed = 0xe8;
                image[i][y].rgbtGreen = 0xb9;
                image[i][y].rgbtBlue = 0x00;
            }

        }
    }
}
