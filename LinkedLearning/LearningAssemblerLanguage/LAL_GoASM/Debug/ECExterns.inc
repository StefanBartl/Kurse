include windows.inc
include kernel32.inc
include user32.inc
IFNDEF      trouble
trouble EQU	0ABADDEh 
ENDIF

public hInst
public buffer
public bword
public bdouble
