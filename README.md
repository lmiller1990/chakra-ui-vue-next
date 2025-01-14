# `@chakra-ui/vue` for Vue 3 (WIP)

The official working repository for V1 of Chakra UI Vue with Vue 3 support.

[See Roadmap](https://www.notion.so/4517ba273ef3409d8e0e9ec3d121f6c1?v=ce00244a41b74b79b4d01ee4c3aa61ec)

### Install dependencies
```bash
yarn install
```

### Build components
```bash
yarn build
```

### Bootstrap and link packages
```bash
yarn bootstrap
```

### Component playground (based on vite)
```bash
yarn dev
```

## Development Guide
### Major todos:
- [ ] Documentation (to be based on Nuxt 3)
- [ ] Accessibility JS hooks (Documented in Roadmap)

### Creating new components
Chakra UI Vue uses [hygen](https://www.hygen.io/) to generate new components. The component templates can be found in the `_templates/generator/component` directory.

* Run the hygen command to generate your new component. 
  ```bash
  yarn hygen generator component --name <COMPONENT_NAME> --description="MY_COMPONENT_DESCRIPTION"
  ```
  This creates a new package with the name `<COMPONENT_NAME>` with some basic sanity tests.

* Run `yarn workspace @chakra-ui/COMPONENT_NAME build && yarn bootstrap` to build and link your component in the monorepo.

* Add the script for your package workspace in the global `package.json` file. `"COMPONENT_NAME": "yarn workspace @chakra-ui/COMPONENT_NAME",` goes under `scripts`.
  
* Before you can play around with your new component in the playground you will have to export your component from the `@chakra-ui/vue-next` package in the  `core` directory under `packages`.

  * Inside the `index.ts` file, you will have to add `export * from '@chakra-ui/COMPONENT_NAME'`. 

  * Your component also needs to be added as a dependency inside the `package.json` of the `@chakra-ui/vue-next` package as following: 
    ```jsx
    "dependencies": {
      ...
      "@chakra-ui/COMPONENT_NAME": "*",
      ...
    }
    ```

* Run `yarn core build` and then `yarn dev` to view your new component in the playground.

* When you make changes to your component, you will need to rebuild your package to have the changes applied in for example the playground `yarn workspace @chakra-ui/COMPONENT_NAME build` or `yarn COMPONENT_NAME build`. Alternatively, you can use the watch command. `yarn workspace @chakra-ui/COMPONENT_NAME watch` or `yarn COMPONENT_NAME watch`.

**Additional notes:**
Add a script for your package workspace in the `package.json` file.

### Creating a new commit message
The commits follow the [conventional commit format](https://www.conventionalcommits.org/). Husky is setup to lint your commit messages to match this format. 
```bash
type(scope?): subject #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

For example:

```bash
git commit -m "feat(component): create x component"

git commit -m "chore: update x dependencies"
```

For more information visit: [github.com/conventional-changelog/commitlint/#what-is-commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)