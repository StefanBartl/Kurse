#include <iostream>

// TODO: Eine Fold Expression schreiben, bei eine SmallPrint
// Funktion mit beliebiger Anzahl und unterschiedlicher Parameter 
// die Werte über std::cout hintereinander ausgegeben werden können.
// HINWEIS: Klammern bei Erstellung des Faltungsausdrucks beachten.
// Hilfreiche URL: https://en.cppreference.com/w/cpp/language/fold

int main()
{
  SmallPrint("Mustermann", " ist ", 30.5f, " Jahre alt.");
  SmallPrint("Hello LinkedIn", ". ", "I am learning C++", 17, " ", "today");
}