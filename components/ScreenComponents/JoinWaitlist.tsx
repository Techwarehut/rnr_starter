import { Alert, ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";

import React, { useState } from "react";

import { storeWaitlistInfo } from "~/api/waitlistApi";
import InputField from "./InputField";
import { Muted, Small } from "../ui/typography";
import TextField from "./TextField";

// Define a type for the waitlist data
export interface WaitlistInfo {
  name: string;
  email: string;
  phoneNumber: string;
  feedback: string;
}

interface JoinWaitlistProps {}
export const JoinWaitlist: React.FC<JoinWaitlistProps> = ({}) => {
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

  // Step 1: Define the state variables for the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    feedback: "",
  });

  // Step 2: Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Step 3: Validate the form
  const validateForm = () => {
    setErrorMessage(""); // Reset error message on validation start
    setSuccessMessage(""); // Reset success message on validation start
    const { name, email, phoneNumber } = formData;
    if (!name || !email || !phoneNumber) {
      setErrorMessage("Please fill out all fields");
      return false;
    }

    // Simple email validation (can be expanded)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    // Optional: Validate phone number (e.g., check if it's numeric)
    if (!/^\d+$/.test(phoneNumber)) {
      setErrorMessage("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  // Function to handle form submission and call the storeWaitlistInfo API
  const handleSubmit = async (data: WaitlistInfo) => {
    if (validateForm()) {
      //setWaitlistData(data); // Save form data to state

      // Call the storeWaitlistInfo function to store data in Firestore
      const result = await storeWaitlistInfo(data);
      if (result.success) {
        setSuccessMessage(
          "Thank you for your interest! We will get back to you with Product updates."
        );
      } else {
        setErrorMessage("Failed to join the waitlist. Please try again.");
      }
    }
  };

  return (
    <ScrollView contentContainerClassName="flex justify-center items-center p-6 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="default">
            <Text>Join Waitlist</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] ">
          <DialogHeader>
            <DialogTitle>Join Waitlist</DialogTitle>
            <DialogDescription>
              <View className="flex justify-center gap-4">
                <Muted>No Spam! Only Product Updates.</Muted>
                {/* Name input */}
                <InputField
                  label="Name"
                  editable={true}
                  nativeID="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />

                {/* Email input */}
                <InputField
                  label="Email"
                  editable={true}
                  nativeID="email"
                  placeholder="Enter your business email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />

                {/* Phone number input */}
                <InputField
                  label="Phone"
                  editable={true}
                  nativeID="phone"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={formData.phoneNumber}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                />
                <TextField
                  label="Feedback"
                  editable={true}
                  nativeID="feedback"
                  placeholder="What you love and what you don't"
                  value={formData.feedback}
                  onChangeText={(text) => handleInputChange("feedback", text)}
                />
              </View>
            </DialogDescription>
          </DialogHeader>
          {/* Show success or error messages */}
          {successMessage && (
            <View className="bg-accent p-4 rounded-md mb-4">
              <Text className="text-accent-foreground">{successMessage}</Text>
            </View>
          )}
          {errorMessage && (
            <View className="bg-destructive p-4 rounded-md mb-4">
              <Text className="text-destructive-foreground">
                {errorMessage}
              </Text>
            </View>
          )}

          <DialogFooter>
            <DialogClose>
              {/* Submit button */}
              <Button
                onPress={() => {
                  handleSubmit(formData);
                }}
              >
                <Text>Join Waitlist</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};
