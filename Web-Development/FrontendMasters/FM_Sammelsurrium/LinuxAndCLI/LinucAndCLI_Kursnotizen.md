# Complete Intro to Linux and the Command-Line / Brian Holt, Snowflake / Mitte September, 23`

## Takeaways

+ *ctrl-r* starts using  history for reverse search in CLI.
+ `echo` doesnt read from *stdin*, but `cat`
	```
	# Preparations:
	# create file.txt with text
	$ echo Wahnsinn! > file.txt
	# print to terminal
	$ cat file.txt
	# Terminal output
	$ Wahnsinn!
	
	# cat & echo examples:
	
	$ cat file,txt >> echo 	# Doesn't work because >> means 'append to file'. Creates a 'echo' file
	
	$ cat file.txt | echo	# Doesn't work because echo can't read stdin
	
	$ cat file.txt | echi hi # Just print 'hi' to terminal, 'cat file.txt |' is ignored because echo can't read from stdin

	$ cat file.txt | cat # prints text to terminal, because cat can read from stdin 
	```

+ `ps aux` prints processes. `ps aux | grep ....` searches for specific processes
+ Find and replace text in a file
	`$ sed 's/old_text/new_text/g' file.txt`
+ Display system information about CPU and memory
	`$ lscpu`
+ `printenv` prints all environment variables



## Understanding Foreground and Background Processes in the Command Line

When working with the command line interface (CLI), it's important to understand the concept of foreground and background processes. These concepts play a crucial role in how commands are executed and how you interact with them.

### Foreground Process

A foreground process is a currently active process that is running in the foreground of your terminal. Here are some key characteristics of foreground processes:


+ Example of a Foreground Process

	`$ ls`

The 'ls' command runs in the foreground, and you see its output directly in the terminal.

When you execute a command in the CLI, it typically runs in the foreground by default.
You can see the command's output directly in the terminal, and it waits for your input to provide additional information or to terminate.
To stop a foreground process, you can use the Ctrl+C keyboard shortcut. This sends an interrupt signal to the process, causing it to terminate gracefully.

+ Background Process

A background process, on the other hand, runs separately from the active terminal session. Here's what you need to know about background processes:


### Example of a Background Process

	`$ sleep 10 &`

+ The 'sleep' command runs in the background and doesn't display its output in the terminal.

You can start a command as a background process by appending an ampersand (&) to the end of the command, e.g., command &.
Background processes don't display their output in the terminal by default.

You can continue to use the terminal for other tasks while a background process runs in the background.
Background processes can be brought to the foreground, allowing you to interact with them, or they can be sent back to the background.

+ Practical Use Cases

Understanding foreground and background processes is essential for efficient command-line usage:

Foreground processes are ideal for commands that require your immediate attention or input, such as text editors, interactive programs, or scripts that need user interaction.

### Example of an Interactive Foreground Process

	`$ nano myFile.txt`

+ The 'nano' text editor runs in the foreground and allows you to edit the file interactively.

Background processes are useful when you want to run a command without tying up your terminal. For instance, you might start a long-running script in the background while you continue working on other tasks.

### Example of Running a Script in the Background

	`$ ./long_running_script.sh &`

+ The script runs in the background, and you can use the terminal for other tasks.

Managing Foreground and Background Processes
Here are some common commands for managing foreground and background processes:

To view all running processes in the foreground and background, use the jobs command.

+ List All Running Jobs

	`$ jobs`

+ Move a Job to the Background

	`$ bg %1`

To bring a background process to the foreground, use the fg command followed by the job number.

+ Bring a Job to the Foreground

	`$ fg %1`

To send a process to the background when it's running in the foreground, press Ctrl+Z to pause it, and then use the bg command.

+ Pause a Job and Send it to the Background

	`$ Ctrl+Z`
	`$ bg %1`

### Conclusion

Understanding how foreground and background processes work in the CLI allows you to manage and multitask effectively. Whether you need to run a command in the foreground for immediate interaction or in the background for efficiency, these concepts are essential for command-line proficiency.
