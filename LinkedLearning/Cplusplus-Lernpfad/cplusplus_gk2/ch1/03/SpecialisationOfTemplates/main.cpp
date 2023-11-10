#include <iostream>
#include <string>

template <typename T>
T add (const T a, const T b)
{
    return a+b;
}

template <>
std::string add (const std::string a, const std::string b)
{
    return a + "Test " + b;
}


int main()
{    
    const std::string helloTxt = "Hello ";
    const std::string worldTxt = "World";

    float fSum = add(3.5f, 3.6f);
    float iSum = add(3, 3);
    auto fullText = add(helloTxt, worldTxt);

    std::cout << fSum << std::endl;
    std::cout << iSum << std::endl;
    std::cout << fullText << std::endl;
    return 0;
}
