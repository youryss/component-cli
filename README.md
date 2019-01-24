## Motivation

Command Line to help developers creating components or containers in two clicks

## Running

Open the command line at this repository folder and install it globally:

```
$ yarn i -g
```

then

```
$ component create
```

## Templates

Containers and Components templates live under template folder.

There're 3 types of naming replacement for every template which is
E.g. given the name 'virtual-scroll' component name

- {pascalCase} = VirtualScroll
- {hyphenate} = virtual-scroll
- {camelCase} = virtualScroll

```
import {pascalCase}Controller from './{hyphenate}.controller';

export default function expFunc() {
  this.controller('{camelCase}Controller', {pascalCase}Controller);
  this.component('ct{pascalCase}', {
    bindings: {},
    controller: '{camelCase}Controller',
    template: /* @ngInject */ require(`./{hyphenate}.html`),
  });
}

```

will be replaced by:

```
import VirtualScrollController from "./virtual-scroll.controller";

export default function expFunc() {
  this.controller("virtualScrollController", VirtualScrollController);
  this.component("ctVirtualScroll", {
    bindings: {},
    controller: "virtualScrollController",
    template: /* @ngInject */ require(`./virtual-scroll.html`)
  });
}
```

## Next steps

- enable it to create unit tests, scss files, helpers, etc...
- allowing user choosing target folder path

## References

https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs
