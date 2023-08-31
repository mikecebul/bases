"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons, renderIcon } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn, revalidate } from "@/lib/utils";
import DeleteServiceButton from "./deleteServiceButton";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DropResult,
} from "react-beautiful-dnd";
import { Service } from "@prisma/client";
import { useEffect, useState } from "react";
import { UpdateServicesOrderAction } from "@/actions/update-services-order-action";
import { toast } from "../ui/use-toast";
import TableSkeleton from "./tableSkeleton";

export default function DndServices({ services }: { services: Service[] }) {
  const [items, setItems] = useState(services);
  const [tableReady, setTableReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTableReady(true);
    }
  }, []);

  const handleDragDrop: OnDragEndResponder = async (results: DropResult) => {
    const { source, destination, type } = results;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "group") {
      const reorderedItems = [...items];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedItem] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, removedItem);

      setItems(reorderedItems);
      const result = await UpdateServicesOrderAction(reorderedItems);
      if (result?.error) {
        toast({
          variant: "destructive",
          description: result.error,
        });
      } else {
        toast({ description: "Service was updated successfully." });
        await revalidate("/");
        await revalidate("/services");
      }
    }
    return;
  };

  return tableReady ? (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="services" type="group">
        {(provided, snapshot) => (
          <Table
            ref={provided.innerRef}
            className={cn("", {
              "bg-cyan-50": snapshot.isDraggingOver,
            })}
          >
            <TableCaption className="pb-2">
              A list of our services.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Front Page</TableHead>
                <TableHead className="">Edit</TableHead>
                <TableHead className="">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((service, index) => (
                <Draggable
                  draggableId={service.id}
                  key={service.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn("", {
                        "bg-teal-100/80": snapshot.isDragging,
                      })}
                    >
                      <TableCell className="w-1/5 font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell className="w-2/5 font-medium">
                        {service.description}
                      </TableCell>
                      <TableCell className="font-medium">
                        {!!service.icon
                          ? renderIcon(service.icon)
                          : renderIcon("fallback")}
                      </TableCell>
                      <TableCell>
                        {service.status === "PUBLISHED" ? (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-green-600 hover:bg-green-600 w-28"
                            )}
                          >
                            <p>Published</p>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-yellow-500 hover:bg-yellow-500 text-black w-28"
                            )}
                          >
                            <p>Draft</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {service.frontpage ? (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-green-600 hover:bg-green-600 w-28"
                            )}
                          >
                            <p>Yes</p>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-yellow-500 hover:bg-yellow-500 text-black w-28"
                            )}
                          >
                            <p>No</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            }),
                            ""
                          )}
                          href={`/admin/services/edit/${service.id}`}
                        >
                          <Icons.pencil />
                        </Link>
                      </TableCell>
                      <TableCell className="">
                        <DeleteServiceButton
                          id={service.id}
                          name={service.name}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          </Table>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <TableSkeleton />
  );
}
