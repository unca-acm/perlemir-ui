CC=clang
LFLAGS= -Wl,--import-memory,--no-entry,--export-all,--allow-undefined
CFLAGS= --target=wasm32 -nostdlib
BIN=hello.wasm order_statistic.wasm dynamic_memory.wasm

IDIR = ./src/include/
BDIR = ./bin/
SDIR = ./src/

all: ./bin/hello.wasm ./bin/order_statistic.wasm ./bin/dynamic_memory.wasm

$(BDIR)hello.wasm: $(SDIR)HelloTransform/hello.c $(IDIR)jswasm.h
	$(CC) $(CFLAGS) $(LFLAGS) -I $(IDIR) $(SDIR)HelloTransform/hello.c -o $@ 

$(BDIR)order_statistic.wasm: $(SDIR)StatisticTransform/order_statistic.c $(IDIR)jswasm.h
	$(CC) $(CFLAGS) $(LFLAGS) -I $(IDIR) $(SDIR)StatisticTransform/order_statistic.c -o $@ 

$(BDIR)dynamic_memory.wasm: $(SDIR)DynamicMemory/dynamic_memory.c $(IDIR)jswasm.h
	$(CC) $(CFLAGS) $(LFLAGS) -I $(IDIR) $(SDIR)DynamicMemory/dynamic_memory.c -o $@
