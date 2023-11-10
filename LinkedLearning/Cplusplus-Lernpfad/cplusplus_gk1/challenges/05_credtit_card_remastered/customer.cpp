#include <creditcard.h>

class Customer 
{
public:
    enum class CustomerState {
        New,
        Standard,
        Premium
    };

    CreditCard mCreditCard;
    CustomerState mState;

    Customer(){
            mState = CustomerState::New;
    };

    bool verifyStatus()
    {
        // TODO: Alle Karten müssen gültig (valid) sein
        if(mCreditCard.mState != Valid){
            return false;
        }

        // TODO: Premium-Kunden dürfen sich weiterhin verschulden, Standard-Kunden nicht
        if(mCreditCard.mBalance <= 0 && mState != CustomerState::Premium){
            return false;
        }

        return true;
    };

};