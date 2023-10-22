alias updateOS='sudo apt-get update && sudo apt-get -y dist-upgrade && sudo apt upgrade -y && sudo apt-get autoclean && sudo apt-get update'
alias o='/usr/bin/xdg-open'
alias ~='cd ~/'
alias nvim='~/nvim-linux64/bin/nvim'
alias downloads='cd ~/Downloads'
alias nsync='nvim -c "PackerSync"'
# Alias für das sofortige Löschen ohne Bestätigung
alias remove='rm -rf'


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
alias all='cd ~/.config/nvim && git fetch && git status && cd ~/Development/BauhausCoder/Kurse && git fetch && git status && cd ~/Development/LinuxFiles && git fetch && git status && cd ~/Development/'
alias cpalias="cp ~/Development/LinuxFiles/.bash_aliases ~/"
alias cpvorlagen="cp ~/Development/LinuxFiles/MyFiles/Vorlagen ~/"

# Skripte
alias m_scripts='~/Development/LinuxFiles/MyBash/manage_scripts.sh'
alias m_software='~/Development/LinuxFiles/MyBash/manage_software.sh'
alias install_pkg='~/Development/LinuxFiles/MyBash/install_pkg.sh'
alias m_git='~/Development/LinuxFiles/MyBash/manage_git.sh'
alias pdf_zu_bilder='~/Development/LinuxFiles/MyPython/pdf_zu_bilder.py'
alias relief='~/Development/LinuxFiles/MyBash/relief.sh'
