export default ({ search }: { search:PageData["search"] }) => (
  <>
    {search.pages("post !bleat url!=false", "date=desc").filter((_, i) => i < 5).map(data => <div>
      <h3><a href={data.url}>{data.title}</a></h3>
      {data.date.toLocaleDateString("ja-JP", { day: 'numeric', month: 'short', year: 'numeric' })}
      {data.page.document && <div dangerouslySetInnerHTML={{ __html: data.page.document.querySelector("p")?.outerHTML ?? "" }}></div>}
      <hr/>
    </div>)}
  </>
);
