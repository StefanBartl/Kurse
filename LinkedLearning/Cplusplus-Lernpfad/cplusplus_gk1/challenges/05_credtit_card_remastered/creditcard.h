class CreditCard 
{
public:
    enum CreditCardState;
    void withdrawMoney(Customer &cust, const int amnt);
    void showBalance(const CreditCard &card);
    CreditCardState mState;
    int mBalance;
};