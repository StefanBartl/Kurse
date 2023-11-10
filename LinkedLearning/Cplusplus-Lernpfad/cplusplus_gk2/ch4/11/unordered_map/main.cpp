#include <iostream>
#include <map>
#include <unordered_map>
#include <cmath>
#include <chrono>


template <typename T>
void buildPotTable(T &cont)
{
    for(int i=0 ; i<10 ; i++)
    {
        cont[std::pow(10, i)] = i;
    }
}


int main()
{
    // Zehnertabelle, welche den Exponenten der Basis 10 zurückgibt.
    std::map<int, int> potTenTable;
    std::unordered_map<int, int> unorderedPotTenTable;

    std::chrono::duration<double, std::milli> durationOrdered_ms;
    std::chrono::duration<double, std::milli> durationUnordered_ms;

    {
        auto t1 = std::chrono::high_resolution_clock::now();
        buildPotTable(potTenTable);
        auto t2 = std::chrono::high_resolution_clock::now();
        durationOrdered_ms = t2 - t1;
    }

    {
        auto t1 = std::chrono::high_resolution_clock::now();
        buildPotTable(unorderedPotTenTable);
        auto t2 = std::chrono::high_resolution_clock::now();
        durationUnordered_ms = t2 - t1;
    }


    std::cout << std::endl;
    std::cout << "Ordered Map:" <<  std::endl;
    std::cout << "Time for building Table (ms): " << durationOrdered_ms.count() << std::endl;
    for(auto &pair : potTenTable)
    {
        auto key = pair.first;
        std::cout << "potTenTable[" << key << "] = " << potTenTable[key] << std::endl;
    }

    std::cout << std::endl;
    std::cout << "Unordered Map:" <<  std::endl;
    std::cout << "Time for building Table (ms): " << durationUnordered_ms.count() << std::endl;
    for(auto &pair : unorderedPotTenTable)
    {
        auto key = pair.first;
        std::cout << "unorderedPotTenTable[" << key << "] = " << potTenTable[key] << std::endl;
    }

    return 0;
}
