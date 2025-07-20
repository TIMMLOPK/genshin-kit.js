import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

export const metadata = {
  title: "Genshin-kit.js",
  description: "Genshin-kit.js is a JavaScript library for Genshin Impact.",
};

const navbar = <Navbar logo={<b>Genshin-kit.js</b>} projectLink="https://github.com/TIMMLOPK/genshin-kit.js" />;
const footer = <Footer>Built with ❤️ by TIMMLOPK</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/TIMMLOPK/genshin-kit.js/tree/master/apps/website"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
