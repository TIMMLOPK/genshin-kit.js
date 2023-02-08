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

    // make the request
    const abyss = await client.sprialAbyss.fetch("UID")
    console.log(abyss)
}
)();
```
---
## Advanced Usage

### Cache
genshin-kit.js has cached response except daily reward.

```javascript
// enable cache
const client = new Client({ cache: true })
```

### Multiple cookies
Sometime you want to use different cookies to avoid hitting cookies limit.
If you provide more than one cookie, it will use the first , then the second...

```javascript
const client = new Client()
client.addCookies([{ ltoken: "LTOKEN", ltuid: "LTUID" }, {}, {}, {}])
```

## Help
💡 If you need help, you can find me at Discord Timmy#2600
