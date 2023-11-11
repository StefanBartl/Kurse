#include <iostream>
#include <string_view>


int main() {

    const char *name = "Max Mustermann";
    std::string_view data(name);
    const auto sepPos = data.find(" ");

    std::cout << "First Name: " << data.substr(0, sepPos) << std::endl;
    std::cout << "Second Name: " << data.substr(sepPos+1) << std::endl;

    return 0;
}
