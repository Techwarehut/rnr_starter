import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";

import React from "react";
import { Job } from "./types";
import { FolderDot } from "~/lib/icons/FolderDot";

interface AddNewProjectProps {
  onNewProjectAdd: (data: Job) => void;
}
export const AddNewProject: React.FC<AddNewProjectProps> = ({
  onNewProjectAdd,
}) => {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="flex-row gap-2">
            <FolderDot size={18} className="text-primary" />
            <Text>Project</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] md:max-w-full">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild className="w-full">
              <Button>
                <Text>Save</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};
