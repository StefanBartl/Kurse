#include <iostream>
#include <list>
#include <forward_list>

int main()
{
    std::list<int> myList;
    std::forward_list<int> myForwardList;

    for(int i=0 ; i<7 ; i++)
    {
        myList.push_front(i);
        myForwardList.push_front(i);
    }

    for(int i=0 ; i<7 ; i++)
    {
        myList.push_back(100+i);
    }

    for(int i=0 ; i<7 ; i++)
    {
        myList.push_front(200+i);
    }

    auto it = myList.end();
    it--;
    myList.insert(it, 500);

    it--; it--;

    it = myList.erase(it);
    it--;
    myList.erase(it);

    std::cout << "myList :" << std::endl;
    for(const auto val : myList)
    {
        std::cout << val << std::endl;
    }

    std::cout << "std::forward_list :" << std::endl;
    for(const auto val : myForwardList)
    {
        std::cout << val << std::endl;
    }

    return 0;
}
