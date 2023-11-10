#include <iostream>

void print()
{}

template <typename TYPE, typename... Args>
void print(TYPE var, Args... args)
{
    std::cout << var;
    print(args...);
}

int main()
{
    print("Hi The number ", 1, " respresents something like ", 1.2f, "\n");

    return 0;
}
