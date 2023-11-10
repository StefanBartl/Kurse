#include <iostream>
#include <memory>

template <class T>
struct SimpleNode {
  T mItem = 0;
  std::shared_ptr<SimpleNode> mNext;
};

template <class T>
struct SimpleLinkedList {
    void add(const T value)
    {
        auto cur = std::make_shared< SimpleNode<T> >();
        cur->mItem = value;
        cur->mNext = head;

        head = cur;
    }

    void print()
    {
        std::shared_ptr< SimpleNode<T> > cur = head;
        while (cur)
        {
            std::cout << cur->mItem << std::endl;
            cur = cur->mNext;
        }
    }

    std::shared_ptr< SimpleNode<T> > head;
};


int main()
{
    SimpleLinkedList<int> list;

    list.add(12);
    list.add(22);
    list.add(342);
    list.add(145);

    list.print();

    return 0;
}
