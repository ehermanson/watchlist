import { Form, useActionData, ActionFunction } from "remix";
import { signIn, createUserSession } from "../lib/supabase.server";
import { Input, Box, Button } from "~/components";

export let action: ActionFunction = async ({ request }) => {
  let { email, password } = Object.fromEntries(await request.formData());

  if (typeof email !== "string" || typeof password !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  const { user, error } = await signIn({
    email,
    password,
  });

  if (user) {
    return createUserSession(user.id);
  }

  return { formError: error?.message };
};

export default function SignIn() {
  const actionData = useActionData();

  return (
    <Box css={{ maxWidth: 400, margin: "auto" }}>
      <Box as="h1" css={{ textAlign: "center", mb: "$10" }}>
        Sign in to your account
      </Box>
      {actionData?.formError ? (
        <Box css={{ color: "$red10", mb: "$5", fontWeight: "bold" }}>
          {actionData.formError}
        </Box>
      ) : null}
      <Form method="post">
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "$5",
          }}
        >
          <Input label="Email" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
          <Button>Sign In</Button>
        </Box>
      </Form>
    </Box>
  );
}
