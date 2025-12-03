"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteGhostApi(ghostApiId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");
  await prisma.ghostApi.delete({
    where: {
      id: ghostApiId,
    },
  });

  revalidatePath("/my-api?page=1");
}
