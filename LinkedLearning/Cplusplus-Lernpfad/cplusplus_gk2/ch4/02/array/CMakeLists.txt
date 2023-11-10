cmake_minimum_required(VERSION 3.5)

project(array LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(array main.cpp)

install(TARGETS array
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
