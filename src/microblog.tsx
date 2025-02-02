export const url = "/microblog/index.html";

export default ({ search, comp }: PageData, _helpers: Lume.Helpers) => (
  <>
    <h1>All bleats</h1>
    <comp.BleatList search={search} />
    <a href="/">← Back</a>
  </>
);
