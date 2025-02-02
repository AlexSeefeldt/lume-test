export const url = "/posts/index.html";

export default ({ search, comp }: PageData, _helpers: Lume.Helpers) => (
  <>
    <h1>All posts</h1>
    <comp.PostList search={search} />
    <a href="/">← Home</a>
  </>
);
