# Genshin-kit.js

Genshin-kit.js is a Node.js module that allows you to easily interact with the Genshin Impact API.

---

Documentation: Coming soon.

## Installation
**Node.js 16.9.0 or newer is required.**

```bash
npm install genshin-kit.js
```

## Example

Simple example:

```javascript
const { Client, Language, SpiralAbyss } = require('genshin-kit.js');

(async () => {
    const client = new Client({
        language: Language.EnglishUS,
    });

    client.setltoken('LTOKEN');
    client.setltuid('LTUID');

    // request by client
    const abyss = await client.getAbyssBattle("UID");
    console.log(abyss)

    // Or request by endpoint
    const abyssEndpoint = new SpiralAbyss();
    const abyssEndpointResult = await abyssEndpoint.fetch("UID", Language.ChineseTW, `ltoken=YOUR_LTOKEN;ltuid=YOUR_LTUID`);
    // and it is cached
    const cache = abyssEndpoint.cache.get("UID");
    console.log(cache)
    console.log(abyssEndpointResult)
}
)();
```
