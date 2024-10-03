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
import { FileText } from "~/lib/icons/FileText";

interface AddNewJobProps {
  onNewJobAdd: (data: Job) => void;
}
export const AddNewJob: React.FC<AddNewJobProps> = ({ onNewJobAdd }) => {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="flex-row gap-2">
            <FileText size={18} className="text-primary" />
            <Text>Job</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] md:max-w-full">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
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
