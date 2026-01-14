import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "../ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import { cn } from "../../lib/utils";
import InputField from "../forms/InputField";
import DropDownDataField from "../forms/DropDownField";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useMutation } from "@apollo/client";
import {
  GET_ALL_INITIAL_FEES,
  UPDATE_TOPUP_FEES_BY_ID,
  INSERT_TIME_BASED_FEE,
  UPDATE_TIME_BASED_FEE,
  DELETE_TIME_BASED_FEE,
} from "../../graphql/setupfees";

type TimeBasedFee = {
  id?: string;
  start_hour: string;
  end_hour: string;
  fee: number;
  isNew?: boolean;
  isDeleted?: boolean;
};

type Fees = {
  id?: string;
  initial_fee?: number;
  insurance_fee?: number;
  platform_fee?: number;
  waiting_fee_per_minute?: number;
  free_waiting_minute?: number;
  distance_fee_per_km?: number;
  commission_rate_type?: string;
  commission_rate?: number;
  out_of_town?: number;
  time_based_fees?: TimeBasedFee[];
};

type SetupFeesType = {
  editData?: Fees;
  editMode: boolean;
  loading: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer = "flex flex-col md:flex-row justify-between items-center";

export const additionalData = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed", value: "fixed" },
];

// format timetz for <input type="time">
const formatTimeForInput = (time?: string) => {
  if (!time) return "";
  if (time.includes(":")) {
    const parts = time.split(":");
    return `${parts[0]}:${parts[1]}`;
  }
  return time;
};

// convert HH:MM back to timetz
const toTimeTZ = (time: string) => {
  if (!time) return null;
  return `${time}:00+06:30`;
};

//  Get extra fee if current time is within slot
const getApplicableTimeFee = (
  currentTime: string,
  timeBasedFees: TimeBasedFee[] = []
): number => {
  const current = currentTime.split(":").map(Number);
  const nowMinutes = current[0] * 60 + current[1];

  for (const fee of timeBasedFees) {
    if (!fee.start_hour || !fee.end_hour) continue;

    const [sh, sm] = fee.start_hour.split(":").map(Number);
    const [eh, em] = fee.end_hour.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    if (
      (startMinutes <= endMinutes &&
        nowMinutes >= startMinutes &&
        nowMinutes < endMinutes) ||
      (startMinutes > endMinutes &&
        (nowMinutes >= startMinutes || nowMinutes < endMinutes))
    ) {
      return fee.fee;
    }
  }
  return 0;
};

//  Check if current time matches start hour (for one-time trigger) - FIXED
const isStartTimeMatch = (
  currentTime: string,
  timeBasedFees: TimeBasedFee[] = []
): { matched: boolean; fee: number } => {
  const current = currentTime.split(":").map(Number);
  const nowMinutes = current[0] * 60 + current[1];

  for (const fee of timeBasedFees) {
    if (!fee.start_hour) continue;

    const [sh, sm] = fee.start_hour.split(":").map(Number);
    const startMinutes = sh * 60 + sm;

    // Only trigger at exact start minute
    if (nowMinutes === startMinutes) {
      return { matched: true, fee: fee.fee };
    }
  }
  return { matched: false, fee: 0 };
};

//  Check if current time matches end hour (to reset) - FIXED
const isEndTimeMatch = (
  currentTime: string,
  timeBasedFees: TimeBasedFee[] = []
): { matched: boolean } => {
  const current = currentTime.split(":").map(Number);
  const nowMinutes = current[0] * 60 + current[1];

  for (const fee of timeBasedFees) {
    if (!fee.end_hour) continue;

    const [eh, em] = fee.end_hour.split(":").map(Number);
    const endMinutes = eh * 60 + em;

    // Only reset at exact end minute
    if (nowMinutes === endMinutes) {
      return { matched: true };
    }
  }
  return { matched: false };
};

