import BoardCreateForm from "@/components/admin/boardCreateForm";
import ServiceCreateForm from "@/components/admin/serviceCreateForm";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
  return (
    <>
      <div>
        <h1 className="pl-8 text-4xl font-semibold pb-2">
          Create a new service
        </h1>
        <Separator />
      </div>
      <ServiceCreateForm />
    </>
  );
}
