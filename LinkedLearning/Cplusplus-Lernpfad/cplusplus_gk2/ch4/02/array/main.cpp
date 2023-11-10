#include <iostream>
#include <array>


int main()
{
    std::array<int, 16> myRange;
    //int myRange[16]

    myRange.fill(200);

    std::cout << "The size is " << myRange.size() << std::endl;

    myRange[10] = 155;

    for(auto it=myRange.begin() ; it!=myRange.end() ; it++ )
    {
        std::cout << *it << std::endl;
    }


    return 0;
}
