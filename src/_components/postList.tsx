export default ({ search, limit }: {
  search: PageData["search"];
  limit?: number;
}) => (
  <>
    {search.pages("post=true !bleat=true url!=false", "date=desc").filter((_, i) => limit !== undefined ? i < limit : true).map(data => <div>
      <h3><a href={data.url}>{data.title}</a></h3>
      {data.date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
      {data.page.document && <div dangerouslySetInnerHTML={{ __html: data.page.document.querySelector("p")?.outerHTML ?? "" }}></div>}
      <hr/>
    </div>)}
  </>
);
