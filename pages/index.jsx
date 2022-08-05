import { signIn, signOut, useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github", { callbackUrl: "/chat"})}>Sign in</button>
    </>
  );
}

export default Index;