#include "jswasm.h"

WASM_import void *stack_malloc(i32u bytes, i32 private);

WASM_import void pop_free(i32u bytes, i32 private);

WASM_export f32 quickSelect(f32* A, i32 i, i32 length) {
    f32* B = copy(A, length);
    return randomQuickSelect(B, 0, length - 1, i);
}

f32* copy(f32* a, i32 length){
    f32* cpy = (f32*) stack_malloc(length*4, 1);
    for (i32 i = 0; i < length; i++){
        cpy[i] = a[i];
    }
    return cpy;
}

/**
	 * find the "i"th order statistic in an array of integers
	 * A an array of integers
	 * p inclusive lower bound
	 * r inclusive upper bound
	 * i the order statistic you are searching for
	 */
f32 randomQuickSelect(f32* A, i32 p, i32 r, i32 i) {

    if (p == r) {
        return A[p];
    }
    i32 q = randomPartition(A, p, r);
    i32 k = q - p + 1;
    if (i == k) {
        return A[q];
    }
    else if (i < k) {
        return randomQuickSelect(A, p, q - 1, i);
    }
    else {
        return randomQuickSelect(A, q + 1, r, i - k);
    }
}

/**
	 * Chooses a pivot at the last index in the array, then partitions the elements into sections that are higher or lower than the pivot. 
	 * Finally, places the pivot in between these two sections, switching places with the first element in the "high" bucket.
	 * param array: an array of ints
	 * param start: the starting index (inclusive)
	 * param end: the ending index (inclusive)
	 * return: the index of a sorted "middle" (but not really) element to the quicksort method
	 */
i32 partition(f32* array, i32 start, i32 end)
{
    f32 pivot = array[end];
    i32 i = start - 1;

    for (i32 j = start; j < end; j++){
        if (array[j] <= pivot) {
            i++;
            f32 temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    f32 temp = array[i + 1];
    array[i + 1] = array[end];
    array[end] = temp;
    return i + 1;
}

/**
	 * Same as the regular partition, except that the pivot element is chosen at random.
	 * To do this, a random integer in the range of the array indices is chosen, then the element at this index is switched with the last element in that portion of the array.
	 * After that the normal partition method is called.
	 * param array: an array of ints
	 * param start: the starting index (inclusive)
	 * param end: the ending index (inclusive)
	 * return: index of the sorted element
	 */
i32 randomPartition(i32* array, i32 start, i32 end)
{
    Random rand = new Random();
    i32 i = rand.nextInt(end - start) + start;
    f32 temp = array[end];
    array[end] = array[i];
    array[i] = temp;
    return partition(array, start, end);
}