export default ({ search }: { search:PageData["search"] }) => (
  <>
    {search.pages("post=true bleat=true url!=false", "date=desc").flatMap(data => data.page.document ? [<div>
      <a href={data.url}>{data.date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hourCycle: 'h12'})}</a>
      <div dangerouslySetInnerHTML={{ __html: data.page.document.querySelector("div")?.innerHTML ?? "" }}></div>
    </div>] : [])}
  </>
);
