#include <iostream>

enum class CustomerState {
    New,
    Standard,
    Premium
};

enum CreditCardState {
    New,
    Valid,
    TransferInProgress,
    Invalid,
    Error
};

struct CreditCard {
    CreditCardState mState = CreditCardState::New;
    int mBalance = 100;
};

struct Customer {
    CustomerState mState = CustomerState::New;
    CreditCard mCreditCard;
};

bool verifyStatus(const Customer &cust)
{
    // TODO: Alle Karten müssen gültig (valid) sein
    if(cust.mCreditCard.mState != Valid){
        return false;
    }

    // TODO: Premium-Kunden dürfen sich weiterhin verschulden, Standard-Kunden nicht
    if(cust.mCreditCard.mBalance <= 0 && cust.mState != CustomerState::Premium){
        return false;
    }

    return true;

}

void withdrawMoney(Customer &cust, const int amnt)
{
    // TODO: Prüfen ob Kunden abheben darf und Fehler melden, wenn nicht.
    if(!verifyStatus(cust)){
        std::cout << "Verifikation fehlgeschlagen" << std::endl;
        return;
    }

    // TODO: Dann Geld abheben
    cust.mCreditCard.mBalance -= amnt;
    std::cout << "Kunde hat " << amnt << "€ abgehoben." << std::endl;
}

void showBalance(const CreditCard &card)
{
    // TODO: Anzeigen wieviel Geld noch auf der Kreditkarte ist
    std::cout << "Kontostand: " << card.mBalance << "€" << std::endl;
}

int main()
{
    Customer peter;
    Customer john;

    // TODO: Erkläre Peter zu Premium-Kunden, John zu Standard-Kunden
    peter.mState = CustomerState::Premium;
    peter.mCreditCard.mState = Valid;
    john.mState = CustomerState::Standard;
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
