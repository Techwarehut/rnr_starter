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
import { Text } from "~/components/ui/text";
import { Calendar } from "~/lib/icons/Calendar";

import { Pressable, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { useColorScheme } from "~/lib/useColorScheme";
import { useState } from "react";

interface DatePicketProps {
  date: DateType;
  onChangeDate: (date: DateType) => void; // Add this prop
}
export const DatePicker: React.FC<DatePicketProps> = ({
  date,
  onChangeDate,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [open, setOpen] = useState(false); // State for dropdown visibility

  const handleDateChange = (newDate: DateType) => {
    onChangeDate(newDate);
    setOpen(false); // Close the dropdown after date selection
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable className="mr-4">
          <Calendar className="text-primary" size={21} />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          <DateTimePicker
            date={date}
            mode="single"
            onChange={(params) => handleDateChange(params.date)}
            calendarTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
            selectedTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#FFF" }}
            headerTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
            selectedItemColor={isDarkColorScheme ? "#2b4f73" : "#2b4f73"}
            headerButtonColor={isDarkColorScheme ? "#FFF" : "#000"}
            weekDaysTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
