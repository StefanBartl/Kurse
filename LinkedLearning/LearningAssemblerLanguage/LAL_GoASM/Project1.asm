;EasyCodeName=Project1,1
.Const

.Data


.Code

start:
	Invoke GetModuleHandle, NULL
	Mov hInst, Eax 
	
	Invoke ExitProcess, 0
End start
