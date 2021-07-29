import { AccessorType, LifecycleFlags } from '@aurelia/runtime';
import type { IIndexable } from '@aurelia/kernel';
import type { InterceptorFunc, IObserver, ISubscriber, ISubscriberCollection, IFlushable, IWithFlushQueue, FlushQueue } from '@aurelia/runtime';
import type { IController } from '../templating/controller';
export interface BindableObserver extends IObserver, ISubscriberCollection {
}
export declare class BindableObserver implements IFlushable, IWithFlushQueue {
    readonly obj: IIndexable;
    readonly key: string;
    private readonly set;
    readonly $controller: IController | null;
    get type(): AccessorType;
    value: unknown;
    queue: FlushQueue;
    private readonly cb;
    private f;
    constructor(obj: IIndexable, key: string, cbName: string, set: InterceptorFunc, $controller: IController | null);
    getValue(): unknown;
    setValue(newValue: unknown, flags: LifecycleFlags): void;
    subscribe(subscriber: ISubscriber): void;
    flush(): void;
}
//# sourceMappingURL=bindable-observer.d.ts.map