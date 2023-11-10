#include <iostream>
#include <memory>

struct SimpleNode {
    int mItem = 0;
    std::shared_ptr<SimpleNode> mNext;
};

std::shared_ptr<SimpleNode> list;

void addElement(const int value){
    // Code that appends a value to the linked list

    // auto newNode = std::make_shared<SimpleNode>();
    // oder explizit:
    std::shared_ptr<SimpleNode> newNode = std::make_shared<SimpleNode>(); // Mit make_shared<>() wird ein SimpleNode Objekt am Heap erstellt das einen Shared Pointer zurückgibt, mit std::shared_ptr<> ptr wird ein neuer SharedPointer erstellt
    
    newNode->mItem = value;
    newNode->mNext = nullptr; // Das neue Element hat zunächst keinen Nachfolger

    if (!list) {
        // Wenn die Liste leer ist, wird das neue Element zur Liste
        // und es wird das erste Element in der Liste.
        list = newNode;
    } else {
        // Andernfalls suchen wir das Ende der Liste und fügen das neue Element hinzu.
        std::shared_ptr<SimpleNode> current = list;
        while (current->mNext) {
            current = current->mNext;
        }
        current->mNext = newNode;
    }
}

void printList(){
    // Print all list items
        if (!list) {
            std::cout << "Keine LinkedList Einträge!" << std::endl;
    } else {
        std::shared_ptr<SimpleNode> current = list;
        while (current) {
            std::cout << current->mItem << " ";
            current = current->mNext;
        }
        std::cout << std::endl;
    }
}


int main() {

    addElement(43);
    addElement(22);
    addElement(90);
    addElement(5);

    printList();

    return 0;
}