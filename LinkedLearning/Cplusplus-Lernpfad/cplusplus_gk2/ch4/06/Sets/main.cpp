#include <iostream>
#include <set>
#include <string>

int main()
{
    std::set<std::string> names;

    names.insert("John");
    names.insert("Steve");
    names.insert("Alan");
    names.insert("Josh");
    names.insert("Josh");
    names.insert("Jeff");
    names.insert("Jeff");
    names.insert("Bryan");

    for(const auto &name : names)
    {
        std::cout << name << std::endl;
    }

    return 0;
}
