cmake_minimum_required(VERSION 3.5)

project(AltFun LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(AltFun main.cpp)

install(TARGETS AltFun
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
