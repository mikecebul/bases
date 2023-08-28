import { getErrorMessage } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const path = req.query.path;

  try {
    if (typeof path === "string") {
      await res.revalidate(path);
    }
    return res.json({ revalidated: true });
  } catch (error) {
    console.log(
      getErrorMessage(error, `Error attempting to revalidate: ${path}`)
    );
    return res.status(500).json({ error: "Error Invalidating Cache." });
  }
}
