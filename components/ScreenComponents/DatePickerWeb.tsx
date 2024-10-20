import { createElement } from "react"; // Import createElement from React
import { createInteropElement } from "nativewind"; // Import for NativeWind styling
import { useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface DatePickerProps {
  onChange: (date: Date) => void; // Define the expected prop type
}

const DatePickerWeb: React.FC<DatePickerProps> = ({ onChange }) => {
  const [date, setDate] = useState(new Date(Date.now()));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setDate(newDate);
    onChange(newDate); // Call the passed onChange prop
  };

  return createElement("input", {
    type: "date",
    value: date.toISOString().split("T")[0],
    onChange: handleDateChange,
    style: {
      height: 30,
      padding: 5,
      border: "2px solid #677788",
      borderRadius: 5,
      width: 250,
    },
  });
};

export default DatePickerWeb;
