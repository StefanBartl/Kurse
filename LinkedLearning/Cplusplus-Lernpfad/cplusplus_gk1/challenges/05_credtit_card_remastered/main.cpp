#include <iostream>
#include <customer.h>
#include <creditcard.h>

int main()
{
    Customer peter = Customer::Customer();
    Customer john = Customer::Customer();

    // TODO: Erkläre Peter zu Premium-Kunden, John zu Standard-Kunden
    peter.mState = Customer::CustomerState::Premium;
    peter.mCreditCard.mState = Valid;
    john.mState = Customer::CustomerState::Standard;
    john.mCreditCard.mState = Valid;

    // TODO: Zeige hier an wieviel Geld sie noch zur Verfügung haben
    showBalance(peter.mCreditCard);
    showBalance(john.mCreditCard);

    std::cout << "Each is going to withdraw some Money: First 50, then 100 and finally 200."  << std::endl;
    withdrawMoney(john, 50);
    withdrawMoney(peter, 50);

    withdrawMoney(john, 100);
    withdrawMoney(peter, 100);

    withdrawMoney(john, 200);
    withdrawMoney(peter, 200);

    // TODO: Zeige hier an wieviel Geld sie noch zur Verfügung haben
    std::cout << "End-Kontostand Peter: " << peter.mCreditCard.mBalance << "€" << std::endl;
    std::cout << "End-Kontostand John: " << john.mCreditCard.mBalance << "€" << std::endl;
    
    return 0;
}
