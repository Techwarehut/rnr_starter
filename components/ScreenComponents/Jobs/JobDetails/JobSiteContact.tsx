import { Pressable, View } from "react-native";
import { Job } from "../types";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { Phone } from "~/lib/icons/Phone";
import { User2 } from "~/lib/icons/User";
import { MapPin } from "~/lib/icons/MapPin";
import { useIsLargeScreen } from "~/lib/utils";

interface JobInfoProps {
  job: Job;
}

const JobSiteContact: React.FC<JobInfoProps> = ({ job }) => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <View className="flex gap-2">
      <Text className="text-xl">Site Contact</Text>
      <View className="flex gap-2 md:flex-row">
        <View className="flex md:flex-1 bg-secondary p-2 rounded-md">
          {job.siteLocation.siteContactPerson === "" ? (
            <View className="flex flex-row gap-2 items-center p-4">
              <User2 className="text-primary" size={isLargeScreen ? 18 : 18} />
              <Text>Select Customer & Site Location Below</Text>
            </View>
          ) : (
            <>
              <View className="flex-row items-center gap-2">
                <View className="h-8 w-8  rounded-2xl items-center justify-center p-1">
                  <User2
                    className="text-primary"
                    size={isLargeScreen ? 18 : 18}
                  />
                </View>
                <Text>{job.siteLocation.siteContactPerson}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Link
                  href={`tel:${job.siteLocation.siteContactPhone.replace(
                    /\D/g,
                    ""
                  )}`}
                >
                  <Pressable className="h-8 w-8 bg-primary rounded-2xl items-center justify-center p-1">
                    <Phone
                      className="text-primary-foreground"
                      size={isLargeScreen ? 18 : 16}
                    />
                  </Pressable>
                </Link>
                <Text>{job.siteLocation.siteContactPhone}</Text>
              </View>
            </>
          )}
        </View>
        <View className="flex flex-row md:flex-1 bg-secondary rounded-md p-2 gap-2">
          {job.siteLocation.AddressLine === "" ? (
            <View className="flex flex-row gap-2 items-center p-4">
              <MapPin className="text-primary" size={isLargeScreen ? 18 : 18} />
              <Text>Select Site Location Below</Text>
            </View>
          ) : (
            <View className="flex flex-row gap-2  ">
              <MapPin className="text-primary" size={isLargeScreen ? 24 : 24} />
              <View>
                <Text>{job.siteLocation.AddressLine}</Text>
                <Text>{job.siteLocation.City}</Text>
                <View className="flex flex-row gap-2">
                  <Text>{job.siteLocation.Province}</Text>
                  <Text>{job.siteLocation.zipcode}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default JobSiteContact;
