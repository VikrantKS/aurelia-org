# Routing lifecycle

Inside of your routable components which implement the `IRouteViewModel` interface, there are certain methods that are called at different points of the routing lifecycle. These lifecycle hooks allow you to run code inside of your components such as fetch data or change the UI itself.

{% hint style="info" %}
Router lifecycle hook methods are all completely optional. You only have to implement the methods you require. The router will only call a method if it has been specified inside of your routable component. All lifecycle hook methods also support returning a promise and can be asynchronous.
{% endhint %}

If you are working with components you are rendering, implementing `IRouteViewModel` will ensure that your code editor provides you with intellisense to make working with these lifecycle hooks in the appropriate way a lot easier.

```typescript
import { IRouteViewModel } from "aurelia";

export class MyComponent implements IRouteViewModel {
    canLoad(params, next, current);
    load(params, next, current);
    canUnload(next, current);
    unload(next, current);
}
```

### **canLoad**

The `canLoad` method is called upon attempting to load the component. If your route has any parameters supplied, they will be provided to the `canLoad` method as an object with one or more parameters as the first argument.

{% hint style="info" %}
If you were loading data from an API based on values provided in the URL, you would most likely do that inside of `canLoad` if the view is dependent on the data successfully loading.
{% endhint %}

The `canLoad` method allows you to determine if the component should be loaded or not. If your component relies on data being present from the API or other requirements being fulfilled before being allowed to render, this is the method you would use.

When working with the `canLoad` method, you can use promises to delay loading the view until a promise and/or promises have been resolved. If we were to return `true` from this method, the component would be loaded.

```typescript
import { IRouteViewModel, Params } from "aurelia";

export class MyProduct implements IRouteViewModel {
    canLoad(params: Params) {
        return true;
    }
}
```

Not only can we allow or disallow the component to be loaded but we can also redirect.

```typescript
import { IRouteViewModel, Params } from "aurelia";

export class MyProduct implements IRouteViewModel {
    canLoad(params: Params) {
        return 'login';
    }
}
```

If you wanted to load data from an API, you could do so by making the `canLoad` method async which would make it a promise based method. Obviously, you would be awaiting an actual API call of some kind in place of `....load data`

```typescript
import { IRouteViewModel, Params } from "aurelia";

export class MyProduct implements IRouteViewModel {
    async canLoad(params: Params) {
        await ....load data
    }
}
```

### **load**

The `load` method is called when your component is navigated to. If your route has any parameters supplied, they will be provided to the `load` method as an object with one or more parameters as the first argument.

{% hint style="info" %}
If you are loading data from an API based on values provided in the URL and the rendering of this view is not dependent on the data being successfully returned, you can do that inside of `load`.
{% endhint %}

In many ways, the `load` method is the same as `canLoad` with the exception that `load` cannot prevent the component from loading. Where `canLoad` can be used to redirect users away from the component, the `load` method cannot.

All of the above code examples for `canLoad` can be used with `load` and will work the same with exception of being able to return `true` or `false` boolean values to prevent the component being loaded (as we just mentioned).

### canUnload

The `canUnload` method is called when a user attempts to leave a routed view. The first argument of this callback is a `INavigatorInstruction` which provides information about the next route. You can return a component, boolean or string value from this method.

Like the `canLoad` method, this is just the inverse. It determines if we can navigate away from the current component.

### **unload**

The `unload` method is called if the user is allowed to leave and in the process of leaving. The first argument of this callback is a `INavigatorInstruction` which provides information about the next route.

Like the `load` method, this is just the inverse. It is called when the component is being unloaded (provided `canUnload` wasn't false).
