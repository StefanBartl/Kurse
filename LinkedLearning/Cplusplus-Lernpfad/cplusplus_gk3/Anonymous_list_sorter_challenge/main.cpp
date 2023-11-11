#include <vector>
#include <algorithm>

#include <iostream>

int main()
{
    std::vector <int> myVec = {13, 23, 4, 12, 56, 9, 0, 45};

    // TODO: Hier bitte Code einfügen, um mit Lambda die oben angegebene Liste in aufsteigender Reihenfolge zu sortieren.
    std::sort(myVec.begin(), myVec.end(), [](const int &a, const int &b) -> int { return a < b; });

    for(const auto elem : myVec)
    {
        std::cout << elem << ", ";
    }

    std::cout << std::endl;

    return 0;
}
