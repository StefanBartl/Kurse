:<<'END'

# Funktion zur Anzeige der System-Uptime
function system_uptime() {
    local uptime=$(uptime -p)
    echo $uptime
}

# Funktion, um den aktuellen Git-Branch anzuzeigen
function git_prompt_info() {
    if [[ -n $(git rev-parse --git-dir 2> /dev/null) ]]; then
        local branch_name=$(git symbolic-ref --short HEAD 2> /dev/null)
        if [[ -n $branch_name ]]; then
            echo "[$branch_name]"
        fi
    fi
}

# Funktion zur Anzeige des Git-Repository-Status
function git_prompt_status() {
    if [[ -n $(git rev-parse --git-dir 2> /dev/null) ]]; then
        local git_status=$(git status --porcelain 2> /dev/null)
        if [[ -n $git_status ]]; then
            echo " $fg[red]*"
        else
            echo " $fg[green]+"
        fi
    fi
}

function set_prompt() {
    if [[ -n $(git rev-parse --git-dir 2> /dev/null) ]]; then
        local staged_files=$(git diff --staged --name-only | wc -l)
        local staged_dirs=$(git diff --staged --name-only -- ./* | awk -F'/' '{print $1}' | uniq | wc -l)
        local commit_count=$(git rev-list --count HEAD 2>/dev/null)
        local uptime_formatted=$(system_uptime)  # Füge die System-Uptime hinzu

        PS1='%{$PR_SET_CHARSET$PR_STITLE%}${(e)PR_TITLEBAR}\
%{$PR_CYAN$PR_SHIFT_IN$PR_ULCORNER$PR_HBAR$PR_SHIFT_OUT$PR_GREY(\
%{$PR_GREEN%$PR_PWDLEN<...<%~%<<\
%{$PR_GREY%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR$PR_HBAR%${(e)PR_FILLBAR}$PR_HBAR$PR_SHIFT_OUT$PR_GREY(\
%{$PR_CYAN%}%(!.%SROOT%s.%n)%{$PR_GREY%}@$PR_GREEN%m:%l\
%{$PR_GREY%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR$PR_URCORNER$PR_SHIFT_OUT\
%{$PR_CYAN$PR_SHIFT_IN$PR_LLCORNER$PR_BLUE$PR_HBAR$PR_SHIFT_OUT(\
%{$PR_YELLOW%D{%H:%M:%S}\
%{$PR_BLUE%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR\
%{$PR_GREEN%} [%{$fg[cyan]%}'$uptime_formatted'%{$reset_color%}]%{$fg[cyan]%}$PR_HBAR\
%{$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT\
>%{$reset_color%}'

        PS2='%{%}%G✹%{%}'
    else
        # Hier wird die ursprüngliche Prompt ohne Git-Informationen und mit Uptime angezeigt
        local uptime_formatted=$(system_uptime)

        PS1='%{$PR_SET_CHARSET$PR_STITLE%}${(e)PR_TITLEBAR}\
%{$PR_CYAN$PR_SHIFT_IN$PR_ULCORNER$PR_HBAR$PR_SHIFT_OUT$PR_GREY(\
%{$PR_GREEN%$PR_PWDLEN<...<%~%<<\
%{$PR_GREY%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR$PR_HBAR%${(e)PR_FILLBAR}$PR_HBAR$PR_SHIFT_OUT$PR_GREY(\
%{$PR_CYAN%}%(!.%SROOT%s.%n)%{$PR_GREY%}@$PR_GREEN%m:%l\
%{$PR_GREY%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR$PR_URCORNER$PR_SHIFT_OUT\
%{$PR_CYAN$PR_SHIFT_IN$PR_LLCORNER$PR_BLUE$PR_HBAR$PR_SHIFT_OUT(\
%{$PR_YELLOW%D{%H:%M:%S}\
%{$PR_BLUE%})%{$PR_CYAN%}$PR_SHIFT_IN$PR_HBAR\
%{$PR_GREEN%} [%{$fg[cyan]%}'$uptime_formatted'%{$reset_color%}]%{$fg[cyan]%}$PR_HBAR\
%{$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT\
>%{$reset_color%}'

        PS2='%{%}%G✹%{%}'
    fi
}

set_prompt

END

# Funktion, um den Git-Status abzurufen
git_prompt() {
  if git rev-parse --is-inside-work-tree &>/dev/null; then
    local branch_name=$(git branch --show-current)
    echo "%F{green}git(%F{white}${branch_name}%F{green})%F{reset} "
  fi
}

# Konfiguration der Zsh-Prompt
PROMPT='[%F{magenta}%1~%f]$(git_prompt)%F{lightgray}>%F{reset} '

