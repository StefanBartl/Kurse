#include <iostream>
#include <string>

int main(){

    std::cout << "WKD C++ Testprogramm!" << std::endl;
    std::cout << "Testeingabe erwünscht? (Ja oder Nein)" << std::endl;
    std::string userInput;
    bool isYes = false;
    std::cin >> userInput;
    if (userInput == "ja" || userInput == "Ja" || userInput == "JA" || userInput == "jA" || userInput == "1") {
        isYes = true;
    }

    if (isYes) {
        std::cout << "Du hast mit Ja geantwortet." << std::endl;
            std::string myString;
            std::cout << "Eingabe: " << std::endl;
            std::cin >> myString;
            myString += " plus + WKD!";
            std::cout << myString << std::endl;
    } else {
        std::cout << "Du hast mit Nein geantwortet." << std::endl;
    }

    std::cout << "Schönen Tag noch, keep on rock'in!" << std::endl;
    std::cout << "WKD C++ Testprogramm ENDE" << std::endl;

    return 0;
}