cmake_minimum_required(VERSION 3.5)

project(throw LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(throw main.cpp)

install(TARGETS throw
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
