import { ITransformBuilder, ITransformer } from "../types";

interface HelloTransformerExports {
    exports: {
        say_hello: () => void;
    };
}
type HelloTransformerInstance = WebAssembly.Instance & HelloTransformerExports;

export type WriterCallback = (message: string) => void;

export class HelloTransformBuilder extends ITransformBuilder<HelloTransformer> {
    public async instantiate(): Promise<HelloTransformer> {
        const exe = await this.compileTask;
        const memory = new WebAssembly.Memory({initial: 2});
        const imports = this.getDefaultImports(memory);
        return new HelloTransformer(exe, imports, memory);
    }
    public async compile(bin: Promise<ArrayBuffer>): Promise<HelloTransformBuilder> {
        this.compileTask = WebAssembly.compile(await bin);
        return this;
    }
    protected getDefaultImports(memory: WebAssembly.Memory): WebAssembly.Imports {
        return {
            env: {
                memory,
            }
        };
    }
}

export default class HelloTransformer extends ITransformer {
    private instanceTask: Promise<HelloTransformerInstance>;

    constructor(
        exe: WebAssembly.Module,
        private imports: WebAssembly.Imports,
        rawMemory: WebAssembly.Memory
    ) {
        super(exe, rawMemory);
        imports.env["write_console"] = this.writeConsole.bind(this);
        this.sayHello = this.sayHello.bind(this);
        this.eventList = [];

        // Start the instantiation process
        this.start.apply(this);
    }

    private eventList: WriterCallback[];

    private writeConsole(messagePtr: number, messageLength: number) {
        const rawMessage = new Uint8Array(this.rawMemory.buffer, messagePtr, messageLength);
        const message = HelloTransformer.textDecoder.decode(rawMessage);
        this.eventList.forEach(event => event(message));
        console.log(message);
    }

    private static textDecoder: TextDecoder = new TextDecoder("utf-8");

    protected start(): HelloTransformer {
        // TODO: find a better way to declare methods imported from WebAssembly.
        // For now, this is done with a static cast.
        this.instanceTask = <Promise<HelloTransformerInstance>>
            WebAssembly.instantiate(this.module, this.imports);
        return this;
    }

    /***********************************
    ******* WASM-DEFINED METHODS *******
    ************************************/

    /**
     * Calls a WebAssembly function which writes a message to the console.
     * Additionally resolves the given
     * 
     * @returns Promise which resolves to the WebAssembly module's message.
     */
    public async sayHello(): Promise<string> {
        const instance = await this.instanceTask;

        return new Promise((resolve: (val: string) => void) => {
            this.eventList.push(resolve);
            instance.exports.say_hello();
        });
    }
}