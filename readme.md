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

    client.login({ ltoken: 'YOUR_LTOKEN', ltuid: 'YOUR_LTUID' });

    // request by client
    const abyss = await client.getAbyssBattle("UID");
    console.log(abyss)

    // request by endpoint
    const abyssEndpoint = new SpiralAbyss();
    const abyssEndpointResult = await abyssEndpoint.get("UID", Language.ChineseTW, `ltoken=YOUR_LTOKEN;ltuid=YOUR_LTUID`);
    // if you use endpoint, you can use cache
    const cache = abyssEndpoint.cache.get("UID-SpiralAbyss");
    console.log(cache)
    console.log(abyssEndpointResult)
}
)();
```