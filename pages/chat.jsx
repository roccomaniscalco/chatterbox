import { unstable_getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import ChatLayout from "../layouts/ChatLayout";

const Chat = () => {
  return <div>hey world!</div>
};

Chat.getLayout = (page) => {
  return <ChatLayout>{page}</ChatLayout>;
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  });

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: { session } };
};

export default Chat;
