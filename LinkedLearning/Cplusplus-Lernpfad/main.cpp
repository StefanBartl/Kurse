#include <iostream>
#include <fstream>
#include <filesystem>

int main()
{
    std::cout << "WKD C++ Kursprojekt" << std::endl;
    
    std::filesystem::path test(".\\test.txt");
    if(std::filesystem::exists(test)){
        std::cout << "Datei exisiert" << std::endl;
    }
    std::ifstream stream(test.c_str());
    if(stream.is_open()){
        std::string line;
        while(std::getline(stream, line)){
            std::cout << line << std::endl;
        }
    } else {
        std::cout << "Dateistream nicht gestartet! :-(" << std::endl;
        return 2;
    }

    return 0;
}