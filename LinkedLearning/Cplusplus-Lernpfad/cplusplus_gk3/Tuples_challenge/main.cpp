#include <vector>
#include <algorithm>

#include <iostream>
#include <tuple>


int main()
{
    // Id, Name, Age
    // TODO: Deklariere eine Variable, die Id, Name und Age in einem Tupel festhält.
    // Wir nennen diese Variablen "bernhard" und "julia".
    std::tuple<int, std::string, float> bernhard {1, "Bernhard", 19.4};
    std::tuple<int, std::string, float> julia {1, "Julia", 65.5};
    // oder
    auto guenther = std::make_tuple<int, std::string, float>(3, "Guenther", 35.1);
    
    auto printData = [](const std::tuple<int, std::string, float> &p)
    {
            std::cout   << "ID: " << std::get<0>(p) << ", " 
                        << "Name: " << std::get<1>(p) << ", "
                        << "Age: " << std::get<2>(p);
            std::cout << std::endl;
    };

    printData(bernhard);
    printData(julia);
    printData(guenther);
    std::cout << std::endl;

    return 0;
}
