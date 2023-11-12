-- Keep a log of any SQL queries you execute as you solve the mystery.

-- To open up the fiftyville.db database within sqllite in the terminal to start crime investigation: sqlite3 fiftyville.db

-- Get a overview from the tables in the fiftyville.db database
.tables

-- crime_scene_reports table look interesting, get a look how it is structured
.schema crime_scene_reports

-- Get the crime_scene_report's description for the day of the theft in the street where the duck was stolen
SELECT description FROM crime_scene_reports
    WHERE day=28 AND month=7 AND year=2021 AND street="Humphrey Street";

-- The report mention interviews from 3 persons. Luckily we get a interview table, let's see how its structured
.schema interviews

-- Get the interviews to the case and notate the names in suspect list
SELECT transcript, name FROM interviews WHERE day=28 AND month=7 AND year=2021;

-- Interview hint: Check the ATM transactions table
.schema atm_transactions

-- Let's see if we have luck and get the account_number of the thief
SELECT account_number  FROM atm_transactions
    WHERE atm_location="Leggett Street" AND day=28 AND month=7 AND year=2021 AND transaction_type="withdraw";
-- There are 8 people which withdraw on that day in the Leggett street, notate the account numbers

-- Lets look at the interview hint with the parking car at the bakery, first get a look at the table structure
.schema bakery_security_logs

-- Next look at the license plates in the time of the theft
SELECT license_plate FROM bakery_security_logs
    WHERE day=28 AND month=7 AND year=2021 AND hour=10 AND minute BETWEEN 15 AND 25;
-- There are 8 license plates who come into question

-- Check the license plates against the people database and notate the result
SELECT name, bakery_security_logs.hour, bakery_security_logs.minute FROM people
  JOIN bakery_security_logs ON people.license_plate = bakery_security_logs.license_plate
 WHERE bakery_security_logs.year = 2021
   AND bakery_security_logs.hour = 10
   AND bakery_security_logs.day = 28
   AND bakery_security_logs.month = 7
   AND bakery_security_logs.minute BETWEEN 15 AND 25;

-- There was also a interview hint with phone calls, lets look at the table structure
.schema phone_calls

-- Lets see the caller on this day with a duration under 60 seconds
SELECT caller FROM phone_calls WHERE day=28 AND month=7 AND year=2021 AND duration < 60;

-- Check the possible caller and notate
SELECT name AS phone_caller, phone_calls.duration FROM people
  JOIN phone_calls ON people.phone_number = phone_calls.caller WHERE phone_calls.year = 2021
   AND phone_calls.month = 7
   AND phone_calls.day = 28
   AND phone_calls.duration <= 60;

-- Now check the possible reveiver of the call
SELECT name AS phone_receiver, phone_calls.duration FROM people
  JOIN phone_calls ON people.phone_number = phone_calls.receiver WHERE phone_calls.year = 2021
   AND phone_calls.month = 7
   AND phone_calls.day = 28
   AND phone_calls.duration <= 60;

-- Next look at the interview hint that the thief get the last flight out of fiftyville, lets look at the tbale structure first like ever
.schema airports

-- Lets search for the first flight out oh fiftyville
SELECT flights.id, full_name, city, flights.hour, flights.minute FROM airports
  JOIN flights ON airports.id = flights.destination_airport_id
    WHERE flights.origin_airport_id =
           (SELECT id
              FROM airports
            WHERE city = 'Fiftyville')
   AND flights.year = 2021 AND flights.month = 7 AND flights.day = 29
 ORDER BY flights.hour, flights.minute LIMIT 1;
 -- note that the thief may went to NYC, LaGuardia Airport

 -- Now search the passenger list of that flight and note this
 SELECT passengers.flight_id, name, passengers.passport_number, passengers.seat FROM people
  JOIN passengers ON people.passport_number = passengers.passport_number
  JOIN flights ON passengers.flight_id = flights.id WHERE flights.year = 2021
   AND flights.month = 7
   AND flights.day = 29
   AND flights.hour = 8
   AND flights.minute = 20;

