#ifndef __perlemir_h_
#define __perlemir_h_

#include "jswasm.h"



void *stack_malloc(i32u , i32 );

void pop_free(i32u , i32 );

WASM_export f32 quickSelect(f32*, i32 , i32 );

f32 *copy(f32 *, i32 );

f32 randomQuickSelect(f32 *, i32 , i32 , i32 );

i32 partition(f32 *, i32 , i32 );

i32 randomPartition(f32 *, i32 , i32 );

i32u random(i32u , i32u );

#endif