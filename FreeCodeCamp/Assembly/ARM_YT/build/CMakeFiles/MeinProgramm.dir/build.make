# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.27

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = "C:/Program Files/CMake/bin/cmake.exe"

# The command to remove a file.
RM = "C:/Program Files/CMake/bin/cmake.exe" -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build

# Include any dependencies generated for this target.
include CMakeFiles/MeinProgramm.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/MeinProgramm.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/MeinProgramm.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/MeinProgramm.dir/flags.make

CMakeFiles/MeinProgramm.dir/proc.asm.obj: CMakeFiles/MeinProgramm.dir/flags.make
CMakeFiles/MeinProgramm.dir/proc.asm.obj: C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/proc.asm
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building ASM object CMakeFiles/MeinProgramm.dir/proc.asm.obj"
	"C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-as.exe" $(ASM_DEFINES) $(ASM_INCLUDES) $(ASM_FLAGS) -o CMakeFiles/MeinProgramm.dir/proc.asm.obj -c C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/proc.asm

CMakeFiles/MeinProgramm.dir/proc.asm.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing ASM source to CMakeFiles/MeinProgramm.dir/proc.asm.i"
	"C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-as.exe" $(ASM_DEFINES) $(ASM_INCLUDES) $(ASM_FLAGS) -E C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/proc.asm > CMakeFiles/MeinProgramm.dir/proc.asm.i

CMakeFiles/MeinProgramm.dir/proc.asm.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling ASM source to assembly CMakeFiles/MeinProgramm.dir/proc.asm.s"
	"C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-as.exe" $(ASM_DEFINES) $(ASM_INCLUDES) $(ASM_FLAGS) -S C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/proc.asm -o CMakeFiles/MeinProgramm.dir/proc.asm.s

# Object files for target MeinProgramm
MeinProgramm_OBJECTS = \
"CMakeFiles/MeinProgramm.dir/proc.asm.obj"

# External object files for target MeinProgramm
MeinProgramm_EXTERNAL_OBJECTS =

MeinProgramm.exe: CMakeFiles/MeinProgramm.dir/proc.asm.obj
MeinProgramm.exe: CMakeFiles/MeinProgramm.dir/build.make
MeinProgramm.exe: CMakeFiles/MeinProgramm.dir/objects1.rsp
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking ASM executable MeinProgramm.exe"
	"C:/Program Files/CMake/bin/cmake.exe" -E rm -f CMakeFiles/MeinProgramm.dir/objects.a
	C:/Strawberry/c/bin/ar.exe qc CMakeFiles/MeinProgramm.dir/objects.a @CMakeFiles/MeinProgramm.dir/objects1.rsp
	"C:\\ProgramData\\chocolatey\\lib\\gcc-arm-embedded\\tools\\gcc-arm-none-eabi-10.3-2021.10\\bin\\arm-none-eabi-as.exe" -g -Wl,--whole-archive CMakeFiles/MeinProgramm.dir/objects.a -Wl,--no-whole-archive -o MeinProgramm.exe -Wl,--out-implib,libMeinProgramm.dll.a -Wl,--major-image-version,0,--minor-image-version,0 

# Rule to build all files generated by this target.
CMakeFiles/MeinProgramm.dir/build: MeinProgramm.exe
.PHONY : CMakeFiles/MeinProgramm.dir/build

CMakeFiles/MeinProgramm.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/MeinProgramm.dir/cmake_clean.cmake
.PHONY : CMakeFiles/MeinProgramm.dir/clean

CMakeFiles/MeinProgramm.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build C:/Development/BauhausCoder/Kurse/FreeCodeCamp/Assembly/ARM_YT/build/CMakeFiles/MeinProgramm.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : CMakeFiles/MeinProgramm.dir/depend

