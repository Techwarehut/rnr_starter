import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Input } from "~/components/ui/input"; // Your Input component

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View className="flex-1 p-1">
      <Input
        placeholder="Search..."
        value={searchText}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
