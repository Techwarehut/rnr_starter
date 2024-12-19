import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { H2, H3 } from "~/components/ui/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";

const Vision = () => {
  return (
    <View className="flex flex-col  p-4 md:p-12 rounded-md gap-2 items-center justify-center my-12">
      <View className="flex gap-8 max-w-3xl p-2 my-8">
        <H2>Veylo is a platform designed for all B2X transactions.</H2>
        <Text>
          Veylo is a field service platform for managing purchase orders with
          vendors, tracking jobs and hours with employees, and handling invoices
          and estimates with customers—all in one seamless solution.
        </Text>
      </View>
      {/*  <View className="flex py-8 self-start">
        <H3>Customized solutions for Field Service Business</H3>
      </View>
      <View className="flex md:flex-row gap-4 items-center justify-around flex-wrap w-full">
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>HVAC</CardTitle>

          <CardContent>
            <View className="flex items-center justify-center w-full md:w-auto">
              <Image
                source={require("~/assets/images/industries/air-conditioning.png")}
                alt="Mobile preview"
                resizeMode="contain"
                className="w-[80%] h-auto md:w-[300px] md:h-[300px] max-w-full"
                style={{
                  width: 300, // Fixed width
                  height: 300, // Fixed height
                }}
              />
            </View>
          </CardContent>
          <CardDescription>
            <Text>
              Assign tasks, access job details, and log hours with ease. Use
              checklists for quality assurance, upload site photos, and batch
              invoice completed jobs to keep your team efficient and customers
              satisfied.
            </Text>
          </CardDescription>
        </Card>
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>Plumbing</CardTitle>
          <CardDescription>
            Manage your plumbing business effortlessly with Veylo.
          </CardDescription>
          <CardContent>
            <Text>
              Track job progress, log hours, and enhance service quality with
              checklists. Quickly add notes, upload images, and invoice multiple
              jobs at once to save time.
            </Text>
          </CardContent>
        </Card>
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>Landscaping</CardTitle>
          <CardDescription>
            Stay organized with Veylo for landscaping.
          </CardDescription>
          <CardContent>
            <Text>
              Assign crews, access job details, and log hours on-site. Use
              checklists to ensure high-quality work, upload photos, and
              streamline billing with batch invoicing.
            </Text>
          </CardContent>
        </Card>
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>Electrical</CardTitle>
          <CardDescription>
            Veylo powers up your electrical business.
          </CardDescription>
          <CardContent>
            <Text>
              Track work orders, log hours, and maintain standards with
              checklists. Capture site images, add notes, and batch invoice
              completed jobs to keep everything on track.
            </Text>
          </CardContent>
        </Card>
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>Cleaning</CardTitle>
          <CardDescription>
            Simplify your cleaning service management with Veylo.
          </CardDescription>
          <CardContent>
            <Text>
              Access schedules, log hours, and ensure quality using checklists.
              Add quick notes, upload photos, and invoice efficiently with batch
              invoicing.
            </Text>
          </CardContent>
        </Card>
        <Card className="p-4 max-w-sm gap-4 bg-accent/40">
          <CardTitle>Industrial Repair</CardTitle>
          <CardDescription>
            Optimize your industrial repair operations with Veylo.
          </CardDescription>
          <CardContent>
            <Text>
              Assign tasks, access detailed information and log hours
              effortlessly. Ensure precision with customizable checklists,
              upload site photos, add notes, and streamline billing with batch
              invoicing.
            </Text>
          </CardContent>
        </Card>
      </View> */}
    </View>
  );
};

export default Vision;
