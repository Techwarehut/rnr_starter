import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Input } from "~/components/ui/input"; // Your Input component
import { SearchInput } from "./SearchInput";

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
    <View className="flex-1 flex-row p-1">
      <SearchInput
        placeholder="Search..."
        value={searchText}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
