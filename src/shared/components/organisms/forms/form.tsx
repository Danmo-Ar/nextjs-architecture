import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import type { Schema } from 'zod';

import type {
    ArrayPath,
    FieldArray,
    FieldValues,
    SubmitHandler,
    UseFieldArrayProps,
    UseFieldArrayReturn,
    UseFormProps,
    UseFormReturn
} from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';

interface FormProps<TFormValues extends FieldValues> {
    useFormProps: UseFormProps<TFormValues>;
    onSubmit: SubmitHandler<TFormValues>;
    validationSchema: Schema;
    children: (
        methods: UseFormReturn<TFormValues>,
        fieldArray: UseFieldArrayReturn<
            TFormValues,
            ArrayPath<TFormValues>,
            'id'
        >
    ) => React.ReactNode;
    fieldArrayOption?: UseFieldArrayProps<
        TFormValues,
        ArrayPath<TFormValues>,
        'id'
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
    fieldArrayDefaultValue
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>({
        ...useFormProps,
        ...(validationSchema && { resolver: zodResolver(validationSchema) }),
        mode: 'onChange'
    });

    const fieldArray = useFieldArray({
        ...fieldArrayOption,
        control: methods.control,
        name: fieldArrayOption?.name as ArrayPath<TFormValues>,
        rules: fieldArrayOption?.rules
    });
    useEffect(() => {
        if (fieldArrayDefaultValue) {
            fieldArray.remove();
            fieldArray.append(fieldArrayDefaultValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                {children(methods, fieldArray)}
            </form>
            {process.env.NODE_ENV === 'development' && (
                <DevTool control={methods.control} />
            )}
        </>
    );
};

export default Form;
