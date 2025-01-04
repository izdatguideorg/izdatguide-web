'use client';

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { getClientSideURL } from '@/utilities/getURL';

import { buildInitialFormState } from './buildInitialFormState';
import { fields } from './fields';
import styles from './styles.module.scss';

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

export type FormBlockType = {
  blockName?: string;
  blockType?: 'formBlock';
  enableIntro: boolean;
  form: FormType;
  introContent?: SerializedEditorState;
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = ({
  enableIntro,
  form: formFromProps,
  form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  introContent,
}) => {
  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<{ message: string; status?: string } | undefined>();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const res = (await req.json()) as {
            message: string;
            status?: string;
            errors?: { message: string }[];
          };

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: 'Something went wrong.',
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType],
  );

  return (
    <div className={styles.textWrapper}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className={styles.text} data={introContent} enableGutter={false} />
      )}
      <div className={styles.formWrapper}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={void handleSubmit(onSubmit)}>
              <div className={styles.formFromPropsWrapper}>
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType];
                    if (Field) {
                      return (
                        <div key={index} className={styles.fieldWrapper}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              <Button form={formID} type='submit' variant='default'>
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
