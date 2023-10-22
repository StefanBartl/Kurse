# Colored man pages plugin

# This plugin adds colors to man pages.


plugins+=(colored-man-pages) # will also automatically colorize man pages displayed by dman or debman, from debian-goodies.

# You can also try to color other pages by prefixing the respective command with colored:

# CODE: colored git help clone

# Customization

# The plugin declares global associative array less_termcap, which maps termcap capabilities to escape sequences for the less pager. This mapping can be further customized by the user after the plugin is loaded. Check out sources for more.

# For example: less_termcap[md] maps to LESS_TERMCAP_md which is the escape sequence that tells less how to print something in bold. It's currently shown in bold red, but if you want to change it, you can redefine less_termcap[md] in your zshrc file, after OMZ is sourced:
# CODE: less_termcap[md]="${fg_bold[blue]}" # this tells less to print bold text in bold blue

