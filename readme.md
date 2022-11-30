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
const { Client, Language, SpiralAbyss, CookieFormatter } = require('genshin-kit.js');

(async () => {
    const client = new Client({
        language: Language.EnglishUS,
    });

    client.login("LTUID", "LTOKEN")

    // request by client
    const abyss = await client.sprialAbyss.fetch("UID")
    console.log(abyss)

    // Or request by new route
    const abyssEndpoint = new SpiralAbyss();
    const abyssEndpointResult = await abyssEndpoint.fetch("UID", { language: Language.EnglishUS, cookie: CookieFormatter("LTOKEN", "LTUID") })
    console.log(abyssEndpointResult)
}
)();
```
---
## Advanced Usage

### Cache
genshin-kit.js has cached response except daily reward.

```javascript
// enable caching for endpoint (The cache default is false)
const abyss = new SpiralAbyss({ cache: true }) 
// enable caching for client
const client = new Client({ cache: true })
```

### Multiple cookies
Sometime you may want to use different cookie to avoid hit single cookie limit.
If you provide more than one cookie, it will use the first one first, then the second one, etc.

```javascript
const client = new Client()
client.addCookies([{ ltoken: "LTOKEN", ltuid: "LTUID" }, {}, {}, {}])
```

## Help
💡 If you need help, you can find me at Discord [Timmy#2600]
