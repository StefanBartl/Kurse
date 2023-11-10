#include <customer.h>

class CreditCard 
{
public:
    enum CreditCardState {
        New,
        Valid,
        TransferInProgress,
        Invalid,
        Error
    };

    void withdrawMoney(Customer &cust, const int amnt)
    {
        // TODO: Prüfen ob Kunden abheben darf und Fehler melden, wenn nicht.
        if(!verifyStatus(cust)){
            std::cout << "Verifikation fehlgeschlagen" << std::endl;
            return;
        };

        // TODO: Dann Geld abheben
        cust.mCreditCard.mBalance -= amnt;
        std::cout << "Kunde hat " << amnt << "€ abgehoben." << std::endl;
    };

    void showBalance(const CreditCard &card)
    {
        // TODO: Anzeigen wieviel Geld noch auf der Kreditkarte ist
        std::cout << "Kontostand: " << card.mBalance << "€" << std::endl;
    };

    CreditCardState mState;
    int mBalance;
};






