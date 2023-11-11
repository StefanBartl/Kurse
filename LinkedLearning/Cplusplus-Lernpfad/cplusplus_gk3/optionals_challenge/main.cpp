#include <optional>
#include <iostream>
#include <string>

// TODO: ParseInt so umschrieben und anpassen, 
// dass mit Hilfe von Optionals eine richtige Prüfung der Argumente stattfindet.
// HINWEIS: mit return { } kann das optional als undefined zurückgegeben werden.

std::optional<int> ParseInt(char* arg){
    try{
        return { std::stoi(std::string(arg)) };
    }
    catch (...){
        std::cout << "Cannot convert " << arg << std::endl;
        return std::nullopt;
    }
}

int main(int argc, char* argv[]) {
    if (argc >= 3) {
        auto oFirst = ParseInt(argv[1]);
        auto oSecond = ParseInt(argv[2]);

        if(oFirst.has_value() && oSecond.has_value()){
            const auto first = oFirst.value();
            const auto second = oSecond.value();
            std::cout << first << " + " << second << " = " << first+second << std::endl;        
        } else return -2;
    }
    std::cerr << "Too less or too many Arguments" << std::endl;
}