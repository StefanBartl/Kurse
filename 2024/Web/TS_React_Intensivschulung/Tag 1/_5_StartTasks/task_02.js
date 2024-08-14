/*
Write a function compact to remove falsey values from a given array

console.log(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]));
// [1,2,3,"a","s",34]
console.log(compact([false, NaN, 'e' * 23]));
// []
*/
function compact(list) {
    return list.filter(item => item ?? false);
}

const compact = (list) => list.filter(Boolean);
