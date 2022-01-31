import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Link,
  useCatch,
  MetaFunction,
  LoaderFunction,
  LinksFunction,
  Form,
} from "remix";
import { getUserId } from "./lib/supabase.server";
import { Box } from "~/components";

import resetCssUrl from "~/style/reset.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: resetCssUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "WatchList",
    description: "Track shows and movies you want to watch, or whatever",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);

  return {
    isLoggedIn: !!userId,
  };
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}) {
  return (
    <div>
      <Box
        as="header"
        css={{
          display: "flex",
          justifyContent: "space-between",
          padding: "$6",
        }}
      >
        <Link to="/">Watchlist</Link>
        {isLoggedIn && (
          <Box
            as="nav"
            aria-label="Main navigation"
            css={{
              display: "flex",
              gap: "$3",
            }}
          >
            <Link to="/shows">Shows</Link>
            <Link to="/movies">Movies</Link>
            <Form method="post" action="/sign-out">
              <Box
                as="button"
                css={{
                  color: "$gray12",
                  background: "none",
                  textDecoration: "underline",
                }}
                type="submit"
              >
                Sign Out
              </Box>
            </Form>
          </Box>
        )}
      </Box>
      <Box as="main">{children}</Box>
    </div>
  );
}

export default function App() {
  const loader = useLoaderData();

  return (
    <Document>
      <Layout isLoggedIn={loader.isLoggedIn}>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </Document>
  );
}
