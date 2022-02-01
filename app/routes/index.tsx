import { Link, LoaderFunction, useLoaderData } from "remix";
import { getUserId } from "~/lib/supabase.server";
import { Box } from "~/components";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  return {
    isLoggedIn: !!userId,
  };
};

export default function Index() {
  const loaderData = useLoaderData();

  return (
    <Box css={{ textAlign: "center", p: "$5" }}>
      {loaderData.isLoggedIn ? (
        <>
          <h1>Welcome back.</h1>
          <Box css={{ display: "flex", gap: "$5", justifyContent: "center" }}>
            <Link to="/shows">Shows List</Link>
            <Link to="/movies">Movies List</Link>
          </Box>
        </>
      ) : (
        <>
          <h1>hey. sign in or sign up.</h1>
          <Box css={{ display: "flex", gap: "$5", justifyContent: "center" }}>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </Box>
        </>
      )}
    </Box>
  );
}
