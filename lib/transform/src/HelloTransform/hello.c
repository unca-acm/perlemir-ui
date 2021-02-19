#include "jswasm.h"

/**
 * write_console is provided by the JS environment
 * Can only interact using pointers and 32/64-bit ints/floats
 */
WASM_import void write_console(char *message, i32u message_length);

/**
 * say_hello is made available to the JS environment
 */
WASM_export void say_hello()
{
    char *message = "Hello, shworld!!!!?";
    i32u size = 19;
    write_console(message, size);
}