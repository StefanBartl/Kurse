
// TODO: Reduzieren Sie diese Template Definition mit Hilfe von C++17
template <auto Value, decltype(Value) ... values> struct OldSameTypeValueList {};
using cpp14sameList = OldSameTypeValueList<10, 15, 20>;

template <auto ... Values> struct NewDiffList {};
using cpp14diffList = NewDiffList<'x', 10>;

int main()
{
    return 0;
}
