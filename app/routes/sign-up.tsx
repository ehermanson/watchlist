import { Form, redirect, useActionData, ActionFunction } from "remix";
import {
  supabaseClient,
  getSession,
  commitSession,
  signUp,
} from "~/lib/supabase.server";
import { Input, Box, Button } from "~/components";

const lazyEmailValidation = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export let action: ActionFunction = async ({ request }) => {
  let { email, password, passwordConfirm } = Object.fromEntries(
    await request.formData()
  );

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof passwordConfirm !== "string"
  ) {
    return { formError: "You need to type something in each field." };
  }

  if (!lazyEmailValidation(email)) {
    return {
      formError: "That doesn't really seem like an email address.",
    };
  }

  if (password !== passwordConfirm) {
    return {
      formError: "Passwords need to match!",
    };
  }

  await supabaseClient.auth.signOut();

  const { session, user, error } = await signUp({ email, password });

  if (!error) {
    let userSession = await getSession(request.headers.get("Cookie"));
    userSession.set("userID", session?.access_token);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(userSession),
      },
    });
  }

  return { user, formError: error?.message };
};

export default function Login() {
  const actionData = useActionData();

  return (
    <Box css={{ maxWidth: 400, margin: "auto", p: "$5" }}>
      <Box as="h1" css={{ textAlign: "center", mb: "$10" }}>
        Sign Up
      </Box>
      {actionData?.formError ? (
        <Box css={{ color: "$red10", mb: "$5", fontWeight: "bold" }}>
          {actionData.formError}
        </Box>
      ) : null}
      <Form method="post">
        <Box css={{ display: "flex", flexDirection: "column", gap: "$5" }}>
          <Input label="Email Address" id="email" name="email" type="text" />
          <Input label="Password" name="password" type="password" />
          <Input
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
          />
          <Button>Sign Up</Button>
        </Box>
      </Form>
    </Box>
  );
}
