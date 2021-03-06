import { ITransformBuilder, ITransformer } from "../types";

interface StatisticTransformerExports {
    exports: {
        say_hello: () => void;
    };
}
type StatisticTransformerInstance = WebAssembly.Instance & StatisticTransformerExports;

export default class StatisticTransformBuilder extends ITransformBuilder<StatisticTransformer> {
    private memSize: WebAssembly.Global = null;

    public async instantiate(): Promise<StatisticTransformer> {
        const exe = await this.compileTask;
        const memory = new WebAssembly.Memory({ initial: 2 });
        const imports = this.getDefaultImports(memory);
        return new StatisticTransformer(exe, imports, memory);
    }

    public async compile(bin: Promise<ArrayBuffer>): Promise<StatisticTransformBuilder> {
        this.compileTask = WebAssembly.compile(await bin);
        return this;
    }

    public setMemSize(bytes: number): StatisticTransformBuilder {
        // TODO: validate the number of bytes specified
        this.memSize = new WebAssembly.Global({ value: 'i32', mutable: false }, bytes);
        return this;
    }

    protected getDefaultImports(memory: WebAssembly.Memory): WebAssembly.Imports {
        if (!this.memSize) {
            this.memSize = new WebAssembly.Global({ value: 'i32', mutable: false }, 1024);
        }

        return {
            env: {
                memory,
                "__private_heap_base": this.memSize,
            },
        };
    }
}

export class StatisticTransformer extends ITransformer {
    private instanceTask: Promise<StatisticTransformerInstance>;

    constructor(
        exe: WebAssembly.Module,
        private imports: WebAssembly.Imports,
        rawMemory: WebAssembly.Memory
    ) {
        super(exe, rawMemory);
        this.getOrderStatistic = this.getOrderStatistic.bind(this);

        // Start the instantiation process
        this.start.apply(this);
    }

    protected start(): StatisticTransformer {
        this.instanceTask = WebAssembly.instantiate(this.module, this.imports) as Promise<StatisticTransformerInstance>;
        return this;
    }

    /***********************************
     ******* WASM-DEFINED METHODS *******
     ************************************/

    public async getOrderStatistic(orderStatistic: number): Promise<number> {
        return -1;
    }
}