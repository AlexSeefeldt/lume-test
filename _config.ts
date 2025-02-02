import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";

const site = lume({ src: "./src", prettyUrls: false });

site.use(jsx());
site.use(slugifyUrls({ replace: { "'":"", "’":"" } }));

site.addEventListener("beforeRender", (event) => {
  event.pages.forEach(page => {
    if (page.data.tags.includes("bleat")) {
      page.data.url = `/microblog/${page.data.date.getTime()}.html`;
      page.data.title = `Bleat at ${page.data.date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hourCycle: 'h12'})}`
    } else if (page.data.tags.includes("post") && !page.data.title) {
      page.data.title = page.sourcePath.replace(/^\/posts\//, "").replace(/\.md$/, "");
    }
  });
});

site.process([".html"], pages => {
  pages.forEach(page => {
    if (page.content) {
      page.content = page.content.toString().replaceAll(/\[\[([^\]\|]*)(\|([^\]]*))?\]\]/g, (match, name, _, display_name) => {
        const link_page = pages.find(page => page.sourcePath === `/posts/${name}.md`);
        return link_page ? `<a href="${link_page.data.url}">${display_name ?? name}</a>` : match;
      });
    }
  });
});

// this has to come after the process step because we want the [[links]] we add to be converted to relative as well
site.use(relativeUrls());

// site.addEventListener("afterRender", (event) => {
//   for (let i = event.pages.length - 1; i >= 0; i--) {
//     const page = event.pages[i];
//     if (page.data.tags.includes("bingle")) {
//       // page.data.renderOrder = -1
//       console.log("removing bingle")
//       console.info(page.content)
//       event.pages.splice(i, 1);
//     }
//   }
// });

site.copyRemainingFiles();

export default site;
