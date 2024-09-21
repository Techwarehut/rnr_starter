import React from "react";
import { Alert, FlatList, ScrollView, useWindowDimensions, View } from "react-native";
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
} from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { Button } from "~/components/ui/button";
import customers from '~/data/customer.json';
import { BlockQuote, Muted, P } from "~/components/ui/typography";






export default function CustomerScreen() {
  const isLargeScreen = useIsLargeScreen();
  const MIN_COLUMN_WIDTHS = [ 140, 150, 100];
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  

  const columnWidths = React.useMemo(() => {
    // Determine the effective width considering the padding for large screens
    const effectiveWidth = isLargeScreen ? width - 80 : width-20; // 80 is the total padding (20 on left and right)
    const usedWidth = isLargeScreen ? MIN_COLUMN_WIDTHS[0] + MIN_COLUMN_WIDTHS[2]: MIN_COLUMN_WIDTHS[0];
  
    /* return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = effectiveWidth / numColumns;
      return evenWidth > minWidth ? evenWidth : minWidth;
    }); */
    return effectiveWidth - usedWidth;
  }, [width, isLargeScreen]);
  

  return (
    <View
      className={`flex-1 justify-center items-center gap-5 bg-secondary/30 ${
        isLargeScreen ? "p-4 pl-20" : ""
      }`}
    >
      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <Table aria-labelledby='invoice-table'  className={`flex-1  ${
        isLargeScreen ? "p-4 pr-10 pl-20" : "p-2 "
      }`}>
          <TableHeader>
            <TableRow>
              
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[0] }}>
                <Text>Business Name</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths }}>
                <Text>Site Locations</Text>
              </TableHead>
              {isLargeScreen && <TableHead style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                <Text className='text-center md:text-right md:pr-5'>Action</Text>
              </TableHead>}
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
                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                  >
                   
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[0] }}>
                      <Text>{customer.businessName}</Text>
                      <Muted>{customer.customerName}</Muted>
                    </TableCell>
                    <TableCell className={`w-${columnWidths}`}>
                      {customer.siteLocations.map((location, index) => (
                        <P 
                          key={index} 
                          className={`border-l-4 pl-4 mb-2 ${index % 2 === 0 ? 'border-brand-primary' : 'border-brand-secondary'}`}
                        >
                          {location.address}, {location.zipcode}
                        </P>
                      ))}
                    </TableCell>

                    {isLargeScreen && <TableCell style={{ width: MIN_COLUMN_WIDTHS[2] }} className='items-end '>
                      <View className="items-center gap-2">
                      <Button
                        variant='secondary'
                        size='sm'
                        className='shadow-sm shadow-foreground/10 mr-3'
                        onPress={() => {
                          Alert.alert(
                            "action taken"
                          );
                        }}
                      >
                        <Text>Edit</Text>
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        className='shadow-sm shadow-foreground/10 mr-3'
                        onPress={() => {
                          Alert.alert(
                            "action taken"
                          );
                        }}
                      >
                        <Text>delete</Text>
                      </Button>
                      </View>
                    </TableCell>}
                  </TableRow>
                );
              }}
             
            />
          </TableBody>
        </Table>
      </ScrollView>
    </View>
  );
}
