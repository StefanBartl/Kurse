check50 error:

:( quote handles valid ticker symbol
    expected to find "28.00" in page, but it wasn't found

Cause:
expected to find "28.00" in page, but it wasn't found
Log:
sending GET request to /signin
sending POST request to /login
sending POST request to /quote
checking that status code 200 is returned...
checking that "28.00" is in page

My problem with that cause:
I can't find out what doesn't match the requirments exactly. Sure i see that cs50 makes  POST request to /quote, so it must be a ticker symbol and normaly one would expect, that there is the price on the page. But: It is! I played aroud with letting the Dollar Symbol $ away or put the price in "", which of course was not the correct answer. I don't know if this is a missunderstanding from my side or maybe a language  translation thing, since i', native german, but i don't know.

It's so bitter because I always want to do all 10 points, but there's something I'm not interpreting correctly. Sorry!

With respect and best regards,

Stefan