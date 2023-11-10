#include <iostream>

#include <memory>

class Operation
{

public:
    virtual void operator()() = 0;

    virtual ~Operation() {};

    void setFirstNumber(const int value) {
        mA = value;
    }
    void setSecondNumber(const int value) {
        mB = value;
    }

    int getResult() {
        return mResult;
    }

protected:
  int mA = 0;
  int mB = 0;
  int mResult = 0;
};

class SumOperation : public Operation
{
  public:
    void operator()()
    {
        mResult = mA + mB;
    }
};

class DiffOperation : public Operation
{
  public:
    void operator()()
    {
        mResult = mA - mB;
    }
};



int main()
{

    int x = 3;
    int y = 3;
    int z = 30;

    std::shared_ptr<Operation> calc;

    calc.reset(new SumOperation);
    calc->setFirstNumber(x);
    calc->setSecondNumber(y);
    (*calc)();

    std::cout << calc->getResult() << std::endl;

    calc.reset(new DiffOperation);
    calc->setFirstNumber(z);
    calc->setSecondNumber(y);
    (*calc)();

    std::cout << calc->getResult() << std::endl;

    return 0;
}
