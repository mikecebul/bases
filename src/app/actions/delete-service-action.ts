// "use server";

// import prisma from "@/shared/lib/prisma";
// import { getErrorMessage } from "@/shared/lib/utils";
// import { revalidatePath } from "next/cache";

// export async function DeleteServiceAction(id: string) {
//   "use server";

//   try {
//     const deleteService = await prisma.service.delete({
//       where: {
//         id: id,
//       },
//     });
//     // revalidatePath("/");
//     // revalidatePath("/(home)/services");
//     return { success: true };
//   } catch (error) {
//     return {
//       error: getErrorMessage(
//         error,
//         "Oops, there was an error deleting the service. Please try again."
//       ),
//     };
//   }
// }
