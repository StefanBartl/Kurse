#include <iostream>

// TODO: Die Klasse Calculator mit den Methoden 
// getMulti und getAdder ausstatten und mit diesen
// die entsprechenden Lambdas für die Operationen zurückgeben.
// In der Main-Funktion sind diese Lambdas dann anzuwenden.
class Calculator {
public:
      auto getMulti(){
        return [](const int x, const int y){
          return x * y;
        };
      };
      
      auto getAdder(){
        return [](const int x, const int y){
          return x + y;
        };
      };
};

int main()
{
  auto calc = Calculator();

  auto myMulti = calc.getMulti();
  auto myAdder = calc.getAdder();

  std::cout << myMulti(3, 3) << std::endl;
  std::cout << myAdder(3, 3) << std::endl;
 
  return 0;
}
