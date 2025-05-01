import { toast } from "sonner";
import { createClient } from "./supabase/client";
import { RouterlikeType } from "@/types/common";

export const getClientWithSession = async (router: RouterlikeType) => {
  const client = createClient();
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    router.replace("/auth");
    toast.warning("Session expired");
    return { client: null, userId: null };
  }
  return { client, userId: session.user.id };
}
