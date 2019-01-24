import {pascalCase}Controller from './{hyphenate}.controller';

export default function expFunc() {
  this.controller('{camelCase}Controller', {pascalCase}Controller);
  this.component('{pascalCase}', {
    bindings: {
    },
    controller: '{camelCase}Controller',
    template: /* @ngInject */ require(`./{hyphenate}.html`),
  });
}
