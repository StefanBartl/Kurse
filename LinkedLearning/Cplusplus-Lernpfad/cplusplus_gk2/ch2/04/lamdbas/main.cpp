#include <iostream>
#include <list>


int main()
{
    std::list<int> myList = {23, 50, 0};

    myList.sort( []( const int a, const int b ) { return a > b; } );

    for ( const auto &elem : myList )
    {
        std::cout << elem << std::endl;
    }

    std::cout << std::endl;

    myList.sort( []( const int a, const int b ) { return a < b; } );

    for ( const auto &elem : myList )
    {
        std::cout << elem << std::endl;
    }

    std::cout << std::endl;


    std::list<int> myListDebug = {23, 50, 0};
    std::list<std::string> log;
    myListDebug.sort( [&]( const int a, const int b )
                            {
                                if(a<b){
                                    log.push_back("value is smaller");
                                    return true;
                                }
                                else{
                                    log.push_back("value is greater");
                                    return false;
                                }
                            } );

    for ( const auto &line : log )
    {
        std::cout << line << std::endl;
    }


    for ( const auto &elem : myList )
    {
        std::cout << elem << std::endl;
    }
}
