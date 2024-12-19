import { ScrollView, View } from "react-native";
import React from "react";
import { H1, H2, H3, Muted, Small } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";

const termsofservice = () => {
  return (
    <ScrollView>
      <View className="flex bg-secondary justify-center p-12 rounded-md gap-4">
        <H1>Terms of Service</H1>
        <Small className="text-primary">
          Effective Date: December 24, 2024
        </Small>
        <Text>
          Welcome to Veylo! These Terms of Service ("Terms") govern your access
          to and use of the Veylo mobile application, website, and related
          services (collectively, the "Service"). By accessing or using the
          Service, you agree to comply with and be bound by these Terms. If you
          do not agree to these Terms, you should not use the Service.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Acceptance of Terms</H2>
        <Text>
          By creating an account, accessing, or using Veylo’s Service, you
          ("User" or "you") agree to abide by these Terms and all applicable
          laws and regulations. If you are using the Service on behalf of a
          business or another organization, you represent and warrant that you
          have the authority to bind that business or organization to these
          Terms.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Account Registration</H2>
        <Text>
          To use certain features of the Service, you must create a Veylo
          account. When registering, you agree to provide accurate, current, and
          complete information. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </Text>
        <Text>
          <strong>Account Types:</strong>
        </Text>
        <View className="flex justify-center p-12 gap-4">
          <H3>Service Providers (Account Owners):</H3>
          <Text>
            Individuals or businesses using Veylo to manage service-related
            tasks, transactions, or scheduling.
          </Text>

          <H3>End Users:</H3>
          <Text>
            Customers who engage with Account Owners to receive services.
          </Text>
        </View>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Services Provided</H2>
        <Text>
          Veylo provides a platform for service management, including but not
          limited to scheduling, invoicing, payments, communication, and other
          features related to service operations. The platform allows Account
          Owners to interact with their End Users, manage their workflow, and
          facilitate transactions. The scope of services available may vary
          depending on your subscription plan.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Payment Terms</H2>
        <Text>
          Veylo may charge fees for certain features, such as subscription
          plans, premium tools, or transaction services. All payment obligations
          are subject to the terms of your selected subscription or usage plan.
          Fees may be subject to change, and you will be notified of any changes
          prior to the implementation.
        </Text>
        <Text>
          Payments for services rendered by Account Owners through Veylo may be
          processed through third-party payment providers, such as Stripe or
          other payment gateways. By using the Service, you agree to the terms
          and conditions of these third-party services.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Privacy Policy</H2>
        <Text>
          Veylo’s use and collection of your Personal Information are governed
          by our <strong>Privacy Policy</strong>. By using the Service, you
          agree to the collection, use, and sharing of your information as
          described in the Privacy Policy.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Termination of Account</H2>
        <Text>
          You may terminate your account at any time by following the account
          deactivation process within the Service or by contacting Veylo
          support. Veylo reserves the right to suspend or terminate your account
          for violations of these Terms, illegal activity, or if we believe your
          use of the Service presents a risk to other users.
        </Text>
        <Text>
          Upon termination, Veylo will delete your account data, subject to
          retention requirements imposed by applicable law.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Intellectual Property</H2>
        <Text>
          The Service, including its software, features, content, and
          trademarks, are owned by Veylo or licensed from third parties. You are
          granted a limited, non-exclusive, non-transferable license to access
          and use the Service as intended. You may not copy, modify, distribute,
          or reverse engineer any part of the Service without prior written
          consent from Veylo.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Limitation of Liability</H2>
        <Text>
          To the fullest extent permitted by law, Veylo and its affiliates,
          officers, employees, agents, or licensors shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits, data, or business arising out of or in connection
          with the use or inability to use the Service, even if Veylo has been
          advised of the possibility of such damages.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Indemnification</H2>
        <Text>
          You agree to indemnify and hold harmless Veylo, its affiliates,
          officers, directors, employees, agents, and licensors from any claim,
          demand, liability, or expense (including reasonable attorneys' fees)
          arising out of your use of the Service, your violation of these Terms,
          or your infringement of any third-party rights.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Governing Law and Dispute Resolution</H2>
        <Text>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of laws
          principles. Any disputes arising from or related to these Terms will
          be resolved through binding arbitration in [Location], under the rules
          of the American Arbitration Association (AAA).
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Changes to Terms</H2>
        <Text>
          Veylo reserves the right to modify these Terms at any time. You will
          be notified of any significant changes through the email associated
          with your account or via a prominent notice on the Service. By
          continuing to use the Service after any changes are made, you accept
          and agree to the revised Terms.
        </Text>
      </View>

      <View className="flex justify-center p-12 mx-8 gap-4">
        <H2>Contact Us</H2>
        <Text>
          If you have any questions or concerns about these Terms, please
          contact us at:
        </Text>
        <View className="pl-12">
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
    </ScrollView>
  );
};

export default termsofservice;
