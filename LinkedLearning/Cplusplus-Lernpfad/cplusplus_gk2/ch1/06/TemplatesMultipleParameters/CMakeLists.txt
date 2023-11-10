cmake_minimum_required(VERSION 3.5)

project(TemplatesMultipleParameters LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(TemplatesMultipleParameters main.cpp)

install(TARGETS TemplatesMultipleParameters
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
