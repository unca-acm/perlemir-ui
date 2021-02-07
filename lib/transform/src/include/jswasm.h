#ifndef __jswasm_h_
#define __jswasm_h_

#include <stdint.h>

#define WASM_export __attribute__((__visibility__("default")))
#define WASM_import extern;

/**
 * WebAssembly has only 4 data types at the moment:
 *  - i32 = Signed 32-bit int
 *  - i64 = Signed 64-bit int
 *  - f32 = 32-bit IEEE float
 *  - f64 = 64-bit IEEE float
 * Compiler will handle signed/unsigned conversions.
 * Note that "signed int" is not a data type in WebAssembly!
 * It uses a different instruction to operate on ints as 2's complement.
 */
typedef int32_t  i32;
typedef uint32_t i32u;
typedef int64_t  i64;
typedef uint64_t i64u;
typedef float    f32;
typedef double   f64;

#endif