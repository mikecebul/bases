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
import BioPopover from "./bioPopover";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn, revalidate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DeleteBoardMemberButton from "./deleteBoardMemberButton";
import { BoardMember } from "@prisma/client";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { UpdateBoardMemberOrderAction } from "@/actions/update-board-member-order-action";
import { toast } from "../ui/use-toast";

export default function DndBoardMembers({
  boardMembers,
}: {
  boardMembers: BoardMember[];
}) {
  const [items, setItems] = useState(boardMembers);

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
      const result = await UpdateBoardMemberOrderAction(reorderedItems);
      if (result?.error) {
        toast({
          variant: "destructive",
          description: result.error,
        });
      } else {
        toast({ description: "Board member order was updated successfully." });
        await revalidate("/team");
      }
    }
    return;
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="boardMembers" type="group">
        {(provided, snapshot) => (
          <Table
            ref={provided.innerRef}
            className={cn("", {
              "bg-cyan-50": snapshot.isDraggingOver,
            })}
          >
            <TableCaption className="pb-2">
              A list of your Board members.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Bio</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((person, index) => (
                <Draggable
                  draggableId={person.id}
                  key={person.id}
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
                      <TableCell className="font-medium w-[20%]">
                        {person.name}
                      </TableCell>
                      <TableCell className="font-medium w-[20%]">
                        {person.role}
                      </TableCell>
                      <TableCell className="text-center w-[14%]">
                        <BioPopover bio={person.bio} />
                      </TableCell>
                      <TableCell className="text-center w-[10%]">
                        <Avatar className="inline-flex justify-center w-12 h-12">
                          <AvatarImage
                            src={person.imageUrl || undefined}
                            alt="Profile of row item"
                          />
                          <AvatarFallback>
                            <Icons.user />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-center w-[14%]">
                        {person.status === "PUBLISHED" ? (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-green-600 hover:bg-green-600"
                            )}
                          >
                            <p>Published</p>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              buttonVariants(),
                              "bg-yellow-500 hover:bg-yellow-500 text-black"
                            )}
                          >
                            <p>Draft</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center w-[10%]">
                        <Link
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            }),
                            ""
                          )}
                          href={`/admin/board/edit/${person.id}`}
                        >
                          <Icons.pencil />
                        </Link>
                      </TableCell>
                      <TableCell className="w-[10%] text-center">
                        <DeleteBoardMemberButton
                          id={person.id}
                          name={person.name}
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
  );
}
