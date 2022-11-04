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
---
## Advanced Usage

#### Cache: genshin-kit.js has cached all endpoint except daily signIn.(The cache default is false)

```javascript
// enable caching for endpoint
const abyss = new SpiralAbyss({ cache: true }) 
// enable caching for client
const client = new Client({ cache: true })
```

### Multiple cookies
Sometime you may want to use different cookie to avoid hit single cookie limit.
If you provide more than one cookie, it will use the first one first, then the second one, etc.

```javascript
const client = new Client()
client.setltoken('token1');
client.setltuid('ltuid1');

client.setltoken("token2");
client.setltuid("uid2");
```

## Help
💡 If you need help, you can find me at Discord [Timmy#2600]
