#include <stdio.h>

void Foo(int *arg1, int arg2){
    *arg1 = *arg1 + 1;
    arg2 = arg2 +1; 
}

int main(){

    int arg1 = 1;
    int arg2 = 2;
    Foo(&arg1, arg2);
    return 0;
}