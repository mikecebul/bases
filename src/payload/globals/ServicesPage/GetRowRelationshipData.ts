import payloadConfig from "@/@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export async function GetRowRelationshipData(id: string) {
  const payload = getPayloadHMR({ config: payloadConfig });
  const relationshipData = (await payload).findByID({
    collection: "services",
    id: id,
  });
  return relationshipData;
}
