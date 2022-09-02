[![npm (tag)](https://img.shields.io/npm/v/leva?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/leva) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/leva?style=flat&colorA=000000&colorB=000000&label=gzipped)](https://bundlephobia.com/result?p=leva) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pmndrs/leva/CI?style=flat&colorA=000000) [![Discord Shield](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=&logo=discord&logoColor=ffffff)](https://discord.gg/poimandres)

<a href=""><img src="https://raw.githubusercontent.com/gsimone/leva/master/hero.png" /></a>
<br />

<div align="center"><strong>A GUI you are going to lava.</strong></div>
<div align="center"> Customizable, extensible and beautiful by default.</div>
<br />
<div align="center">
<a href="http://leva.pmnd.rs/">Storybook</a> 
</div>
<br />
<div align="center">
  <sub>by <a href="https://twitter.com/pmndrs">Poimandres</a></sub>
</div>

<br />

## 🚧🚧 This repo is under heavy development 🚧🚧

## Features

- ⭐️ Beautiful by default
- 🎚 More than 12 different kinds of inputs available
- 🧐 Smart input type recognition
- 🔌 Easy-to-make plugins
- ✅ Keyboard accessible
- ⚡️ No setup necessary

### Installation

```bash
npm i leva
```

### Quick start

Simply call the `useControls` hook from anywhere in your app:

```jsx
import { useControls } from 'leva'

function MyComponent() {
  const { name, aNumber } = useControls({ name: 'World', aNumber: 0 })

  return (
    <div>
      Hey {name}, hello! {aNumber}
    </div>
  )
}
```

NOTE: Using Leva with React 18 will cause a console error about createRoot which you can safely ignore, or fix by following the instructions here: [discussion](https://github.com/pmndrs/leva/issues/358)

### Documentation

- [Getting Started](/docs/getting-started.md)
- [Inputs](/docs/inputs.md)
- [Configuration](/docs/configuration.md)
- [Styling](/docs/styling.md)

- [Advanced: Controlled Inputs](/docs/advanced/controlled-inputs.md)
- [Advanced: Creating Plugins](/docs/advanced/creating-plugins.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AndrewPrifer"><img src="https://avatars1.githubusercontent.com/u/2991360?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andrew Prifer</b></sub></a><br /><a href="#ideas-AndrewPrifer" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/use-leva/commits?author=AndrewPrifer" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/ariaminaei"><img src="https://avatars3.githubusercontent.com/u/593118?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Aria</b></sub></a><br /><a href="#ideas-AriaMinaei" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/dbismut"><img src="https://avatars2.githubusercontent.com/u/5003380?v=4?s=80" width="80px;" alt=""/><br /><sub><b>David Bismut</b></sub></a><br /><a href="#ideas-dbismut" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/use-leva/commits?author=dbismut" title="Code">💻</a></td>
    <td align="center"><a href="https://jeetiss.github.io/"><img src="https://avatars.githubusercontent.com/u/6726016?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dmitry Ivakhnenko</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/commits?author=jeetiss" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/ggsimm"><img src="https://avatars0.githubusercontent.com/u/1862172?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Gianmarco</b></sub></a><br /><a href="#ideas-gsimone" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/use-leva/commits?author=gsimone" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/guidovizoso/?locale=en_US"><img src="https://avatars.githubusercontent.com/u/27702539?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Guido Vizoso</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/commits?author=guidovizoso" title="Code">💻</a></td>
    <td align="center"><a href="https://iinf.in/"><img src="https://avatars0.githubusercontent.com/u/48106228?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Han</b></sub></a><br /><a href="#design-iinfin" title="Design">🎨</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ivanross"><img src="https://avatars1.githubusercontent.com/u/15856208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ivan Rossi</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/issues?q=author%3Aivanross" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://n1ru4l.cloud/"><img src="https://avatars.githubusercontent.com/u/14338007?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Laurin Quast</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/commits?author=n1ru4l" title="Code">💻</a> <a href="#ideas-n1ru4l" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/marcofugaro"><img src="https://avatars3.githubusercontent.com/u/7217420?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marco Fugaro</b></sub></a><br /><a href="#ideas-marcofugaro" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/emmelleppi"><img src="https://avatars2.githubusercontent.com/u/39760175?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marco Ludovico Perego</b></sub></a><br /><a href="#ideas-emmelleppi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://haspar.us/"><img src="https://avatars.githubusercontent.com/u/15332326?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Piotr Monwid-Olechnowicz</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/commits?author=hasparus" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/clementcassajus"><img src="https://avatars.githubusercontent.com/u/13033639?v=4?s=80" width="80px;" alt=""/><br /><sub><b>clementcassajus</b></sub></a><br /><a href="#design-clementcassajus" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/thephoenixofthevoid"><img src="https://avatars2.githubusercontent.com/u/49817252?v=4?s=80" width="80px;" alt=""/><br /><sub><b>thephoenixofthevoid</b></sub></a><br /><a href="https://github.com/gsimone/use-leva/issues?q=author%3Athephoenixofthevoid" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
