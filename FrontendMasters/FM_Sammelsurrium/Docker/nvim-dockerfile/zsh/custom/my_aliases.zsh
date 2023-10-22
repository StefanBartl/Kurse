# Verzeichnisse; Funktionieren nur wenn richtig aufgesetzt:
alias ndir='cd ~/.config/nvim && git fetch && git status'
alias nlua='cd ~/.config/nvim/lua/core'
alias nme='cd ~/.config/nvim/NVIMApps&Notizen'
alias dev='cd ~/Development'
alias bau='cd ~/Development/BauhausCoder && git fetch && git status'
alias store='cd ~/Development/BauhausCoder-Store && git fetch && git status'
alias kurse='cd ~/Development/BauhausCoder/Kurse && git fetch && git status'
alias sicpjs='cd ~/Development/BauhausCoder/Kurse/sicpjs && git fetch && git status'
alias fm='cd ~/Development/BauhausCoder/Kurse/Web-Development/FrontendMasters'
alias lf='cd ~/Development/LinuxFiles && git fetch && git status'

# Skripte
alias m_scripts='~/Development/LinuxFiles/MyBash/manage_scripts.sh'
alias m_software='~/Development/LinuxFiles/MyBash/manage_software.sh'
alias install_pkg='~/Development/LinuxFiles/MyBash/install_pkg.sh'
alias m_git='~/Development/LinuxFiles/MyBash/manage_git.sh'
alias pdf_zu_bilder='~/Development/LinuxFiles/MyPython/pdf_zu_bilder.py'
alias relief='~/Development/LinuxFiles/MyBash/relief.sh'

# Allgemeine Aliase;
alias updateOS='sudo apt-get update && sudo apt-get -y dist-upgrade && sudo apt upgrade -y && sudo apt-get autoclean && sudo apt-get update'
alias o='/usr/bin/xdg-open'
alias ~='cd ~/'
alias neovim='~/nvim-linux64/bin/nvim'
alias downloads='cd ~/Downloads'
alias nvim-s='nvim -c "PackerSync"'
alias ls='ls -lsah'

# Alias für das Kopieren von Dateien:
alias cpbashalias="cp ~/Development/LinuxFiles/.bash_aliases ~/"
alias cpzshalias="cp ~/Development/LinuxFiles/oh-my-zsh/custom/my_aliases.zsh ~/"
alias cpvorlagen="cp ~/Development/LinuxFiles/MyFiles/Vorlagen ~/"

# Alias für das sofortige Löschen ohne Bestätigung
alias remove='rm -rf'

# ZSH spezifisch
alias zshconfig="nvim ~/.zshrc"
alias ohmyzsh="nvim ~/.oh-my-zsh"
alias zshcustom="/usr/bin/xdg-open ~/Development/LinuxFiles/oh-my-zsh/custom"
alias zshplugins="/usr/bin/xdg-open ~/Development/LinuxFiles/oh-my-zsh/plugins"
alias zsh_cat_a="cat  ~/Development/LinuxFiles/oh-my-zsh/custom/my_aliases.zsh"
alias zsh_go_a="nvim  ~/Development/LinuxFiles/oh-my-zsh/custom/my_aliases.zsh"

