#                               ### WKD NVIM KEYS ###

https://schimana.net/2021/neovim-teil-2-bedienung-von-vim-und-nvim-fuer-einsteiger/
Sheet: https://gist.github.com/tuxfight3r/0dca25825d9f2608714b

## Ideen
- Bessere Keys fdür Harpoon finden. altgr+Arrow-Keys?
- Shortcut für das commiten, pushen (mit schließen)
- Escape auf ALTGR - Q legen :: Wie lautet diue Bezeichnung für ALTGR???

### MEINE ! ###

--- Spellchecking auf Deutsch umstellen: 
:setlocal spell spelllang=ger
--- Speichern mit doppelt strg+s 
vim.keymap.set("n", "<C-s><C-s>", "<cmd>:w<CR>")

## Motions
dG löscht alles vom Kursor bis zum Ende
yG kopiert alles vom Cursor bis zum Ende

c macht das gleiche wie d, geht aber I-Mode, was sehr sehr oft eigentlich gemacht wird 
cc löscht die Zeile -> I-Mode
10 cc löscht 10 Zeilen -> I-Mode
C Löscht Zeile ab Cursor -> I-Mode

D löscht Zeile ab Cursor
s löscht char -> I-Mode

fT spring zum nächsten T, fT tum vorherigen -> , und ; für vor und zurück
tT wie f,, TT wie FT -> bleibt aber vor dem char
f und t funktionieren auch in Kombination mit d und t
dt<Space> löscht bis zum nächsten Leerzeichen
{} springt zur nächsten/vorigen leeren Zeile

<C-u><C-d> halbe Seiten springen

## Window-Split
<C-w>+h => Horizontaler Split
<C-w>+v => Vertikaler Split
<C-w>+h/j/k/l => Split Navigation  
<C-w>+o => Beendet alle Splits bis auf den Buffer in welcher der Cursor ist

## Register
:reg
% ist immer aktuelle Datei
# ist die meistgenutzte Datei -> Man kann mit <C-°> hinspringen
- Es wird immer der letzte yank und die letzten 9 deletes gespeichert

Register kann man selbst belegen indem man etwas im V-Modus  markiert und dann "*y eingibt, wobei * die Bezeichnung eines Register ist.
Makros werden auch im Register abgelegt.

## Jumplist
:jumps
Mit <C-o> springt man immer eins in der Jumplist zurück.



## MARKS ###
m + Großbuchstabe setzt Marke die man dann genau in der Zeile mit ' + Großbuchstabe wieder springen kann

## NORMAL MODE ###
EINFG -> toggled zwischen Einfügen-Mode und Ersetzen-Mode 
i: Insert before the cursor.
I: Insert before the first non-blank character of the line.
a: Insert after the cursor.
A: Insert at the end of the line.
o: Begin a new line below the current line and insert.
O: Begin a new line above the current and insert.
gI: Insert at column 1 of the line.
gi: Insert where insert mode was last stopped.
Insert commands take a count ->  3itest<space><esc> to get: test test test 
Insert commands can be repeated with . ->  itest<space><esc> to get: testtesttest
x -> Löscht Symbol unter dem Cursor
D Löscht gesamte Zeile ab Cursor
dt.... -> dt "und dann ein Symbol" löscht bis zu diesem Symbol
d$ löscht alles nach dem Czrsor bis zum Ende der Zeile,

 - jump forwards to the start of a word
W - jump forwards to the start of a word (words can contain punctuation)
e - jump forwards to the end of a word
E - jump forwards to the end of a word (words can contain punctuation)
b - jump backwards to the start of a word
B - jump backwards to the start of a word (words can contain punctuation)
ge - jump backwards to the end of a word
gE - jump backwards to the end of a word (words can contain punctuation)
% - move to matching character (default supported pairs: '()', '{}', '[]' - use :h matchpairs in vim for more info)
0 - jump to the start of the line
^ - jump to the first non-blank character of the line
$ - jump to the end of the line
g_ - jump to the last non-blank character of the line
gg - go to the first line of the document
G - go to the last line of the document

## SUCHEN & ERSETZEN ###
:s/.... suchen in Zeile
:%s/... suchen im Dokument
Funktioniert auch, wenn man i Visual Mode Text markiert hat


## PLUGINS

### Vim-Surround ###


