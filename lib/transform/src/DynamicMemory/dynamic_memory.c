#include "jswasm.h"

WASM_import unsigned char __heap_base;
WASM_import unsigned char __private_heap_base;


i32u shared_heap_pointer =  &__heap_base;
i32u private_heap_pointer = &__private_heap_base;

// bytes: number of bytes you would like to allocate
// private: 1 if you want to use the private heap,
// 0 if you are using the shared heap.
WASM_export void* stack_malloc(i32u bytes, i32 private) {
    
    if (private) {
        i32u mem = private_heap_pointer;
        private_heap_pointer += bytes;
        return (void*) mem;
    }else{
        i32u mem = shared_heap_pointer;
        shared_heap_pointer += bytes;
        return (void*) mem;
    }
}

WASM_export void pop_free(i32u bytes, i32 private){
    if (private)
    {
        private_heap_pointer -= bytes;
    }else{
        shared_heap_pointer -= bytes;
    }
}