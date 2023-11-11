#include <vector>
#include <algorithm>

#include <iostream>
#include <tuple>


int main()
{
    // Id, Name, Age
    auto michael = std::make_tuple<int, std::string, float>(0, "Michael", 34.3f);
    auto laura = std::make_tuple<int, std::string, float>(20, "Laura", 31.3f);

    auto printData = [](const std::tuple<int, std::string, float> &p)
    {
        std::cout << "(" << "ID   = " << std::get<0>(p) << ", "
                         << "Name = " << std::get<1>(p) << ", "
                         << "Age  = " << std::get<2>(p) << ")";
        std::cout << std::endl;
    };

    // TODO: Schreiben Sie mit Hilfe von Structured Binding eine Definition hin,
    // bei der die Variablen laura_id, laura_name und laura_age entstehen und 
    // die Werte direkt aus dem 3-Tuple Objekt Laura extrahiert werden.    
    auto [laura_id, laura_name, laura_age] = laura;
    std::cout << "laura_id = "<< laura_id << std::endl;
    std::cout << "laura_name = "<< laura_name << std::endl;
    std::cout << "laura_age = "<< laura_age << std::endl;

    printData(michael);
    printData(laura);

    std::cout << std::endl;

    return 0;
}