https://github.com/tpope/vim-surround/blob/master/doc/surround.txt

  Old text                  Command     New text 
  Hello w*orld!             ysiw)       Hello (world)!
  Hello w*orld!             yssB        {Hello world!}
  
  "Hello *world!"           ds"         Hello world!
  [123+4*56]/2              cs])        (123+456)/2
  "Look ma, I'm *HTML!"     cs"<q>      <q>Look ma, I'm HTML!</q>
  if *x>3 {                 ysW(        if ( x>3 ) {
  my $str = *whee!;         vllllS'     my $str = 'whee!';


  "Hello *world!"           ds"         Hello world!
  (123+4*56)/2              ds)         123+456/2
  <div>Yo!*</div>           dst         Yo!
  
  "Hello *world!"           cs"'        'Hello world!'
  "Hello *world!"           cs"<q>      <q>Hello world!</q>
  (123+4*56)/2              cs)]        [123+456]/2
  (123+4*56)/2              cs)[        [ 123+456 ]/2
  <div>Yo!*</div>           cst<p>      <p>Yo!</p>

### MARKDOWN SNIPPETS ###

Tab holt Snippet, ctrl-j springt ins nächste Feld, ctrl-k ins Vorige.

#### Header
    Level 1: sec
    Level 2: ssec
    Level 3: sssec
    Level 4: par
    Level 5: spar

#### Links
    Inline link: link
    Reference link: refl
    Image link: img
    Code:
    Code block: cbl
    Inline code: ilc
    Text rendering:
    Italic text: *
    Bold text: **
    Italic and bold text: ***

#### General
    date: date
    time: time
    date and exact time: datetime
    date in ISO format: diso



### Nerd-Tree ###

Show the mappings:  `g?`

`<C-]>`           CD                         |nvim-tree-api.tree.change_root_to_node()|
`<C-e>`           Open: In Place             |nvim-tree-api.node.open.replace_tree_buffer()|
`<C-k>`           Info                       |nvim-tree-api.node.show_info_popup()|
`<C-r>`           Rename: Omit Filename      |nvim-tree-api.fs.rename_sub()|
`<C-t>`           Open: New Tab              |nvim-tree-api.node.open.tab()|
`<C-v>`           Open: Vertical Split       |nvim-tree-api.node.open.vertical()|
`<C-x>`           Open: Horizontal Split     |nvim-tree-api.node.open.horizontal()|
`<BS>`            Close Directory            |nvim-tree-api.node.navigate.parent_close()|
`<CR>`            Open                       |nvim-tree-api.node.open.edit()|
`<Tab>`           Open Preview               |nvim-tree-api.node.open.preview()|
`>`               Next Sibling               |nvim-tree-api.node.navigate.sibling.next()|
`<`               Previous Sibling           |nvim-tree-api.node.navigate.sibling.prev()|
`.`               Run Command                |nvim-tree-api.node.run.cmd()|
`-`               Up                         |nvim-tree-api.tree.change_root_to_parent()|
`a`               Create                     |nvim-tree-api.fs.create()|
`bd`              Delete Bookmarked          |nvim-tree-api.marks.bulk.delete()|
`bmv`             Move Bookmarked            |nvim-tree-api.marks.bulk.move()|
`B`               Toggle Filter: No Buffer   |nvim-tree-api.tree.toggle_no_buffer_filter()|
`c`               Copy                       |nvim-tree-api.fs.copy.node()|
`C`               Toggle Filter: Git Clean   |nvim-tree-api.tree.toggle_git_clean_filter()|
`[c`              Prev Git                   |nvim-tree-api.node.navigate.git.prev()|
`]c`              Next Git                   |nvim-tree-api.node.navigate.git.next()|
`d`               Delete                     |nvim-tree-api.fs.remove()|
`D`               Trash                      |nvim-tree-api.fs.trash()|
`E`               Expand All                 |nvim-tree-api.tree.expand_all()|
`e`               Rename: Basename           |nvim-tree-api.fs.rename_basename()|
`]e`              Next Diagnostic            |nvim-tree-api.node.navigate.diagnostics.next()|
`[e`              Prev Diagnostic            |nvim-tree-api.node.navigate.diagnostics.prev()|
`F`               Clean Filter               |nvim-tree-api.live_filter.clear()|
`f`               Filter                     |nvim-tree-api.live_filter.start()|
`g?`              Help                       |nvim-tree-api.tree.toggle_help()|
`gy`              Copy Absolute Path         |nvim-tree-api.fs.copy.absolute_path()|
`H`               Toggle Filter: Dotfiles    |nvim-tree-api.tree.toggle_hidden_filter()|
`I`               Toggle Filter: Git Ignore  |nvim-tree-api.tree.toggle_gitignore_filter()|
`J`               Last Sibling               |nvim-tree-api.node.navigate.sibling.last()|
`K`               First Sibling              |nvim-tree-api.node.navigate.sibling.first()|
`m`               Toggle Bookmark            |nvim-tree-api.marks.toggle()|
`o`               Open                       |nvim-tree-api.node.open.edit()|
`O`               Open: No Window Picker     |nvim-tree-api.node.open.no_window_picker()|
`p`               Paste                      |nvim-tree-api.fs.paste()|
`P`               Parent Directory           |nvim-tree-api.node.navigate.parent()|
`q`               Close                      |nvim-tree-api.tree.close()|
`r`               Rename                     |nvim-tree-api.fs.rename()|
`R`               Refresh                    |nvim-tree-api.tree.reload()|
`s`               Run System                 |nvim-tree-api.node.run.system()|
`S`               Search                     |nvim-tree-api.tree.search_node()|
`U`               Toggle Filter: Hidden      |nvim-tree-api.tree.toggle_custom_filter()|
`W`               Collapse                   |nvim-tree-api.tree.collapse_all()|
`x`               Cut                        |nvim-tree-api.fs.cut()|
`y`               Copy Name                  |nvim-tree-api.fs.copy.filename()|
`Y`               Copy Relative Path         |nvim-tree-api.fs.copy.relative_path()|
`<2-LeftMouse>`   Open                       |nvim-tree-api.node.open.edit()|
`<2-RightMouse>`  CD                         |nvim-tree-api.tree.change_root_to_node()|

==============================================================================


### TABS & TERMINAL ### 

:tabnew [NAME] -> neues Terminal
gt -> Nächster Tab

### SUCHEN ###

*	            Sucht nach dem nächsten Wort, welches sich unter dem Cursor befindet
#	            Das ganze rückwärts
/suchbegriff	Suche vorwärts nach dem Wort Suchbegriff. Je nach Einstellung wird Groß-/Kleinschreibung beachtet
?word       	Die Suche entsprechend rückwärts
n	            Springe zum nächsten Suchbegriff der gefunden wird
N	            Entsprechend wieder rückwärts

### KEYMAPS.lua  ###

vim.g.mapleader = " "
vim.g.maplocalleader = " "
vim.keymap.set("n", "<leader>seek", ":nohlsearch<CR>")
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")
-- Clipboard tool notwendig?
vim.keymap.set({ "n", "v" }, "<leader>d", [["_d]])
vim.keymap.set("i", "<C-c>", "<Esc>")
vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz")b!020290?OeGb 
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz")
-- Suche das Wort unter dem Cursor in der ganzen Datei und ersetzt alle 
vim.keymap.set("n", "<leader>s", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])
-- Datei ausführbar machen uns Änderungen speichern
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })
-- Spezialeffekt 
vim.keymap.set("n", "<leader>mr", "<cmd>CellularAutomaton make_it_rain<CR>");
-- Datei sourcen
vim.keymap.set("n", "<leader>so", function()
    vim.cmd("so")
end)
-- Kann ich noch nicht verwenden:
--vim.keymap.set("n", "<leader>vpp", "<cmd>e ~/.dotfiles/nvim/.config/nvim/lua/core/plugins.lua<CR>");
--vim.keymap.set("n", "Q", "<nop>")
--vim.keymap.set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer<CR>")
--vim.keymap.set("n", "<leader>f", vim.lsp.buf.format)
--vim.keymap.set("n", "<leader>Y", [["+Y]])
--vim.keymap.set("x", "<leader>p", [["_dP]])
--vim.keymap.set({"n", "v"}, "<leader>y", [["+y]])
--vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)

### LSP ###

['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
['<C-n>'] = cmp.mapping.select_next_item(cmp_select),b!020290?OeGb 
['<C-y>'] = cmp.mapping.confirm({ select = true }),
["<C-Space>"] = cmp.mapping.complete(),
vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
vim.keymap.set("n", "<leader>vws", function() vim.lsp.buf.workspace_symbol() end, opts)
vim.keymap.set("n", "<leader>vd", function() vim.diagnostic.open_float() end, opts)
vim.keymap.set("n", "[d", function() vim.diagnostic.goto_next() end, opts)
vim.keymap.set("n", "]d", function() vim.diagnostic.goto_prev() end, opts)
vim.keymap.set("n", "<leader>vca", function() vim.lsp.buf.code_action() end, opts)
vim.keymap.set("n", "<leader>vrr", function() vim.lsp.buf.references() end, opts)
vim.keymap.set("n", "<leader>vrn", function() vim.lsp.buf.rename() end, opts)


### FUGITIVE ###
vim.keymap.set("n", "<leader>gs", vim.cmd.Git);

### TROUBLE ###
vim.keymap.set("n", "<leader>xq", "<cmd>TroubleToggle quickfix<cr>",

### HARPOON ###

vim.keymap.set("n", "<leader>h", mark.add_file)
vim.keymap.set("n", "<C-h>", ui.toggle_quick_menu)
vim.keymap.set("n", "P", function() ui.nav_file(1) end)
vim.keymap.set("n", "Ü", function() ui.nav_file(2) end)
vim.keymap.set("n", "Ö", function() ui.nav_file(3) end)
vim.keymap.set("n", "Ä", function() ui.nav_file(4) end)

###TELESCOPE ###

vim.keymap.set('n', '<c-p>', builtin.git_files, {})
vim.keymap.set('n', '<Space><Space>', builtin.oldfiles, {})
vim.keymap.set('n', '<Space>fg', builtin.live_grep, {})
vim.keymap.set('n', '<Space>fh', builtin.help_tags, {})
vim.keymap.set('n', '<leader>pf', builtin.find_files, {})
vim.keymap.set('n', '<Space>gc', builtin.git_commits, {})
vim.keymap.set('n', '<leader>ps', function() builtin.grep_string({ search = vim.fn.input("Grep > ") });

### UNDOTREE ###
vim.keymap.set("n", "<leader>u", vim.cmd.UndoTreeToggle)

### ZEN MODE ###

vim.keymap.set("n", "<leader>zz", function()
        window = {
            width = 90,
    vim.wo.wrap = false
    vim.wo.number = true

vim.keymap.set("n", "<leader>zZ", function()
        window = {
            width = 80,
    vim.wo.wrap = false
    vim.wo.number = false
    vim.wo.rnu = false
    vim.opt.colorcolumn = "0"


### NVIM TREE ###

vim.keymap.set('n', '<C-]>', api.tree.change_root_to_node,          opts('CD'))
vim.keymap.set('n', '<C-e>', api.node.open.replace_tree_buffer,     opts('Open: In Place'))
vim.keymap.set('n', '<C-k>', api.node.show_info_popup,              opts('Info'))
vim.keymap.set('n', '<C-r>', api.fs.rename_sub,                     opts('Rename: Omit Filename'))
vim.keymap.set('n', '<C-t>', api.node.open.tab,                     opts('Open: New Tab'))
vim.keymap.set('n', '<C-v>', api.node.open.vertical,                opts('Open: Vertical Split'))
vim.keymap.set('n', '<C-x>', api.node.open.horizontal,              opts('Open: Horizontal Split'))
vim.keymap.set('n', '<BS>',  api.node.navigate.parent_close,        opts('Close Directory'))
vim.keymap.set('n', '<CR>',  api.node.open.edit,                    opts('Open'))
vim.keymap.set('n', '<Tab>', api.node.open.preview,                 opts('Open Preview'))
vim.keymap.set('n', '>',     api.node.navigate.sibling.next,        opts('Next Sibling'))
vim.keymap.set('n', '<',     api.node.navigate.sibling.prev,        opts('Previous Sibling'))
vim.keymap.set('n', '.',     api.node.run.cmd,                      opts('Run Command'))
vim.keymap.set('n', '-',     api.tree.change_root_to_parent,        opts('Up'))
vim.keymap.set('n', 'a',     api.fs.create,                         opts('Create'))
vim.keymap.set('n', 'bd',    api.marks.bulk.delete,                 opts('Delete Bookmarked'))
vim.keymap.set('n', 'bmv',   api.marks.bulk.move,                   opts('Move Bookmarked'))
vim.keymap.set('n', 'B',     api.tree.toggle_no_buffer_filter,      opts('Toggle Filter: No Buffer'))
vim.keymap.set('n', 'c',     api.fs.copy.node,                      opts('Copy'))
vim.keymap.set('n', 'C',     api.tree.toggle_git_clean_filter,      opts('Toggle Filter: Git Clean'))
vim.keymap.set('n', '[c',    api.node.navigate.git.prev,            opts('Prev Git'))
vim.keymap.set('n', ']c',    api.node.navigate.git.next,            opts('Next Git'))
vim.keymap.set('n', 'd',     api.fs.remove,                         opts('Delete'))
vim.keymap.set('n', 'D',     api.fs.trash,                          opts('Trash'))
vim.keymap.set('n', 'E',     api.tree.expand_all,                   opts('Expand All'))
vim.keymap.set('n', 'e',     api.fs.rename_basename,                opts('Rename: Basename'))
vim.keymap.set('n', ']e',    api.node.navigate.diagnostics.next,    opts('Next Diagnostic'))
vim.keymap.set('n', '[e',    api.node.navigate.diagnostics.prev,    opts('Prev Diagnostic'))
vim.keymap.set('n', 'F',     api.live_filter.clear,                 opts('Clean Filter'))
vim.keymap.set('n', 'f',     api.live_filter.start,                 opts('Filter'))
vim.keymap.set('n', 'g?',    api.tree.toggle_help,                  opts('Help'))
vim.keymap.set('n', 'gy',    api.fs.copy.absolute_path,             opts('Copy Absolute Path'))
vim.keymap.set('n', 'H',     api.tree.toggle_hidden_filter,         opts('Toggle Filter: Dotfiles'))
vim.keymap.set('n', 'I',     api.tree.toggle_gitignore_filter,      opts('Toggle Filter: Git Ignore'))
vim.keymap.set('n', 'J',     api.node.navigate.sibling.last,        opts('Last Sibling'))
vim.keymap.set('n', 'K',     api.node.navigate.sibling.first,       opts('First Sibling'))
vim.keymap.set('n', 'm',     api.marks.toggle,                      opts('Toggle Bookmark'))
vim.keymap.set('n', 'o',     api.node.open.edit,                    opts('Open'))
vim.keymap.set('n', 'O',     api.node.open.no_window_picker,        opts('Open: No Window Picker'))
vim.keymap.set('n', 'p',     api.fs.paste,                          opts('Paste'))
vim.keymap.set('n', 'P',     api.node.navigate.parent,              opts('Parent Directory'))
vim.keymap.set('n', 'q',     api.tree.close,                        opts('Close'))
vim.keymap.set('n', 'r',     api.fs.rename,                         opts('Rename'))
vim.keymap.set('n', 'R',     api.tree.reload,                       opts('Refresh'))
vim.keymap.set('n', 's',     api.node.run.system,                   opts('Run System'))
vim.keymap.set('n', 'S',     api.tree.search_node,                  opts('Search'))
vim.keymap.set('n', 'U',     api.tree.toggle_custom_filter,         opts('Toggle Filter: Hidden'))
vim.keymap.set('n', 'W',     api.tree.collapse_all,                 opts('Collapse'))
vim.keymap.set('n', 'x',     api.fs.cut,                            opts('Cut'))
vim.keymap.set('n', 'y',     api.fs.copy.filename,                  opts('Copy Name'))
vim.keymap.set('n', 'Y',     api.fs.copy.relative_path,             opts('Copy Relative Path'))
vim.keymap.set('n', '<2-LeftMouse>',  api.node.open.edit,           opts('Open'))
vim.keymap.set('n', '<2-RightMouse>', api.tree.change_root_to_node, opts('CD'))


Lspinstall:
css-lsp    
cssmodules-language-server 
emmet-language-server  
html-lsp     
emmet-ls  
eslint-lsp   
java-language-server   
json-lsp    
sqls    
vim-language-server
Debug-Adapter:
go-debug-adapter
chrome-debug-adapter
bash-debug-adapter
java-language-server
js-debug-adapter
node-debug2-adapter
Linter:
jdonlint
luacheck
markdownlint                     
prettier

