import { withAuth } from "next-auth/middleware";

// protect all pages and API routes except for index
export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/") return true;
      else if (req.nextUrl.pathname.includes("/images/chatterbox-link-preview.jpg")) return true;
      else if (token) return true;
      return false;
    },
  },
});
