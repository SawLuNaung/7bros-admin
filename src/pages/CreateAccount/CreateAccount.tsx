import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../components/ui/form";
import { cn } from "../../lib/utils";
import InputField from "../../components/forms/InputField";
import PasswordField from "../../components/forms/PasswordField";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_DRIVER_BY_ADMIN, GET_ALL_DRIVERS } from "../../graphql/kiloTaxi";
import { toast } from "sonner";

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createDriver] = useMutation(CREATE_DRIVER_BY_ADMIN, {
    refetchQueries: [{ query: GET_ALL_DRIVERS }],
  });

  const FormSchema = yup.object({
    driver_id: yup
      .string()
      .required("Driver ID is required")
      .matches(/^7B\d{3}$/, "Driver ID must be in format 7BXXX (e.g., 7B001, 7B100)")
      .test('range-check', 'Driver ID must be between 7B001 and 7B999', (value) => {
        if (!value) return false;
        const num = parseInt(value.substring(2), 10);
        return num >= 1 && num <= 999;
      }),
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{9,11}$/, "Phone number must be 9-11 digits"),
    vehicle_number: yup
      .string()
      .required("Car number is required")
      .min(3, "Car number must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .length(6, "Password must be exactly 6 characters"),
    driving_license_number: yup.string(),
    vehicle_model: yup.string(),
    address_street: yup.string(),
    address_city: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      driver_id: "",
      name: "",
      phone: "",
      vehicle_number: "",
      password: "",
      driving_license_number: "",
      vehicle_model: "",
      address_street: "",
      address_city: "",
    },
  });

  // Watch form values for button state
  const watchedValues = form.watch();
  const formState = form.formState;

  // Check if all required fields are valid
  const isFormValid =
    formState.isValid &&
    watchedValues.driver_id &&
    watchedValues.name &&
    watchedValues.phone &&
    watchedValues.vehicle_number &&
    watchedValues.password?.length === 6;

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await createDriver({
        variables: {
          driver_id: data.driver_id,
          name: data.name,
          phone: data.phone,
          vehicle_number: data.vehicle_number,
          password: data.password,
          driving_license_number: data.driving_license_number || null,
          vehicle_model: data.vehicle_model || null,
          address_street: data.address_street || null,
          address_city: data.address_city || null,
        },
      });

      if (result.data?.AdminCreateDriver) {
        const response = result.data.AdminCreateDriver;
        
        // Show success toast with driver details
        toast.success('Account Created Successfully!', {
          description: (
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Driver ID:</span>
                <span className="text-green-600 font-mono">{response.driver_id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Name:</span>
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Phone:</span>
                <span>{response.phone}</span>
              </div>
            </div>
          ),
          duration: 5000,
        });
        
        // Reset form
        form.reset();
        
        // Navigate to drivers page after a short delay
        setTimeout(() => {
          navigate("/drivers");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error creating driver:", error);
      
      // Extract error message and code from GraphQL error
      const graphQLError = error.graphQLErrors?.[0] || error;
      const errorMessage = graphQLError.message || error.message || "Failed to create driver account";
      const errorCode = graphQLError.extensions?.code || error.extensions?.code;
      
      // Check for duplicate driver ID
      if (errorCode === "DUPLICATE_DRIVER_ID" || errorMessage.includes("already in use") || errorMessage.includes("Driver ID")) {
        // Extract driver ID from error message
        const driverIdMatch = errorMessage.match(/Driver ID (\w+) is already in use/);
        const duplicateDriverId = driverIdMatch ? driverIdMatch[1] : data.driver_id;
        
        // Show simple error toast with red box
        toast.error('This Driver ID is already in use', {
          duration: 5000,
          className: "border-l-4 border-l-red-500 bg-red-50",
        });
        
        // Focus on driver_id field
        setTimeout(() => {
          form.setFocus("driver_id");
        }, 100);
        
        // Set error on driver_id field
        form.setError("driver_id", {
          type: "manual",
          message: `Driver ID ${duplicateDriverId} is already in use`,
        });
      } 
      // Check for duplicate phone
      else if (errorCode === "DUPLICATE_PHONE" || errorMessage.includes("phone number already exists")) {
        toast.error('This phone number is already in use', {
          duration: 5000,
          className: "border-l-4 border-l-red-500 bg-red-50",
        });
        
        // Focus on phone field
        setTimeout(() => {
          form.setFocus("phone");
        }, 100);
        
        // Set error on phone field
        form.setError("phone", {
          type: "manual",
          message: "This phone number is already registered",
        });
      }
      // Other errors
      else {
        // Show error toast
        toast.error('Failed to Create Account', {
          description: errorMessage,
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/drivers");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100svh-81px)] bg-gray-50">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Create Driver Account
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Fill in the information below to create a new driver account. Enter a Driver ID to assign the driver to a tier.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Required Information Section */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Required Information
                </h2>
              </div>

              <div className="space-y-5">
                {/* Driver ID Field */}
                <div className="w-full">
                  <InputField
                    disabled={false}
                    labelTitle="Driver ID"
                    fieldName="driver_id"
                    placeholder="e.g., 7B001, 7B100"
                    required={true}
                    languageName="driver_id"
                    fieldHeight={cn(" w-full", fieldHeight)}
                    fieldWidth="w-full"
                    type="text"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 7BXXX (001-099: Tier 1, 100-199: Tier 2)
                  </p>
                </div>

                {/* Name and Phone Number Row */}
                <div className={formContainer}>
                <InputField
                  disabled={false}
                  labelTitle="Name"
                  fieldName="name"
                  placeholder="Enter driver name"
                  required={true}
                  languageName="name"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  type="text"
                />
                <InputField
                  disabled={false}
                  labelTitle="Phone Number"
                  fieldName="phone"
                  placeholder="Enter phone number"
                  required={true}
                  languageName="phone"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  type="text"
                />
              </div>

                {/* Car Number and Password Row */}
                <div className={formContainer}>
                <InputField
                  disabled={false}
                  labelTitle="Car Number"
                  fieldName="vehicle_number"
                  placeholder="Enter car/vehicle number"
                  required={true}
                  languageName="vehicle_number"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  type="text"
                />
                <PasswordField
                  disabled={false}
                  labelTitle="Password"
                  fieldName="password"
                  placeholder="Enter password (6 characters)"
                  required={true}
                  languageName="password"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  maxLength={6}
                />
              </div>
              </div>
            </div>

            {/* Optional Information Section */}
            <div className="p-6 sm:p-8 space-y-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-2 pb-3">
                <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Optional Information
                </h2>
              </div>

              <div className="space-y-5">

                {/* Driving License and Vehicle Type Row */}
                <div className={formContainer}>
                <InputField
                  disabled={false}
                  labelTitle="Driving License"
                  fieldName="driving_license_number"
                  placeholder="Enter driving license number"
                  required={false}
                  languageName="driving_license"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  type="text"
                />
                <InputField
                  disabled={false}
                  labelTitle="Vehicle Type"
                  fieldName="vehicle_model"
                  placeholder="Enter vehicle type/model"
                  required={false}
                  languageName="vehicle_model"
                  fieldHeight={cn(" w-full", fieldHeight)}
                  fieldWidth={filedWidth}
                  type="text"
                />
              </div>

                {/* Address Street and City Row */}
                <div className={formContainer}>
                  <InputField
                    disabled={false}
                    labelTitle="Street Address"
                    fieldName="address_street"
                    placeholder="Enter street address"
                    required={false}
                    languageName="address_street"
                    fieldHeight={cn(" w-full", fieldHeight)}
                    fieldWidth={filedWidth}
                    type="text"
                  />
                  <InputField
                    disabled={false}
                    labelTitle="City"
                    fieldName="address_city"
                    placeholder="Enter city"
                    required={false}
                    languageName="address_city"
                    fieldHeight={cn(" w-full", fieldHeight)}
                    fieldWidth={filedWidth}
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 sm:px-8 py-6 bg-white border-t border-gray-200 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={cn(
                  "px-8 py-2.5 font-medium transition-all duration-200 rounded-lg",
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white"
                    : "bg-gray-400 cursor-not-allowed text-gray-600 hover:bg-gray-400"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

