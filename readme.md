# Genshin-kit.js

> **Warning**
> This library is developing.

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
const { Client, ClientCookieManager } = require('genshin-kit.js');

(async () => {
    const manager = new ClientCookieManager();
    manager.setCookie('ltoken', 'ltuid');
    const client = new Client(
        manager,
        {
            language: 'zh-tw',
            retry: false
        }
    );

    const result = await client.getAbyssBattle("uid");
    console.log(result);
}
)();
```