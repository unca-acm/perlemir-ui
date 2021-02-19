CC=clang
LFLAGS= -Wl,--import-memory,--no-entry,--export-all,--allow-undefined
CFLAGS= --target=wasm32 -nostdlib
BIN=hello.wasm

IDIR = ./src/include/
BDIR = ./bin/
SDIR = ./src/HelloTransform/

$(BIN): $(SDIR)hello.c $(IDIR)jswasm.h
	$(CC) $(CFLAGS) $(LFLAGS) -I $(IDIR) $(SDIR)hello.c -o $(BDIR)$(BIN) 