"use client";

import { Button } from "@/components/ui/button";

import { deleteGhostApi } from "../queries/deleteApi";
import toast from "react-hot-toast";

export default function ClientSideDeleteButton({ id }: { id: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="text-rose-500 hover:text-rose-500 cursor-pointer border-rose-500"
      onClick={async () => {
        try {
          await deleteGhostApi(id);
          toast.success("Ghost Api deleted successfully");
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete Ghost Api, please try again");
        }
      }}
    >
      Delete Api
    </Button>
  );
}
