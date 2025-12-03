import { generateData } from "@/helpers/dataGenerator";
import { Response } from "@/helpers/response";
import { validateApiKey } from "@/helpers/validateApiKey";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

type params = {
  apiKey: string;
  endPointName: string;
};

export async function handler(
  req: NextRequest,
  context: { params: Promise<params> }
) {
  try {
    const { apiKey, endPointName } = await context.params;

    if (!validateApiKey(apiKey)) {
      return Response.error(["Invalid API key"], 401);
    }

    const apiKeyExist = await prisma.apiKey.findUnique({
      where: { apiKey },
      select: {
        id: true,
        clerkUserId: true,
      },
    });

    if (!apiKeyExist)
      return Response.error(["Invalid api key", "api key does not exist"], 404);

    const { searchParams } = new URL(req.url);
    const count = Number(searchParams.get("count"));

    const apiData = await prisma.ghostApi.findUnique({
      where: {
        clerkUserId_endPointName: {
          clerkUserId: apiKeyExist.clerkUserId,
          endPointName,
        },
      },
    });

    if (!apiData)
      return Response.error(
        ["Invalid api url", "endpoint does not exist"],
        404
      );

    const resData = generateData(
      apiData.jsonTemplate as Record<string, string>,
      count || apiData.defaultCount
    );

    await prisma.apiCall.create({
      data: {
        ghostApiId: apiData.id,
        apiKeyId: apiKeyExist.id,
        ipAddress: req.headers.get("X-Forwarded-For"),
        clerkUserId: apiKeyExist.clerkUserId,
      },
    });
    return Response.success(resData);
  } catch (error) {
    console.log("failed to server api request", error);
    return Response.error(["failed to serve api request"]);
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
