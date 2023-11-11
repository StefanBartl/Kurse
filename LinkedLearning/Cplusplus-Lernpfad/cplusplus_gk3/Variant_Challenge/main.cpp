#include <iostream>
#include <variant>

int main()
{
    std::variant<int, float, std::string> number;

  	// TODO: Wir sind an der Ausgabe des Datentyps nicht interessiert, 
    // sondern nur den Wert der Variable.
    // Funktionsobjekt "tellme" soll komplett gelöscht werden. 
    // Für die Wertausgabe bitte std::visit nutzen.
    auto tellme = [](const auto &number)
    {
        switch(number.index()) {
         case 0:
           std::cout << "Ich bin ein int" << std::endl; 
           std::cout << std::get<0>(number) << std::endl; break;
         case 1:
           std::cout << "Ich bin ein float" << std::endl; 
           std::cout << std::get<1>(number) << std::endl; break;
         case 2:
           std::cout << "Ich bin ein std::string" << std::endl;
           std::cout << std::get<2>(number) << std::endl; break;
        }
    };

    auto tellVal = [&](auto const &e){
      std::cout << "Echt?" << std::endl;
      std::cout << e << std::endl;
    };

    number = 44;
    std::visit(tellVal, number);

    number = 42;
    tellme(number);

    number = "fourteen";
    tellme(number);

    number = 15.5f;
    tellme(number);

    number = 16.3f;
    std::visit([&](auto const& e) {
      std::cout << e << std::endl;
    }, number);

    return 0;
}
