export default function bubble_sort(arr: number[]): void {

    for (let i = 0; i < arr.length; i++) { 
        for (let y = 0; y < arr.length - 1 - i; y++) { // Minus 1 weil der letzte Wert mit nichts mehr verglichen werden kann
                if (arr[y] > arr[y + 1]) {
                // Swap
                const temp = arr[y];
                arr[y] = arr[y + 1];
                arr[y + 1] = temp;
            }
        }
    }

}
