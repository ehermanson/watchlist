import { createClient } from "@supabase/supabase-js";
import { createCookieSessionStorage, redirect } from "remix";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "watchlist-session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await supabaseClient.auth.signIn({
    email,
    password,
  });

  return result;
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await supabaseClient.auth.signUp({
    email,
    password,
  });

  return result;
};

export async function signOut(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function createUserSession(userId: string) {
  let session = await getSession();
  session.set("userId", userId);
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
