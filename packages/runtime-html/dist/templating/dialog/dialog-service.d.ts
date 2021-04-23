import { IContainer } from '@aurelia/kernel';
import { IDialogService, IDialogController, IDialogGlobalSettings } from './dialog-interfaces.js';
import type { DialogOpenPromise, IDialogSettings } from './dialog-interfaces.js';
import { IPlatform } from '../../platform.js';
/**
 * A default implementation for the dialog service allowing for the creation of dialogs.
 */
export declare class DialogService implements IDialogService {
    private readonly container;
    private readonly p;
    private readonly defaultSettings;
    get controllers(): IDialogController[];
    private get top();
    protected static get inject(): (import("@aurelia/kernel").InterfaceSymbol<IPlatform> | import("@aurelia/kernel").InterfaceSymbol<IContainer> | import("@aurelia/kernel").InterfaceSymbol<Pick<IDialogSettings<unknown, object>, "lock" | "startingZIndex" | "rejectOnCancel">>)[];
    constructor(container: IContainer, p: IPlatform, defaultSettings: IDialogGlobalSettings);
    static register(container: IContainer): void;
    /**
     * Opens a new dialog.
     *
     * @param settings - Dialog settings for this dialog instance.
     * @returns A promise that settles when the dialog is closed.
     *
     * Example usage:
     * ```ts
     * dialogService.open({ component: () => MyDialog, template: 'my-template' })
     * dialogService.open({ component: () => MyDialog, template: document.createElement('my-template') })
     *
     * // JSX to hyperscript
     * dialogService.open({ component: () => MyDialog, template: <my-template /> })
     *
     * dialogService.open({ component: () => import('...'), template: () => fetch('my.server/dialog-view.html') })
     * ```
     */
    open(settings: IDialogSettings): DialogOpenPromise;
    /**
     * Closes all open dialogs at the time of invocation.
     *
     * @returns All controllers whose close operation was cancelled.
     */
    closeAll(): Promise<IDialogController[]>;
}
//# sourceMappingURL=dialog-service.d.ts.map