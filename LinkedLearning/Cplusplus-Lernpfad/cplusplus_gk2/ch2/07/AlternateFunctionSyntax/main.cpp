#include <iostream>
#include <string>

auto printLine(const std::string &text, const int lim) -> bool
{
    if(text.size() > lim)
        return false;

    std::cout << text << std::endl;
    return true;
}


auto main() -> int
{
    const std::string text = "Hello World";

    if(printLine(text, 10))
    {
        std::cout << "Could not print line. Text is too long" << std::endl;
    }

    if(printLine(text, 3))
    {
        std::cout << "Could not print line. Text is too long" << std::endl;
    }

    return 0;
}
