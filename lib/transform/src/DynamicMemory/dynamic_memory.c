#include "jswasm.h"
#include "perlemir.h"

WASM_import unsigned char __heap_base;
WASM_import unsigned char __private_heap_base;

static i32u* shared_heap_pointer = &__heap_base;
static i32u* private_heap_pointer = &__private_heap_base;

// bytes: number of bytes you would like to allocate
// private: 1 if you want to use the private heap,
// 0 if you are using the shared heap.
void* stack_malloc(i32u bytes, i32 private) {
    
    if (private) {
        void* mem = private_heap_pointer;
        private_heap_pointer += (bytes+4);
        *(private_heap_pointer-4) = bytes;
        return mem;
    }else{
        void* mem = shared_heap_pointer;
        shared_heap_pointer += (bytes+4);
        *(shared_heap_pointer - 4) = bytes;
        return mem;
    }
}

void pop_free(i32 private){
    if (private)
    {
        private_heap_pointer -= ((*(private_heap_pointer-4))+4); 
    }else{
        shared_heap_pointer -= ((*(shared_heap_pointer - 4)) + 4);
    }
}