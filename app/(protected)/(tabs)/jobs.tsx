import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, SectionList, View } from "react-native";
import Toast from "react-native-toast-message";

import { useToast } from "~/components/ScreenComponents/ToastMessage";

import { Job } from "~/components/ScreenComponents/Jobs/types";
import JobSectionList from "~/components/ScreenComponents/Jobs/JobList";
import { SearchInput } from "~/components/ScreenComponents/SearchInput";
import { JobFilters } from "~/components/ScreenComponents/Jobs/JobFilters";
import { JobTypeKeys } from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { getAllJobs, updateJobStatus } from "~/api/jobsApi";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";
import JobSectionListWeb from "~/components/ScreenComponents/Jobs/JobListWeb";
import SelectJob from "~/components/ScreenComponents/SelectJobs";

export default function JobScreen() {
  return <SelectJob />;
}
