"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "../ui/button";

export function FieldArrayExample() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }],
    },
  });
  const { fields, append, remove} =
    useFieldArray({
      control,
      name: "test",
    });

  const onSubmit = (data: any) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`test.${index}.firstName`, { required: true })}
              />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <Button type="button" onClick={() => remove(index)}>
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
      <section>
        <Button
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "" });
          }}
        >
          append
        </Button>
      </section>

      <Button type="submit">Submit</Button>
    </form>
  );
}
