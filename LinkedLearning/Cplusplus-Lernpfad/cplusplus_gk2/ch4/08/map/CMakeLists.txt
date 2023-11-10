cmake_minimum_required(VERSION 3.5)

project(map LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(map main.cpp)

install(TARGETS map
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
