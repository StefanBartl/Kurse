#include <iostream>
#include <fstream>
#include <filesystem>

int main()
{
  namespace fs = std::filesystem;
  std::cout << "Hallo" << std::endl;

  fs::path oldFilepath(".\\ch.txt");
  fs::path myFilepath(".\\so.txt");
  // TODO: Datei ch.txt soll nach so.txt umbenannt werden.
  //oldFilepath.replace_filename("so.txt");
  fs::rename(oldFilepath, myFilepath);
  
  std::cout << "Neuer Dateiname: " << myFilepath.filename() << std::endl;
  // Danach den Inhalt der Datei ausgeben lassen.
  if(fs::exists(myFilepath) && fs::is_regular_file(myFilepath)){
    std::ifstream fileStream(myFilepath);
      if(fileStream.is_open()){
        std::string line;
        while(std::getline(fileStream, line)){
          std::cout << line << std::endl;
        }
        std::cout << "File end" << std::endl;
        fileStream.close();
      } else {
    std::cerr << "Fehler beim öffnen der Datei" << std::endl;
      }
  } else {
    std::cerr << "Datei existiert nicht oder ist keine reguläre Datei" << std::endl;
  }

  return 0;
}
