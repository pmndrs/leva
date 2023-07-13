# Creating Custom UI

This guide will walk you through how to use leva as the backbone of your UI while briging your own components.

## Setup store provider

First we will create a `StoreProvider` which will take care of creating an instance of the store and providing it to the children:


```tsx
    import { LevaStoreProvider } from 'leva'

    const StoreProvider  = ( { children, schema } ) => {
        const store = useCreateStore()

        // We initialize the store
        // Using the schema that was passed in
        useEffect( ( ) => {
            
            // Get the initial data for the passed schema
            const [ initialData ] = store.getDataFromSchema( schema )
            // Add the data to the store
            store.addData( initialData, true )
            
        }, [ store, schema ] )

        return (
            <LevaStoreProvider store={store} children={children}>
        )
    }
```

## Creating Wrapper Control Input

Now we create a wrapper control input component that we can use to wrap our controls so that we can access the helper methods using the provided hooks:

```tsx
    import { InputContextProvider } from 'leva'

    const ControlInput = ( { path, children, ...rest } ) => {
        const [
            input,
            { set, settings }
        ] = useInput( path )
        const { type, label, key, ...inputProps } = input
        const { displayValue, onChange, onUpdate } = useInputSetters({ type, value, settings, setValue: set })

        return (
            <InputContextProvider value={{
                key,
                path,
                label,
                displayValue,
                value,
                onChange,
                onUpdate,
                setValue: set,
                ...rest
            }}>
                { children }
            </InputContextProvider>
        )
    }
```

# Your own component

```tsx
    import { useInputContext } from 'leva'

    const MyBooleanComponent = ( ) => {
        const {
            label,
            onChange
        } = useInputContext()

        return (
            <checkbox label={label} onChange={onChange} />
        )
    }
```

## Using your component

Now that we have everything ready lets wire everything up

```tsx
    const Application = ( ) => {

        return (
            <StoreProvider>
                <MyBooleanComponent />
            </StoreProvider>
        )
        
    }
```
