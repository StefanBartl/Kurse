#include <iostream>


int diff(const int a, const int b)
{
    return a-b;
}

int sum(const int a, const int b)
{
    return a+b;
}

int main()
{

    int x = 3;
    int y = 3;
    int z = 30;
    int result;

    int (*operate)(int, int);

    operate = &sum;
    result = operate(30, 3);
    std::cout << result << std::endl;

    operate = &diff;
    result = operate(30, 3);
    std::cout << result << std::endl;

    return 0;
}
