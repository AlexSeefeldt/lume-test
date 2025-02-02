export default ({ title, head, children, date, post, bleat }: PageData<{ head: JSX; post: boolean; bleat: boolean; }>, _helpers: Lume.Helpers) => (
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
      {post && !bleat && <h2>{title}</h2>}
      {post && date.toLocaleDateString("en-US", bleat ? { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hourCycle: 'h12'} : { day: 'numeric', month: 'short', year: 'numeric' })}
      {children}
      {post && <a href="/">← Home</a>}
    </body>
  </html>
);
