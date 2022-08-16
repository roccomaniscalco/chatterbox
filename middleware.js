export { default } from "next-auth/middleware";

// defines protected routes
export const config = { matcher: ["/chat", "/api/pusher"] };
