import { cookies } from "next/headers";

export const getServerToken = async () => {
  return (await cookies()).get("token")?.value;
};
