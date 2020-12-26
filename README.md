<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
# useTwix

```bash
yarn add use-twix
```

`useTwix` is a 

- 🧐 Smart defaults, your GUI will always pick the best input type for your data
- 🤳 Mobile-ready, all inputs work perfectly on mobile
- 💪 Type safety, `use-twix` is built from the ground up with typescript, all types are inferred from your cod 

`useTwix` isn't a component library.

## Usage

Simply call the use-twix hook from anywhere in your app.

Your component will update whenever the values defined in the hook are changed!

```jsx
import { useTwix } from 'use-twix'

function MyComponent() {
  const { myValue } = useTwix({ myValue: 10 })
  return myValue
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ggsimm"><img src="https://avatars0.githubusercontent.com/u/1862172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gianmarco</b></sub></a><br /><a href="#ideas-gsimone" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/use-twix/commits?author=gsimone" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dbismut"><img src="https://avatars2.githubusercontent.com/u/5003380?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Bismut</b></sub></a><br /><a href="https://github.com/gsimone/use-twix/commits?author=dbismut" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
