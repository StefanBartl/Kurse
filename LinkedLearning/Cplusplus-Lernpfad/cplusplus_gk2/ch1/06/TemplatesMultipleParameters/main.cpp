#include <iostream>
#include <string>

template<typename TYPE1, typename TYPE2>
void print(TYPE1 a1, TYPE2 a2)
{
    std::cout << a1 << ", " << a2 << std::endl;
}

int main()
{
    int a = 3;
    float b = 3.14f;
    const std::string text = "Hello World";

    print(a, b);
    print(b, text);
    print(b, b);

    return 0;
}
