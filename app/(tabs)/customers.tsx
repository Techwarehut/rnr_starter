import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import customers from "~/data/customer.json";
import { BlockQuote, Muted, P } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function CustomerScreen() {
  const isLargeScreen = useIsLargeScreen();
  const MIN_COLUMN_WIDTHS = [140, 150, 100];
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    // Determine the effective width considering the padding for large screens
    const effectiveWidth = isLargeScreen ? width - 80 : width - 20; // 80 is the total padding (20 on left and right)
    const usedWidth = isLargeScreen
      ? MIN_COLUMN_WIDTHS[0] + MIN_COLUMN_WIDTHS[2]
      : MIN_COLUMN_WIDTHS[0];

    /* return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = effectiveWidth / numColumns;
      return evenWidth > minWidth ? evenWidth : minWidth;
    }); */
    return effectiveWidth - usedWidth;
  }, [width, isLargeScreen]);

  const [searchText, setSearchText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const translateX = useSharedValue(0); // For swipe effect

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const handleSwipe = (direction: "right" | "left") => {
    translateX.value = withTiming(direction === "right" ? 100 : 0, {
      duration: 300,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View /* className="flex-1 justify-between items-center p-4"> */
      className={`${
        isLargeScreen
          ? "flex-1 flex-row flex-wrap pl-20"
          : "flex-1 flex-col justify-between"
      }   justify-center items-center gap-5 bg-secondary/304`}
    >
      <View className=" border border-input ml-2 rounded-md p-2">
        <Table aria-labelledby="customer-table">
          <TableHeader>
            <TableRow>
              <TableHead>
                <View className=" flex-row gap-2">
                  <View>
                    <Input
                      placeholder="Business Email"
                      value={searchText}
                      onChangeText={onChangeSearchText}
                      aria-labelledby="email"
                      aria-errormessage="inputError"
                    />
                  </View>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shadow-sm shadow-foreground/10 mr-3"
                    onPress={() => {
                      Alert.alert("action taken");
                    }}
                  >
                    <Text>Add</Text>
                  </Button>
                </View>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlatList
              data={customers}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: customer, index }) => {
                return (
                  <TableRow
                    key={customer._id}
                    className={cn(
                      "active:bg-secondary",
                      index % 2 && "bg-muted/40 "
                    )}
                  >
                    <TableCell className="flex-1">
                      <View className="flex-1 w-full flex-row justify-between items-center p-2 relative">
                        <View>
                          <Text>{customer.businessName}</Text>
                          <Muted>{customer.customerName}</Muted>
                        </View>
                        <View className="items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="shadow-sm shadow-foreground/10 mr-3"
                            onPress={() => {
                              Alert.alert("action taken");
                            }}
                          >
                            <Text>Edit</Text>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="shadow-sm shadow-foreground/10 mr-3"
                            onPress={() => {
                              Alert.alert("action taken");
                            }}
                          >
                            <Text>delete</Text>
                          </Button>
                        </View>
                      </View>
                    </TableCell>
                    {/* <TableCell className={`w-${columnWidths}`}>
                    {customer.siteLocations.map((location, index) => (
                      <P
                        key={index}
                        className={`border-l-4 pl-4 mb-2 ${
                          index % 2 === 0
                            ? "border-brand-primary"
                            : "border-brand-secondary"
                        }`}
                      >
                        {location.address}, {location.zipcode}
                      </P>
                    ))}
                  </TableCell> */}
                  </TableRow>
                );
              }}
            />
          </TableBody>
        </Table>
      </View>
      {isLargeScreen && (
        <View className="flex-1 items-center justify-center border border-input rounded-md m-2">
          <Text>Customer Detail Screen</Text>
        </View>
      )}
    </View>
  );
}
