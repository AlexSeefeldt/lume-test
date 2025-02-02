export default ({ search, comp }: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <h1>Latest posts</h1>
    <comp.PostList search={search} />
    <a href="/posts/">All posts →</a>
    <h2>Latest bleats</h2>
    <comp.BleatList search={search} />
    <a href="/microblog/">All bleats →</a>
  </>
);
