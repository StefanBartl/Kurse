#include <iostream>
#include <utility>
#include <vector>

using namespace std;

void bar() noexcept(true) // == noexcept
{}

void baz() noexcept(false)
{
    throw 1;
}

void may_throw();
void no_throw() noexcept;

int main()
{
    try
    {
        bar();
        baz();
    }
    catch(...)
    {
        cout << "Exception just got thrown." << endl;
    }

    cout << boolalpha
         << "bar: " << noexcept (bar()) << endl
         << "baz: " << noexcept (baz()) << endl
         << "may_throw: " << noexcept (may_throw()) << endl
         << "no_throw: " << noexcept (no_throw()) << endl;

    return 0;
}
