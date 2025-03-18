# Genshin-kit.js

Genshin-kit.js is a Node.js module that allows you to easily interact with the Genshin Impact API.

Documentation: https://genshin-kit-js.vercel.app/

## Installation
**Node.js 16.9.0 or newer is required.**

```bash
npm install genshin-kit.js
```
```bash
yarn add genshin-kit.js
```
```bash
pnpm add genshin-kit.js
```

## Usage
```js
const { Client, Language, SpiralAbyss } = require("genshin-kit.js");
// import { Client, Language, SpiralAbyss } from "genshin-kit.js"; (if you use typescript/ESM)

(async () => {
  const client = new Client({
    language: Language.EnglishUS,
  });

  client.login("LTUID", "LTOKEN");

  const abyss = await client.sprialAbyss.fetch("UID");

  console.log(abyss);
})();
```
