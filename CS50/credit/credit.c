#include <cs50.h>
#include <stdio.h>

// CS50 Problem Set "Credit Card Number Checker"
// This program prompts a user for a credit card number, proof the checksum with the "Luhn Algorithm" and responses the credit card company.

int main(void)
{

    // Get credit card number (ccn)
    long card_number = get_long("Please enter credit card number: \n");

    // Get ccn length
    int length = 0;
    long l = card_number;

    while (l > 0)
    {
        l = l / 10;
        length++;
    }

    // Check if length is valid
    if (length != 13 && length != 15 && length != 16)
    {
        printf("INVALID\n");
        return 0;
    }

    // Calculate checksum
    long ccn = card_number;
    int sum1 = 0, sum2 = 0, checksum = 0, last_digit = 0, second_digit = 0, sd_1 = 0, sd_2 = 0;
    do
    {
        // Get last digit from running ccn
        last_digit = ccn % 10;
        // Add last digit to sum
        sum1 = sum1 + last_digit;
        // Remove last digit from running ccn
        ccn = ccn / 10;
        // Get second digit
        second_digit = ccn % 10;
        // Double second last digits and add digit to sum2
        second_digit = second_digit * 2;
        sd_1 = second_digit % 10;
        sd_2 = second_digit / 10;
        sum2 = sum2 + sd_1 + sd_2;
        // Remove second digit from running ccn
        ccn = ccn / 10;
    }
    while (ccn > 0);

    // Get checksum
    checksum = sum1 + sum2;

    // Proof checksum with "Luhn Algorithym"
    if (checksum % 10 != 0)
    {
        printf("INVALID\n");
        return 0;
    }

    // Get the two leading digits
    long two_digits = card_number;
    do
    {
        two_digits = two_digits / 10;
    }
    while (two_digits > 100);

    // Check and response credit card company
    if (two_digits == 51 || two_digits == 52 || two_digits == 53 || two_digits == 54 || two_digits == 55)
    {
        printf("MASTERCARD\n");
        return 0;
    }

    else if (two_digits == 34 || two_digits == 37)
    {
        printf("AMEX\n");
        return 0;
    }

    else if (two_digits / 10 == 4)
    {
        printf("VISA\n");
        return 0;
    }

    else
    {
        printf("INVALID\n");
        return 0;
    }

}