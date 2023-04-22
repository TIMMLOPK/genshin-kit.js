export default {
    logo: <span>Genshin-kit.js</span>,
    project: {
        link: 'https://github.com/TIMMLOPK/genshin-kit.js'
    },
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="Genshin-kit.js" />
            <meta property="og:description" content="Genshin-kit.js is a JavaScript library for Genshin Impact." />
        </>
    ),
    darkMode: true,
    docsRepositoryBase: "https://github.com/TIMMLOPK/genshin-kit.js",
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Genshin-kit.js',
        }
    },
    footer: {
        text: <span>
            {new Date().getFullYear()} © <a href="https://github.com/TIMMLOPK" target="_blank">TIMMLOPK</a>
        </span>,
    }
}