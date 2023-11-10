#include <iostream>
#include <vector>


int main()
{
    std::vector<int> myRange;

    for(int i=0 ; i<18 ; i++)
    {
        myRange.push_back(200);
        std::cout << "The capacity is " << myRange.capacity() << std::endl;
    }

    std::cout << std::endl;

    myRange[10] = 155;

    std::cout << "The size of vector is " << myRange.size() << std::endl;

    std::cout << std::endl;

    for(const auto val : myRange )
    {
        std::cout << val << std::endl;
    }


    return 0;
}
