import { ScrollView, View } from "react-native";
import React from "react";
import { H1, H2, H3, Muted, Small } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
import Footer from "~/components/ScreenComponents/Public/Elements/Footer";

const privacypolicy = () => {
  return (
    <ScrollView>
      <View className="flex bg-secondary justify-center p-6 md:p-12 rounded-md gap-4">
        <H1>Privacy Policy</H1>
        <Small className="text-primary">
          Effective Date: December 24, 2024
        </Small>
        <Text>
          At Veylo, we respect your privacy and are committed to protecting your
          personal data. This Privacy Policy outlines the information we
          collect, how we use it, and the measures we take to safeguard your
          data when you use our app. By using Veylo (the "App"), you agree to
          the collection and use of information in accordance with this policy.
          If you do not agree with the practices described here, please do not
          use the App.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Information We Collect</H2>

        <Text>
          We collect the following types of information when you use the App:
        </Text>
        <View className="flex justify-center p-6 md:p-12 gap-4">
          <H3>Personal Information</H3>
          <Text>
            When you register or log into the App, we may ask for personal
            information such as:
          </Text>
          <ul className="list-disc pl-12 mt-2 space-y-2 text-foreground">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Profile information</li>
          </ul>

          <H3>Usage Data</H3>
          <Text>
            We may collect information about how the App is accessed and used
            ("Usage Data"). This Usage Data may include:
          </Text>
          <ul className="list-decimal pl-12 mt-2 space-y-2 text-foreground">
            <li>Your device's Internet Protocol address (IP address)</li>
            <li>Device type and model</li>
            <li>Operating system and version</li>
            <li>Pages of the App you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
          </ul>

          <H3>Location Data</H3>
          <Text>
            If you grant us permission, we may collect and process information
            about your actual location, such as GPS signals and information sent
            by your mobile device. This helps us provide location-based
            services.
          </Text>

          <H3>Device Information</H3>
          <Text>
            We may collect information about the device you use to access the
            App, including hardware model, operating system, and other technical
            data.
          </Text>
        </View>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>How We Use Your Information</H2>
        <Text>
          We use the information we collect for various purposes, including:
        </Text>
        <ul className="list-decimal pl-12 mt-2 space-y-2 text-foreground">
          <li>To provide, operate, and maintain the App</li>
          <li>To personalize and improve user experience</li>
          <li>
            To communicate with you, including responding to inquiries and
            sending updates about the App
          </li>
          <li>To process transactions and manage your account</li>
          <li>
            To send marketing materials, newsletters, or promotional offers
            (only if you have opted-in to receive them)
          </li>
          <li>
            To analyze usage data for performance and improve the App's features
          </li>
        </ul>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Data Sharing and Disclosure</H2>
        <Text>
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your data in the following situations:
        </Text>
        <ul className="list-decimal pl-12 mt-2 space-y-2 text-foreground">
          <li>
            <strong>With Service Providers:</strong> We may share your data with
            third-party service providers who assist in operating the App,
            conducting business activities, or servicing users (e.g., cloud
            hosting, customer service, etc.).
          </li>
          <li>
            <strong>For Legal Compliance:</strong> We may disclose your data if
            required to do so by law, such as to comply with a subpoena or other
            legal process.
          </li>
        </ul>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Cookies and Tracking Technologies</H2>
        <Text>
          We use cookies and similar tracking technologies to monitor activity
          in the App and store certain information to enhance the user
          experience. Cookies help us:
        </Text>
        <ul className="list-decimal pl-12 mt-2 space-y-2 text-foreground">
          <li>Analyze usage patterns</li>
          <li>Improve the App’s functionality</li>
          <li>Provide personalized content and advertisements</li>
        </ul>
        <Text>
          You can configure your device or browser to reject cookies, but this
          may limit your ability to use some features of the App.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Data Security</H2>
        <Text>
          We take the security of your data seriously and implement
          industry-standard security measures to protect your personal
          information. However, no method of transmission over the internet or
          method of electronic storage is 100% secure, and we cannot guarantee
          absolute security.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Your Data Protection Rights</H2>
        <Text>
          Depending on your location, you may have the right to request access
          to, correct, update, or delete the personal information we hold about
          you. You can also object to the processing of your personal
          information or withdraw consent where applicable.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8 gap-4">
        <H2>Third-Party Links</H2>
        <Text>
          The App may contain links to third-party websites or services that are
          not operated by us. We are not responsible for the privacy practices
          or content of these third-party services. We encourage you to review
          the privacy policies of those websites before providing them with any
          personal information.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Children's Privacy</H2>
        <Text>
          The App is not intended for use by children under the age of 13. We do
          not knowingly collect personal data from children under 13. If we
          discover that we have collected personal data from a child under 13,
          we will take steps to delete that information as quickly as possible.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Changes to This Privacy Policy</H2>
        <Text>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and we will update the "Effective Date" at the
          top of the page. We encourage you to review this Privacy Policy
          periodically to stay informed about how we are protecting your
          information.
        </Text>
      </View>

      <View className="flex justify-center p-6 md:p-12  mx-2 md:mx-8  gap-4">
        <H2>Contact Us</H2>

        <Text>
          If you have any questions about this Privacy Policy, or if you wish to
          exercise your rights regarding your personal data, please contact us
          at:
        </Text>
        <View className="pl-4 md:pl-12">
          <Text>
            Email: <strong>VeyloApp@gmail.com</strong>
          </Text>
          <Text>
            Phone: <strong>(289) 356 3784</strong>
          </Text>
          <Text>
            Mailing Address: <strong>67 Chant Cres, Ajax, ON L1T 0M7</strong>
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default privacypolicy;
