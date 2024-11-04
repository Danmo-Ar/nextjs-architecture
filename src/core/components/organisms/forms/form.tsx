import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Schema } from "zod";

import {
	ArrayPath,
	FieldArray,
	FieldValues,
	SubmitHandler,
	UseFieldArrayProps,
	UseFieldArrayReturn,
	UseFormProps,
	UseFormReturn,
	useFieldArray,
	useForm,
} from "react-hook-form";

interface FormProps<TFormValues extends FieldValues> {
	useFormProps: UseFormProps<TFormValues>;
	onSubmit: SubmitHandler<TFormValues>;
	validationSchema: Schema<TFormValues>;
	children: (
		methods: UseFormReturn<TFormValues>,
		fieldArray: UseFieldArrayReturn<
			TFormValues,
			ArrayPath<TFormValues>,
			"id"
		>,
	) => React.ReactNode;
	fieldArrayOption?: UseFieldArrayProps<
		TFormValues,
		ArrayPath<TFormValues>,
		"id"
	>;
	fieldArrayDefaultValue?:
		| FieldArray<TFormValues, ArrayPath<TFormValues>>
		| FieldArray<TFormValues, ArrayPath<TFormValues>>[];
}

const Form = <TFormValues extends FieldValues>({
	useFormProps,
	onSubmit,
	validationSchema,
	children,
	fieldArrayOption,
	fieldArrayDefaultValue,
}: FormProps<TFormValues>) => {
	const methods = useForm<TFormValues>({
		...useFormProps,
		...(validationSchema && { resolver: zodResolver(validationSchema) }),
		mode: "onChange",
	});

	const fieldArray = fieldArrayDefaultValue
		? useFieldArray({
				...fieldArrayOption,
				control: methods.control,
				name: fieldArrayOption?.name!,
				rules: fieldArrayOption?.rules,
			})
		: undefined;

	useEffect(() => {
		if (fieldArray) {
			fieldArray.remove();
			fieldArray.append(fieldArrayDefaultValue!);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
				{children(methods, fieldArray!)}
			</form>
			{process.env.NODE_ENV === "development" && (
				<DevTool control={methods.control} />
			)}
		</>
	);
};

export default Form;
