# Genshin-kit.js

Genshin-kit.js is a Node.js module that allows you to easily interact with the Genshin Impact API.

Nilou ❣️

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
const { Client, ClientCookieManager, Language, CookieFormatter }= require('genshin-kit.js');

(async () => {
    const manager = new ClientCookieManager();
    manager.set('', '');
    // As HoYolab api have limit each cookie, you can set multiple cookies.
    // we will return random cookie if you set multiple cookies.
    const cookieForRequest = manager.get();
    const ltoken = cookieForRequest.ltoken;
    const ltuid = cookieForRequest.ltuid;

    // you also can delete cookie manually.
    manager.delete();
    console.log(manager.getAll()); // it will return empty array because we only have one cookie.

    const client = new Client(
        manager,
        {
            language: Language.ChineseTW,
        }
    );

    // request by client
    const abyss = await client.getAbyssBattle("uid")
    console.log(abyss)

    // request by endpoint
    const abyssEndpoint = new SpiralAbyss();
    const abyssEndpointResult = await abyssEndpoint.get(Language.ChineseTW, CookieFormatter(ltoken, ltuid), "uid")
    // if you use endpoint, it allows you to visit last request result
    const cache = abyssEndpoint.cache.get("uid")
    console.log(cache)
    console.log(abyssEndpointResult)
}
)();
```