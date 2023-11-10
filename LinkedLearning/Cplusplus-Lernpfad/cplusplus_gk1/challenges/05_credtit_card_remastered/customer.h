#include <creditcard.h>

class Customer 
{
public:
    enum class CustomerState;
    CreditCard mCreditCard;
    CustomerState mState;
    Customer(const CustomerState state);
    bool verifyStatus();
};