<img src="https://raw.githubusercontent.com/gsimone/leva/docs/hero.png" />

<div align="center">
    <img src="https://badgen.net/npm/v/leva" alt="NPM Version" />
  <img src="https://badgen.net/bundlephobia/minzip/leva" alt="minzipped size"/>
    <img src="https://github.com/gsimone/leva/workflows/CI/badge.svg" alt="Build Status" />
</a>
</div>
<br />
<div align="center"><strong>A GUI you are going to lava.</strong></div>
<div align="center"> Customizable, extensible and beautiful by default.</div>
<br />
<div align="center">
<a href="https://docs.pmnd.rs/leva">Documentation</a> 
</div>
<br />
<div align="center">
  <sub>by <a href="https://twitter.com/pmndrs">Poimandres</a></sub>
</div>

<br />

## Features

- ⭐️ Beautiful by default
- 🎚 More than 12 different kinds of inputs available
- 🧐 Smart input type recognition
- 🔌 Easy-to-make plugins
- ✅ Keyboard accessible
- ⚡️ No setup necessary

### Installation

```bash
yarn add leva
```

### Getting started

Simply call the `useControls` hook from anywhere in your app:

```
import { useControls } from "leva"

function MyComponent() {
  const { name } = useControls({ name: "World" })
  
  return <div>Hey {name}, hello!</div>
}
```

<!-- ### Documentation

Find the full API reference on the [official documentation](https://docs.pmnd.rs/leva)

## Features
* As-you-type filtering of inputs. 
* You can modify number inputs by either dragging over the input label or inner label.
* The lib automatically calculates the number input step based on the initial value magnitude and significant digits. 
* Increase / decrease numbers with arrow keys, with alt (`±0.1`) and shift (`±10`) modifiers support.
* Draggable pane.
* Supports copying values.
* Supports conditional rendering of inputs.

## Inputs
* String
* Boolean
* Number
* Range
* Interval `[min,max]`
* Point2d `[x,y]` or `{x,y}`
* Point3d `[x,y,z]` or `{x,y,z}`
* Color `#hex` and `{r,g,b,a}`
* Select
* Spring `{tension,friction,mass}`
* Image

## Usage

Simply call the `useControls` hook from anywhere in your app.

Your component will update whenever the values defined in the hook are changed!

```jsx
import { useControls } from 'leva'

function MyComponent() {
  const { myValue } = useControls({ myValue: 10 })
  return myValue
}
``` -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ggsimm"><img src="https://avatars0.githubusercontent.com/u/1862172?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Gianmarco</b></sub></a><br /><a href="#ideas-gsimone" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/leva/commits?author=gsimone" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dbismut"><img src="https://avatars2.githubusercontent.com/u/5003380?v=4?s=80" width="80px;" alt=""/><br /><sub><b>David Bismut</b></sub></a><br /><a href="#ideas-dbismut" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsimone/leva/commits?author=dbismut" title="Code">💻</a></td>
    <td align="center"><a href="https://iinf.in/"><img src="https://avatars0.githubusercontent.com/u/48106228?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Han</b></sub></a><br /><a href="#design-iinfin" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/AndrewPrifer"><img src="https://avatars1.githubusercontent.com/u/2991360?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andrew Prifer</b></sub></a><br /><a href="#ideas-AndrewPrifer" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://twitter.com/ariaminaei"><img src="https://avatars3.githubusercontent.com/u/593118?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Aria</b></sub></a><br /><a href="#ideas-AriaMinaei" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/emmelleppi"><img src="https://avatars2.githubusercontent.com/u/39760175?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marco Ludovico Perego</b></sub></a><br /><a href="#ideas-emmelleppi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/marcofugaro"><img src="https://avatars3.githubusercontent.com/u/7217420?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marco Fugaro</b></sub></a><br /><a href="#ideas-marcofugaro" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ivanross"><img src="https://avatars1.githubusercontent.com/u/15856208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ivan Rossi</b></sub></a><br /><a href="https://github.com/gsimone/leva/issues?q=author%3Aivanross" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/thephoenixofthevoid"><img src="https://avatars2.githubusercontent.com/u/49817252?v=4?s=80" width="80px;" alt=""/><br /><sub><b>thephoenixofthevoid</b></sub></a><br /><a href="https://github.com/gsimone/leva/issues?q=author%3Athephoenixofthevoid" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
