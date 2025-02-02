export default ({ title, head, children, tags, date }: PageData<{ head: JSX }>, _helpers: Lume.Helpers) => (
  <html lang="en">
    <head>
      {title && <title>{title}</title>}
      <meta charset="utf-8"/>
      <meta name="theme-color" content="#f93366"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
      <link rel="icon" type="image/x-icon" href="./favicon.ico"/>
      <link rel="stylesheet" type="text/css" href="/css/style.css"/>
      {head}
    </head>
    <body>
      {tags.includes("post") && !tags.includes("bleat") && <h2>{title}</h2>}
      {tags.includes("post") && date.toLocaleDateString("ja-JP", tags.includes("bleat") ? { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hourCycle: 'h12'} : { day: 'numeric', month: 'short', year: 'numeric' })}
      {children}
      {tags.includes("post") && <a href="/">← Home</a>}
    </body>
  </html>
);
