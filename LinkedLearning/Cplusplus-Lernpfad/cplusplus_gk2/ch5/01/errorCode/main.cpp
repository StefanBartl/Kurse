#include <iostream>
#include <fstream>

int tryOpenFile()
{
    std::ifstream theFile("Idontexist.txt");

    if(!theFile)
    {
        std::cout << "File Idontexist.txt could not be opened" << std::endl;
        return 1;
    }

    for(int n; theFile >> n; )
    {
       std::cout << n << ' ';
    }

    std::cout << std::endl;

    if (theFile.bad())
    {
        std::cout << "I/O error while reading" << std::endl;
        return 4;
    }
    else if (theFile.eof())
    {
        std::cout << "End of file reached successfully" << std::endl;
        return 3;
    }
    else if (theFile.fail())
    {
        std::cout << "Non-integer data encountered" << std::endl;
        return 2;
    }

    return 0;
}

int main()
{

    int code = 0;
    if((code = tryOpenFile()) != 0)
    {
        std::cout << "Error trying to read file. Code: " << code << std::endl;
        return 1;
    }

    return 0;
}
