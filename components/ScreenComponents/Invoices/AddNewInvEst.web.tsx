import { View } from "react-native";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { Invoice } from "./types";
import { useRouter } from "expo-router";

interface AddNewInvEstProps {
  onNewInvAdd: (data: Invoice) => void;
}
export const AddNewInvEst: React.FC<AddNewInvEstProps> = ({ onNewInvAdd }) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="flex flex-row gap-2 mr-2">
          <Text>New</Text>
          <ChevronDown size={18} className="text-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="items-center justify-start self-start">
            <Button
              variant="ghost"
              onPress={() => router.push("/sales/addnewinvoice")}
            >
              <Text>Invoice</Text>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="items-center justify-start self-start">
            <Button variant="ghost">
              <Text>Estimate</Text>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
