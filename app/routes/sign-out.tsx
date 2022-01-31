import { signOut } from "../lib/supabase.server";
import { redirect } from "remix";
import type { ActionFunction } from "remix";

export const loader = () => {
  return redirect("/");
};

export const action: ActionFunction = async ({ request }) => {
  return signOut(request);
};
