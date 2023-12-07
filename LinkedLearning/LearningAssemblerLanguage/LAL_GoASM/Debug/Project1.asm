.Const
trouble EQU 0ABADDEh ;Konstante, EQU ist = und HEX-Strings beginnen mit 0 und enden mit h
.Data?

.Data

hInst		HINSTANCE	NULL
buffer db 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ; db = define byte
bword dw 25 ; dw = define word also 16-Bit
bdouble dd 0DEADBEEFh ; dd = define double (word) also 32-Bit

include ECProtos.inc ; .Code

start:
	Invoke GetModuleHandle, NULL
	Mov hInst, Eax 
	;=====================
	; Write your code here
	;=====================
	mov al,[buffer]
	mov al,[buffer+1]
	mov eax,bdouble
	mov eax,trouble
	mov  bdouble,eax
	
	Invoke ExitProcess, 0
End start
