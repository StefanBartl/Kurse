#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Get user name
    string name = get_string("What's your name?\n");
    // Print user name
    printf("Hello, %s\n", name);
}