import React from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4 } from "~/components/ui/typography";
import { Mail } from "~/lib/icons/Mail";
import { Phone } from "~/lib/icons/Phone";
import { MapPin } from "~/lib/icons/MapPin";
import { useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { ScrollView } from "react-native-gesture-handler";

interface SiteLocation {
  address: string;
  zipcode: string;
}

interface Customer {
  _id: string;
  businessName: string;
  customerName: string;
  email: string;
  phone: string;
  siteLocations: SiteLocation[];
}

interface CustomerDetailProps {
  customer: Customer;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  const isLargeScreen = useIsLargeScreen();
  const [value, setValue] = React.useState("active");
  return (
    <ScrollView
      showsVerticalScrollIndicator={isLargeScreen}
      className="flex-1 w-full gap-10 p-2"
    >
      {/* Header with Edit and Delete buttton */}
      <View className="w-full flex-row gap-1 items-center justify-between gap-2">
        <View>
          <H3>{customer.businessName}</H3>
          <Text>{customer.customerName}</Text>
        </View>
        <View className="flex-row gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="shadow-sm shadow-foreground/10 items-center justify-center "
            onPress={() => {}}
          >
            <Text>Edit</Text>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="shadow-sm shadow-foreground/10 items-center justify-center "
            onPress={() => {}}
          >
            <Text>Delete</Text>
          </Button>
        </View>
      </View>
      {/* Top Container*/}
      <View className="flex flex-col md:flex-row w-full gap-8 p-2 my-4">
        {/* Contact Details */}

        <View className="flex-1 flex-col gap-2 w-full">
          <Text className="text-brand-primary text-lg">Contact</Text>
          <View className="flex-column items-start justify-start gap-4 border border-input rounded-md p-2 py-5">
            <View className="flex-row gap-2 items-center justify-center">
              <Mail className="text-foreground" size={21} strokeWidth={1.25} />
              <Text>{customer.email}</Text>
            </View>
            <View className="flex-row gap-2 items-center justify-center">
              <Phone className="text-foreground" size={21} strokeWidth={1.25} />
              <Text>{customer.phone}</Text>
            </View>
          </View>
        </View>

        {/* Site Locations */}
        <View className="flex-1 flex-col gap-2 w-full">
          <Text className="text-brand-secondary text-lg">Site Locations</Text>
          <View className=" flex-col items-start justify-start gap-4 border border-input rounded-md p-2 py-5">
            {customer.siteLocations.map((location, index) => (
              <View
                key={index}
                className="flex-row gap-2 items-center justify-center"
              >
                <MapPin
                  className="text-foreground"
                  size={21}
                  strokeWidth={1.25}
                />
                <Text>
                  {location.address}, {location.zipcode}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/*Tab Container */}
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full  mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="active" className="flex-1">
            <Text>Active Projects</Text>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex-1">
            <Text>All Projects</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View className="gap-1">
                <Label nativeID="name">Name</Label>
                <Input
                  aria-aria-labelledby="name"
                  defaultValue="Pedro Duarte"
                />
              </View>
              <View className="gap-1">
                <Label nativeID="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View className="gap-1">
                <Label nativeID="current">Current password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="current"
                  secureTextEntry
                />
              </View>
              <View className="gap-1">
                <Label nativeID="new">New password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="new"
                  secureTextEntry
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
};

export default CustomerDetail;
