.global start
.data
output_format:    .asciz "R2-Wert: %d\n"

_start:
    MOV R0, #1   
    MOV R1, R2    

    LDR R3, =output_format 
    BL printf               

    B end              

.data
output_format:    .asciz "R2-Wert: %d\n"

