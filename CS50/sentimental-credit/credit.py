# TODO
# Implement a program that determines whether a provided credit card number is valid according to Luhn’s algorithm.

from cs50 import get_int

# Get credit card number (ccn)
card_number = get_int("Please enter credit card number: ")

# Get ccn length
length = len(str(card_number))

# Check if length is valid
if length != 13 and length != 15 and length != 16:
    print("INVALID")

# Luhn Algorhytm
sum = 0
odd_or_even = length & 1
str_card_number = str(card_number)
for count in range(0, length):
    digit = int(str_card_number[count])
    if not ((count & 1) ^ odd_or_even):
        digit = digit * 2
    if digit > 9:
        digit = digit - 9
    sum = sum + digit

# Proof checksum with "Luhn Algorithym"
if (sum % 10) != 0:
    print("INVALID")

# Get the two leading digits
two_digits = int(str_card_number[0] + str_card_number[1])
first_digit = int(str_card_number[0])

# Check and response credit card company
if two_digits == 51 or two_digits == 52 or two_digits == 53 or two_digits == 54 or two_digits == 55:
    print("MASTERCARD")
elif two_digits == 34 or two_digits == 37:
    print("AMEX")
elif first_digit == 4:
    print("VISA")
else:
    print("INVALID")