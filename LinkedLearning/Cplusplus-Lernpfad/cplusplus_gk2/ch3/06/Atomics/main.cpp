#include <thread>
#include <atomic>
#include <iostream>

int main()
{
    {
        std::atomic<int> c = {0};

        std::thread t1([&] {
            std::cout << "1. Lock." << std::endl;


            std::cout << "1. My turn!" << std::endl;

            for(int i=0 ; i<1000000 ; i++)
                c++;

            std::cout << "1. Still my turn!" << std::endl;

            std::cout << "1. Release" << std::endl;
        });
        std::thread t2([&] {
            std::cout << "2. Lock" << std::endl;

            std::cout << "2. My turn!" << std::endl;
            for(int i=0 ; i<1000000 ; i++)
                c++;

            std::cout << "2. Still my turn!" << std::endl;

            std::cout << "2. Release" << std::endl;
        });

        t1.join();
        t2.join();

        std::cout << "c = " << c << std::endl;
    }

    return 0;
}
