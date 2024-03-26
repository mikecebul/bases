import BoardCreateForm from "@/components/admin/team/board/boardCreateForm";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
  return (
    <>
      <div>
        <h1 className="pb-2 pl-8 text-4xl font-semibold">
          Create a new staff member
        </h1>
        <Separator />
      </div>
      <BoardCreateForm />
    </>
  );
}