export const SetUpFeesForm: React.FC<SetupFeesType> = ({
  editData,
  editMode,
  loading,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentFee, setCurrentFee] = useState<number>(0);
  const [lastSavedFee, setLastSavedFee] = useState<number>(0);
  const [triggeredFees, setTriggeredFees] = useState<Set<string>>(new Set());
  const [lastCheckedMinute, setLastCheckedMinute] = useState<number>(-1);
  const [originalBaseFee, setOriginalBaseFee] = useState<number>(0);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

  const [updateFeeConfig, { loading: updateLoading }] = useMutation(
    UPDATE_TOPUP_FEES_BY_ID,
    { refetchQueries: [GET_ALL_INITIAL_FEES] }
  );

  const [insertTimeFee] = useMutation(INSERT_TIME_BASED_FEE, {
    refetchQueries: [GET_ALL_INITIAL_FEES],
  });

  const [updateTimeFee] = useMutation(UPDATE_TIME_BASED_FEE, {
    refetchQueries: [GET_ALL_INITIAL_FEES],
  });

  const [deleteTimeFee] = useMutation(DELETE_TIME_BASED_FEE, {
    refetchQueries: [GET_ALL_INITIAL_FEES],
    onCompleted: () => {
      setIsDeleting(false);
      setDeletingId(null);
    },
    onError: (error) => {
      console.error("Error deleting time-based fee:", error);
      setIsDeleting(false);
      setDeletingId(null);
    },
  });

  console.log(lastSavedFee);

  const FormSchema = yup.object({
    initial_fee: yup.number(),
    insurance_fee: yup.number(),
    platform_fee: yup.number(),
    waiting_fee_per_minute: yup.number(),
    free_waiting_minute: yup.number(),
    distance_fee_per_km: yup.number(),
    commission_rate_type: yup.string(),
    commission_rate: yup.number(),
    out_of_town: yup.number(),
    time_based_fees: yup.array().of(
      yup.object({
        id: yup.string().optional(),
        start_hour: yup.string().required("Start Hour required"),
        end_hour: yup.string().required("End Hour required"),
        fee: yup.number().required("Fee required"),
        isNew: yup.boolean().optional(),
        isDeleted: yup.boolean().optional(),
      })
    ),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      initial_fee: 0,
      insurance_fee: 0,
      platform_fee: 0,
      waiting_fee_per_minute: 0,
      free_waiting_minute: 0,
      distance_fee_per_km: 0,
      commission_rate_type: "fixed",
      commission_rate: 0,
      out_of_town: 0,
      time_based_fees: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "time_based_fees",
  });

  // Initialize original base fee ONLY ONCE
  useEffect(() => {
    if (editData && originalBaseFee === 0) {
      setOriginalBaseFee(editData.initial_fee || 0);
      console.log("📌 Original Base Fee captured ONCE:", editData.initial_fee);
    }
  }, [editData]);

  //  Update live currentFee every 30s AND auto-submit form when time matches start/end
  useEffect(() => {
    if (!editData) return;

    const formattedTimeBasedFees =
      editData.time_based_fees?.map((fee) => ({
        ...fee,
        start_hour: formatTimeForInput(fee.start_hour),
        end_hour: formatTimeForInput(fee.end_hour),
        isNew: false,
      })) || [];

    form.reset({
      ...editData,
      time_based_fees: formattedTimeBasedFees,
    });

    const updateLiveFee = async () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${String(currentHour).padStart(2, "0")}:${String(
        currentMinute
      ).padStart(2, "0")}`;

      if (currentMinute !== lastCheckedMinute) {
        setLastCheckedMinute(currentMinute);

        //  Start time match → auto-submit with updated initial_fee
        const startTimeResult = isStartTimeMatch(
          currentTime,
          formattedTimeBasedFees
        );

        if (startTimeResult.matched && editData?.id && !isAutoSubmitting) {
          const today = new Date().toDateString();
          const key = `${today}-start-${currentTime}-${editData.id}`;
          if (!triggeredFees.has(key)) {
            const newFee = originalBaseFee + startTimeResult.fee;

            console.log(" Applying START TIME fee:", {
              originalBase: originalBaseFee,
              addedFee: startTimeResult.fee,
              newTotal: newFee,
            });

            form.setValue("initial_fee", newFee, { shouldDirty: true });
            setIsAutoSubmitting(true);
            
            const currentFormValues = form.getValues();
            await handleUpdate(currentFormValues);
            
            setIsAutoSubmitting(false);

            setLastSavedFee(newFee);
            setTriggeredFees((prev) => new Set(prev).add(key));
            console.log(" Auto-submitted form on start time match:", {
              time: currentTime,
              addedFee: startTimeResult.fee,
              newTotal: newFee,
              originalBase: originalBaseFee,
            });
          }
        }

        //  End time match → auto-submit with reset fee
        const endTimeResult = isEndTimeMatch(
          currentTime,
          formattedTimeBasedFees
        );

        if (endTimeResult.matched && editData?.id && !isAutoSubmitting) {
          const today = new Date().toDateString();
          const key = `${today}-end-${currentTime}-${editData.id}`;
          if (!triggeredFees.has(key)) {
            const resetFee = originalBaseFee;

            console.log(" Resetting to ORIGINAL base fee:", resetFee);

            form.setValue("initial_fee", resetFee, { shouldDirty: true });
            setIsAutoSubmitting(true);
            
            const currentFormValues = form.getValues();
            await handleUpdate(currentFormValues);
            
            setIsAutoSubmitting(false);

            setLastSavedFee(resetFee);
            setTriggeredFees((prev) => new Set(prev).add(key));
            console.log("✅ Auto-submitted form on end time match. Reset to base:", {
              time: currentTime,
              resetTo: resetFee,
            });
          }
        }
      }

      // 🟡 Live display: always original base + applicable time fee
      const timeFee = getApplicableTimeFee(currentTime, formattedTimeBasedFees);
      const totalFee = originalBaseFee + timeFee;
      setCurrentFee(totalFee);
      form.setValue("initial_fee", totalFee, { shouldDirty: false });

      //  DEBUG: Log active slots
      const activeSlots = formattedTimeBasedFees
        .filter((fee) => {
          if (!fee.start_hour || !fee.end_hour) return false;
          const [sh, sm] = fee.start_hour.split(":").map(Number);
          const [eh, em] = fee.end_hour.split(":").map(Number);
          const startMinutes = sh * 60 + sm;
          const endMinutes = eh * 60 + em;
          const nowMinutes = currentHour * 60 + currentMinute;

          return (
            (startMinutes <= endMinutes &&
              nowMinutes >= startMinutes &&
              nowMinutes < endMinutes) ||
            (startMinutes > endMinutes &&
              (nowMinutes >= startMinutes || nowMinutes < endMinutes))
          );
        })
        .map((f) => ({ start: f.start_hour, end: f.end_hour, fee: f.fee }));

      console.log(" Live fee calculation at", currentTime, {
        originalBase: originalBaseFee,
        timeFee,
        totalFee,
        activeSlots,
      });
    };

    updateLiveFee();
    const interval = setInterval(updateLiveFee, 30000);
    return () => clearInterval(interval);
  }, [
    editData,
    form,
    triggeredFees,
    lastCheckedMinute,
    originalBaseFee,
    isAutoSubmitting,
  ]);

  const handleDeleteTimeFee = async (index: number) => {
    const currentFees = form.getValues("time_based_fees") || [];
    const feeToDelete = currentFees[index];

    if (!feeToDelete?.id) {
      remove(index);
      return;
    }

    setIsDeleting(true);
    setDeletingId(feeToDelete.id);

    try {
      await deleteTimeFee({ variables: { id: feeToDelete.id } });
      remove(index);
    } catch (error) {
      console.error("Error deleting time-based fee:", error);
      alert("Failed to delete time-based fee. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const handleUpdate = async (data: Fees) => {
    try {
      const currentFormValues = form.getValues();
      const totalFeeToSave = currentFormValues.initial_fee || 0;

      console.log("📡 Saving initial_fee directly from form:", {
        id: editData?.id,
        savedFee: totalFeeToSave,
        timestamp: new Date().toISOString(),
      });

      await updateFeeConfig({
        variables: { 
          ...data, 
          id: editData?.id, 
          initial_fee: totalFeeToSave 
        },
      });

      console.log(" Database updated successfully: initial_fee =", totalFeeToSave);

      if (data.time_based_fees?.length) {
        for (let index = 0; index < data.time_based_fees.length; index++) {
          const fee = form.getValues(`time_based_fees.${index}`) || data.time_based_fees[index];
          if (!fee) continue; 
          if (fee.isDeleted) continue;

          if (fee.id && !fee.isNew) {
            await updateTimeFee({
              variables: {
                id: fee.id,
                start_hour: toTimeTZ(fee.start_hour),
                end_hour: toTimeTZ(fee.end_hour),
                fee: fee.fee,
              },
            });
          } else if (!fee.id || fee.isNew) {
            const res = await insertTimeFee({
              variables: {
                fee_config_id: editData?.id,
                start_hour: toTimeTZ(fee.start_hour),
                end_hour: toTimeTZ(fee.end_hour),
                fee: fee.fee,
              },
            });

            const newId = res?.data?.insertTimeBasedFee?.id;
            if (newId) {
              form.setValue(`time_based_fees.${index}.id`, newId, {
                shouldDirty: false,
              });
              form.setValue(`time_based_fees.${index}.isNew`, false, {
                shouldDirty: false,
              });
            }
          }
        }
      }

      setLastSavedFee(totalFeeToSave);
      form.reset({ ...data, initial_fee: totalFeeToSave });
    } catch (error) {
      console.error("❌ Failed to update initial_fee in database:", error);
    }
  };

  const handleAppend = () => {
    append({ start_hour: "", end_hour: "", fee: 0, isNew: true } as TimeBasedFee);
  };

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center h-[300px]">
          <Skeleton className="h-[400px] mt-[100px] rounded-md w-full" />
        </div>
      ) : (
        <Form {...form}>
          <form
            className="sm:space-y-[16px] bg-white p-5 rounded"
            onSubmit={form.handleSubmit(handleUpdate)}
          >
            {/* Existing Fees */}
            <div className={formContainer}>
              <InputField
                disabled={editMode}
                labelTitle="Initial Fee (Base + Time Fee)"
                fieldName="initial_fee"
                placeholder="Type Here"
                type="number"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
              <InputField
                labelTitle="Insurance Fee"
                type="number"
                fieldName="insurance_fee"
                placeholder="Type Here"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
            </div>

            <div className={formContainer}>
              <InputField
                labelTitle="Platform Fee"
                fieldName="platform_fee"
                type="number"
                placeholder="Type Here"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
              <InputField
                labelTitle="Waiting Fee Per Minute"
                fieldName="waiting_fee_per_minute"
                placeholder="Type Here"
                type="number"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
            </div>

            <div className={formContainer}>
              <InputField
                labelTitle="Free Waiting Minute"
                fieldName="free_waiting_minute"
                type="number"
                placeholder="Type Here"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
              <InputField
                labelTitle="Distance Fee Per KM"
                fieldName="distance_fee_per_km"
                type="number"
                placeholder="Type Here"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
            </div>

            <div className={formContainer}>
              <DropDownDataField
                labelTitle="Commission Rate Type"
                fieldName="commission_rate_type"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                additionalData={additionalData}
                languageName=""
                required={false}
              />
              <InputField
                labelTitle="Commission Rate"
                fieldName="commission_rate"
                placeholder="Type Here"
                type="number"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
            </div>

            <div className={formContainer}>
              <InputField
                labelTitle="out of town"
                fieldName="out_of_town"
                placeholder="Type Here"
                type="number"
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                languageName=""
                required={false}
              />
            </div>

            {/* Live Current Fee Display */}
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p className="font-semibold text-lg">
                Current Initial Fee:{" "}
                <span className="text-blue-600">{currentFee}</span>
              </p>
              <p className="text-sm text-gray-500">
                (Base + applicable time slot fee)
              </p>
            </div>

            {/* Time-Based Fees Section */}
            <div className="mt-4">
              <label className="font-semibold mb-2 block">
                Time-Based Fees
              </label>
              {fields.map((item, index) => {
                const feeId = form.watch(
                  `time_based_fees.${index}.id` as any
                );
                const isDeletingThis = isDeleting && deletingId === feeId;

                return (
                  <div
                    key={item.id || index}
                    className="flex gap-2 mb-2 items-center"
                  >
                    <input
                      type="time"
                      {...form.register(
                        `time_based_fees.${index}.start_hour` as any
                      )}
                      placeholder="Start Hour"
                      className="h-[40px] md:h-[44px] w-1/5 border rounded px-2"
                    />
                    <input
                      type="time"
                      {...form.register(
                        `time_based_fees.${index}.end_hour` as any
                      )}
                      placeholder="End Hour"
                      className="h-[40px] md:h-[44px] w-1/5 border rounded px-2"
                    />
                    <input
                      type="number"
                      {...form.register(
                        `time_based_fees.${index}.fee` as any
                      )}
                      placeholder="Fee"
                      className="h-[40px] md:h-[44px] w-1/5 border rounded px-2"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleDeleteTimeFee(index)}
                      disabled={isDeletingThis}
                    >
                      {isDeletingThis ? "Deleting..." : "Remove"}
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleAppend}
              >
                Add Slot
              </button>
            </div>

            <ModalConfirmBtns
              size="lg"
              width="w-[100px] rounded-md"
              isLoading={updateLoading}
              editMode={true}
              toggle={() => {}}
            />
          </form>
        </Form>
      )}
    </div>
  );
};