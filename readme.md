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

    client.login("LTUID", "LTOKEN");

    // make the request
    const abyss = await client.sprialAbyss.fetch("UID");
    console.log(abyss);
}
)();
```
# Advanced Usage

## Cache
genshin-kit.js has cached all responses from the API(except `RedeemCode`), so you can use it without making a request to the API.

**Note**: The key of cache is the UID, cookie or other things you use to make the request.
```javascript
const client = new Client();
client.[ROUTE_NAME].cache.get("key");
```

Client have a global sweeper for cleaning the cache, you can customize it by passing `cacheOptions` to the constructor.
```javascript
const client = new Client({
    cacheOptions: {
        maxAge: 60, // the cache will be deleted after 60 seconds
        maxSize: 0, // it wouldn't cache anythings
    },
});
```
---

## Multiple cookies
Sometime you want to use different cookies to avoid hitting cookies limit.You can use `addCookies` to add more cookies to the client.

If you provide more than one cookie, it will use the first , and then the second...
```javascript
const client = new Client()
client.addCookies([{ ltoken: "LTOKEN", ltuid: "LTUID" }, {}, {}, {}])
```

## Help
💡If you need help, you can find me at Discord **Timmy#2600**
