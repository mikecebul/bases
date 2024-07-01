import { CustomComponent, Payload } from "payload";
import { Button } from "./Button";

export const SeedButton: CustomComponent = async ({
  payload,
}: {
  payload: Payload;
}) => {
  const { docs: services } = await payload.find({
    collection: "services",
    depth: 0,
    limit: 0,
  });

  if (services.length > 0) return null;

  return (
    <div>
      <Button />
    </div>
  );
};
