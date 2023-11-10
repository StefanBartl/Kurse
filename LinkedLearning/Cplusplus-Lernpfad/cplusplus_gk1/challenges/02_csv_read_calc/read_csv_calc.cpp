#include <iostream>
// Header Datei für std::ifstream file;
#include <fstream>
#include <sstream>
#include <array>

constexpr int numRows = 4;
constexpr int numCols = 4;

std::array< std::array<float, numCols>, numRows > matrix; // Array-Matrix, wobei ein Array mit 4 Spalten |||| erstellt wird, indem jeder Index ein Array mit weitern Elementen ist.

int main(){

    // Erstelle eine Instanz der std::ifstream-Klasse mit dem Namen 'file'.
    // Diese Instanz wird für das Öffnen und Lesen von Dateien verwendet.
    std::ifstream file("numbers.csv"); // Hier wird 'file' als Objekt der ifstream-Klasse deklariert.

    // Check whether file can be opened
    if (!file.is_open()) {
        std::cerr << "Datei konnte nicht geöffnet werden" << std::endl;
        return 1;
    }

    // Read the matrix from the file
    for ( int rows = 0; rows < numRows; rows++) 
    {
        for( int cols = 0; cols < numCols; cols++) 
        {
            auto &row = matrix[rows];
            file >> row[cols];
        }
    }

std::array<float, numCols> verSum;
std::array<float, numRows> horSum;
horSum.fill(0.0f);
verSum.fill(0.0f);

    // Calculate the sums
    for ( int rows = 0; rows < numRows; rows++) 
    {
        for( int cols = 0; cols < numCols; cols++) 
        {
            auto &row = matrix[rows];
            horSum[rows] += row[cols];
            verSum[cols] += row[cols];
        }
    } 

    // Display the sums

    for (unsigned int i = 0; i < horSum.size(); i++){
        std::cout << "horSum[" << i << "]: " << horSum[i];
        std::cout << std::endl;
    }
    for (unsigned int j = 0; j < verSum.size(); j++){
        std::cout << "verSum[" << j << "]: " << verSum[j];
        std::cout << std::endl;
    }


    return 0;
}