#include <iostream>

#include <memory>
#include <functional>

int main()
{

    int x = 3;
    int y = 3;
    int z = 30;
    int result;


    //int (*calc)(int, int);
    std::function<int(int, int)> calc;
    auto applySum = [](const int a, const int b) -> int { return a+b; };
    auto applyDiff = [](const int a, const int b) -> int { return a-b; };


    calc = applySum;
    result = calc(z,x);
    std::cout << result << std::endl;

    calc = applyDiff;
    result = calc(z,y);
    std::cout << result << std::endl;


    return 0;
}
