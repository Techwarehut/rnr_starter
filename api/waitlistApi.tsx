import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { WaitlistInfo } from "~/components/ScreenComponents/JoinWaitlist";

// Function to store waitlist data in Firestore
export const storeWaitlistInfo = async (waitlistData: WaitlistInfo) => {
  try {
    console.log(waitlistData);
    const newDoc = await addDoc(collection(firestore, "waitlist"), {
      waitlistData,
    });

    console.log("Waitlist information stored successfully");
    return { success: true };
  } catch (error) {
    console.error("Error storing waitlist data:", error);
    return { success: false, error };
  }
};
