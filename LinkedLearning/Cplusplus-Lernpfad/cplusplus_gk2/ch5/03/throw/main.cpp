#include <iostream>
#include <string>
#include <vector>
#include <exception>

int main()
{
    std::vector<std::string> data;

    try
    {
        data.push_back("Test");
        data.push_back("Test2");

        if(data.size() < 10)
        {
            throw "Sorry, your array is too short.";
        }

        std::cout << data.at(10) << std::endl;

        data.push_back("Test3");

        data.push_back("Test5");

    }
    catch(const char *str)
    {
        std::cout << str << std::endl;
        data.push_back("Test after exception thrown with str");
    }
    catch(const std::exception &e)
    {
        std::cout << e.what() << std::endl;

        data.push_back("Test after exception thrown");
    }
    catch(...)
    {
        std::cout << "Unknown Exception caught!" << std::endl;
    }

    for(const auto &text : data)
    {
        std::cout << text << std::endl;
    }

    return 0;
}
