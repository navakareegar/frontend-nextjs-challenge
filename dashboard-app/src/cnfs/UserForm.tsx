import {
  UserOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { IFormConfig } from "@/components/form/types";
import { IUser } from "@/types/user";
import { FilterFn, Row } from "@tanstack/react-table";
import { z } from "zod";

export type FormData = z.infer<typeof formSchema>;

export const formConfig: IFormConfig<FormData> = {
  id: "user-form",
  submitLabel: "Create User",
  updateLabel: "Update User",
  cancelLabel: "Cancel",
  loadingLabel: "Saving...",

  sections: [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Basic user details",
      icon: <UserOutlined className="text-emerald-400" />,
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          placeholder: "John Doe",
          required: true,
          colSpan: 1,
          maxLength: 100,
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
          colSpan: 1,
          maxLength: 50,
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "john@example.com",
          required: true,
          colSpan: 1,
          maxLength: 100,
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "1-234-567-8900",
          required: true,
          colSpan: 1,
          maxLength: 20,
        },
        {
          name: "website",
          label: "Website",
          type: "text",
          placeholder: "example.com",
          required: true,
          colSpan: 2,
          maxLength: 100,
        },
      ],
    },
    {
      id: "address",
      title: "Address",
      description: "Location information",
      icon: <EnvironmentOutlined className="text-cyan-400" />,
      fields: [
        {
          name: "address.street",
          label: "Street Address",
          type: "text",
          placeholder: "123 Main St",
          required: true,
          colSpan: 1,
          maxLength: 200,
        },
        {
          name: "address.suite",
          label: "Suite / Apt",
          type: "text",
          placeholder: "Apt. 123",
          required: false,
          colSpan: 1,
          maxLength: 50,
        },
        {
          name: "address.city",
          label: "City",
          type: "text",
          placeholder: "New York",
          required: true,
          colSpan: 1,
          maxLength: 100,
        },
        {
          name: "address.zipcode",
          label: "Zip Code",
          type: "text",
          placeholder: "10001",
          required: true,
          colSpan: 1,
          maxLength: 20,
        },
      ],
    },
    {
      id: "company",
      title: "Company",
      description: "Work information",
      icon: <BankOutlined className="text-amber-400" />,
      fields: [
        {
          name: "company.name",
          label: "Company Name",
          type: "text",
          placeholder: "Acme Inc.",
          required: true,
          colSpan: 2,
          maxLength: 100,
        },
        {
          name: "company.catchPhrase",
          label: "Catch Phrase",
          type: "text",
          placeholder: "Innovation at its finest",
          required: false,
          colSpan: 2,
          maxLength: 200,
        },
        {
          name: "company.bs",
          label: "Business Description",
          type: "text",
          placeholder: "e-commerce solutions",
          required: false,
          colSpan: 2,
          maxLength: 200,
        },
      ],
    },
  ],
};

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(25, "Phone number must be less than 25 characters"),
  website: z
    .string()
    .min(3, "Website must be at least 3 characters")
    .max(50, "Website must be less than 50 characters"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});

export const userGlobalFilterFn: FilterFn<IUser> = (
  row: Row<IUser>,
  _columnId: string,
  filterValue: string
) => {
  const search = filterValue.toLowerCase();
  const user = row.original;
  return (
    user.name.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search) ||
    user.company.name.toLowerCase().includes(search) ||
    user.address.city.toLowerCase().includes(search)
  );
};
