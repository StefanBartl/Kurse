#include <iostream>
#include <array>

// TODO: Diese drei Template Funktionen so reduzieren, dass am Ende
// nur noch eine Template Funktion übrig bleibt, die das gleiche Ergebnis liefert.
template<int  N>
constexpr int fibo() {return fibo<N-1>() + fibo<N-2>(); }
template<>
constexpr int fibo<1>() { return 1; }
template<>
constexpr int fibo<0>() { return 0; }

int main()
{
  std::cout << fibo<0>() << std::endl;
  std::cout << fibo<1>() << std::endl;
  std::cout << fibo<2>() << std::endl;
  std::cout << fibo<3>() << std::endl;
  std::cout << fibo<4>() << std::endl;
  std::cout << fibo<5>() << std::endl;
  std::cout << fibo<6>() << std::endl;
  std::cout << fibo<7>() << std::endl;
  std::cout << fibo<8>() << std::endl;

  return 0;
}
