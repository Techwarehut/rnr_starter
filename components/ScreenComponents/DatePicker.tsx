import { createElement, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DatePickerProps {
  onChange: (date: Date) => void; // Define the expected prop type
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [date, setDate] = useState(new Date(Date.now()));

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      setDate(selectedDate); // Update the local state
      onChange(selectedDate); // Call the passed onChange prop
    }
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      is24Hour={true}
      onChange={handleDateChange} // Use the internal handler
    />
  );
};

export default DatePicker;
