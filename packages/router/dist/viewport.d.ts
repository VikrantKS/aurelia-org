import { IContainer } from '@aurelia/kernel';
import { LifecycleFlags } from '@aurelia/runtime';
import { ComponentAppellation, INavigatorInstruction, IRouteableComponent, IRoute } from './interfaces';
import { IRouter } from './router';
import { ViewportContent } from './viewport-content';
import { ViewportInstruction } from './viewport-instruction';
import { IScopeOwner, IScopeOwnerOptions, Scope } from './scope';
export interface IViewportOptions extends IScopeOwnerOptions {
    scope?: boolean;
    usedBy?: string | string[];
    default?: string;
    fallback?: string;
    noLink?: boolean;
    stateful?: boolean;
    forceDescription?: boolean;
}
export declare class Viewport implements IScopeOwner {
    readonly router: IRouter;
    name: string;
    element: Element | null;
    container: IContainer | null;
    options: IViewportOptions;
    connectedScope: Scope;
    content: ViewportContent;
    nextContent: ViewportContent | null;
    forceRemove: boolean;
    path: string | null;
    private clear;
    private elementResolve?;
    private previousViewportState;
    private cache;
    private historyCache;
    constructor(router: IRouter, name: string, element: Element | null, container: IContainer | null, owningScope: Scope, scope: boolean, options?: IViewportOptions);
    get scope(): Scope;
    get owningScope(): Scope;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get isViewport(): boolean;
    get isViewportScope(): boolean;
    get isEmpty(): boolean;
    get doForceRemove(): boolean;
    setNextContent(content: ComponentAppellation | ViewportInstruction, instruction: INavigatorInstruction): boolean;
    setElement(element: Element, container: IContainer, options: IViewportOptions): void;
    remove(element: Element | null, container: IContainer | null): Promise<boolean>;
    canLeave(): Promise<boolean>;
    canEnter(): Promise<boolean | ViewportInstruction[]>;
    enter(): Promise<boolean>;
    loadContent(): Promise<boolean>;
    finalizeContentChange(): void;
    abortContentChange(): Promise<void>;
    wantComponent(component: ComponentAppellation): boolean;
    acceptComponent(component: ComponentAppellation): boolean;
    beforeBind(flags: LifecycleFlags): void;
    beforeAttach(flags: LifecycleFlags): Promise<void>;
    beforeDetach(flags: LifecycleFlags): Promise<void>;
    beforeUnbind(flags: LifecycleFlags): Promise<void>;
    freeContent(component: IRouteableComponent): Promise<void>;
    getRoutes(): IRoute[] | null;
    private unloadContent;
    private clearState;
    private waitForElement;
}
//# sourceMappingURL=viewport.d.ts.map