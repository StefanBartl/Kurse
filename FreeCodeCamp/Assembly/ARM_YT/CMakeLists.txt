# Mindestversion von CMake festlegen
cmake_minimum_required(VERSION 3.0)

# Projektname festlegen
project(MeinProjekt)

# CMake auf die ARM-Architektur ausrichten
set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR arm)

# C-Assembler-Sprache festlegen
enable_language(ASM)

# Hinzufügen der Assembler-Datei zu deinem Projekt
add_executable(MeinProgramm proc.asm)

# Pfade zur GNU ARM Embedded Toolchain konfigurieren
set(CMAKE_C_COMPILER "C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-gcc.exe")
set(CMAKE_ASM_COMPILER "C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-as.exe")