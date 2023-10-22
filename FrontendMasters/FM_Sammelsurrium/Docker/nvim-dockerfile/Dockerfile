FROM node:14

# Installiere Neovim
RUN apt-get update && apt-get install -y neovim
# RUN mkdir -p /root/.config/nvim
# COPY ./nvim /root/.config/nvim

# Copy Bash Config
# COPY ./bash/.bashrc /root/
# COPY ./bash/.bash_aliases /root/
# COPY ./lua-language-server /root/Development/

# Installiere die erforderlichen Pakete und Tools
RUN apt-get update && apt-get install -y \
    build-essential \
    cargo \
    cmake \
    curl \
    default-jdk \
    fd-find \
    fzf \
    gcc \
    grep \
    lua5.3 \
    make \
    perl \
    python3 \
    ruby \
    rustc

# Installiere globale npm-Pakete
# RUN npm install -g neovim tree-sitter-cli live-server

# Installiere CPAN und Perl-Module
RUN apt-get install -y cpanminus \
    && cpan App::cpanminus \
    && cpanm --local-lib=~/perl5 local::lib \
    && eval $(perl -I ~/perl5/lib/perl5/ -Mlocal::lib)

# Installiere Composer (PHP)
# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#    && php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
#    && php composer-setup.php \
#    && php -r "unlink('composer-setup.php');"