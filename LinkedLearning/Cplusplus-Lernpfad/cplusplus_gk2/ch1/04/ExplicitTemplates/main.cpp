#include <iostream>
#include <string>

template <typename T>
T add (const T a, const T b)
{
    return a+b;
}

int main()
{    
    float fSum = add<int>(3.5f, 3.6f);
    float iSum = add<float>(3, 3);

    std::cout << fSum << std::endl;
    std::cout << iSum << std::endl;
    return 0;
}
