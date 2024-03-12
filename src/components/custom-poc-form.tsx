import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./ui/phone-input";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";
import { TriggerEventParams } from "@/type/websocket";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  poc_id: z.string().min(2).max(50),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  vendor_id: z.string().optional(),
});

interface CustomPocFormProps {
  setCustomPocData: (data: any) => void;
  customPocData: TriggerEventParams;
}

function CustomPocForm({
  customPocData,
  setCustomPocData,
}: CustomPocFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poc_id: "",
      phone: "",
      vendor_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCustomPocData(values);
    setOpen(false);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full">
        <Button className="w-full">Custom POC Data</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-white">Custom Poc Data</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            className="mt-auto flex flex-col gap-2 px-4 space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="poc_id"
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel>POC ID *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={customPocData.poc_id || "123456"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel className="text-left">Phone Number *</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      defaultCountry="BR"
                      placeholder={customPocData.phone || "(11) 99984-3788"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vendor_id"
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel>Vendor ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        customPocData.vendor_id ||
                        "1a23bc4d-fe56-7f89-1234-12345g67h8ij"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
        <DrawerFooter>
          <DrawerClose>
            <Button className="text-white w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomPocForm;
