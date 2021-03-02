# vue3-ide-breakpoint-test

A minimal TS + class-component SFC app to test IDE breakpoint support.
Run configurations are provided for IntelliJ based IDEs and VS Code. Breakpoints
should trigger the correct line numbers due to some hacks in `vue.config.js`,
however, stepping over an async function does not work correctly.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
