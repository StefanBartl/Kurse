#include <iostream>
#include <filesystem>

int main()
{
  namespace fs = std::filesystem;

  fs::path myFilepath(".\\ch.txt");

  // TODO: Datei ch.txt soll nach so.txt umbenannt werden.
  // Danach den Inhalt der Datei ausgeben lassen.

  return 0;
}
