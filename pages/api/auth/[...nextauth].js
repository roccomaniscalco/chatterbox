import NextAuth from "next-auth";
import { getAuthOptions } from "../../../lib/auth";

const authOptions = getAuthOptions();

export default NextAuth(authOptions);
