#include <optional>
#include <iostream>
#include <string>

// TODO: ParseInt so umschrieben und anpassen, 
// dass mit Hilfe von Optionals eine richtige Prüfung der Argumente stattfindet.
// HINWEIS: mit return { } kann das optional als undefined zurückgegeben werden.

int ParseInt(char* arg){
    try{
        return { std::stoi(std::string(arg)) };
    }
    catch (...){
        std::cout << "Cannot convert " << arg << std::endl;
    }

    return -1;
}

int main(int argc, char* argv[]) {
    if (argc >= 3) {
        auto oFirst = ParseInt(argv[1]);
        auto oSecond = ParseInt(argv[2]);
        
        const auto first = oFirst;
        const auto second = oSecond;
        std::cout << first << " + " << second << " = " << first+second << std::endl;        
    }
}