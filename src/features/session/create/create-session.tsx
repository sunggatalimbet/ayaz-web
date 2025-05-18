import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { postColdExposure } from '~/entities/cold-exposures/api/post-cold-exposure.api';
import type { PostColdExposureRequest } from '~/entities/cold-exposures/model/contracts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/shadcn-ui/card';
import { Input } from '~/shared/shadcn-ui/input';
import { Label } from '~/shared/shadcn-ui/label';
import { SubmitButton } from '~/shared/ui/submit-button';

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export function CreateSessionForm() {
  const { mutate: createColdExposure, isPending } = useMutation({
    mutationFn: (newColdExposure: PostColdExposureRequest) => {
      return postColdExposure(newColdExposure);
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      toast.success(`Failed to create a ${variables.name} session`);
    },
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
      toast.success(`Successfully created ${variables.name} session`);
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: '',
      exposureDuration: 0,
      preparationDuration: 0,
    },
    validators: {
      onSubmit: z.object({
        name: z.string(),
        exposureDuration: z.coerce.number().min(10),
        preparationDuration: z.coerce.number().min(0),
      }),
    },
    onSubmit: async ({ value }) => {
      const requestBody: PostColdExposureRequest = {
        userId: 'fcf6968e-8e77-4afb-821f-839e057a458d',
        name: value.name,
        exposureDuration: value.exposureDuration,
        preparationDuration: value.preparationDuration,
      };

      createColdExposure(requestBody);
    },
  });

  return (
    <Card className='mx-auto w-full max-w-md border-zinc-800 bg-zinc-900'>
      <CardHeader>
        <CardTitle>Create Cold Exposure</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className='space-y-4'
        >
          <form.AppField
            name='name'
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='name'>Session Name</Label>

                <field.Input
                  id='name'
                  defaultValue={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Morning Cold Shower'
                  className='border-zinc-800 bg-zinc-800'
                />
              </div>
            )}
          />
          <form.AppField
            name='exposureDuration'
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='exposureDuration'>
                  Cold Exposure Duration (seconds)
                </Label>

                <field.Input
                  id='exposureDuration'
                  defaultValue={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder='60'
                  className='border-zinc-800 bg-zinc-800'
                  type='number'
                  min='5'
                />
              </div>
            )}
          />
          <form.AppField
            name='preparationDuration'
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='preparationDuration'>
                  Preparation Duration (seconds)
                </Label>

                <field.Input
                  id='preparationDuration'
                  defaultValue={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder='10'
                  className='border-zinc-800 bg-zinc-800'
                  type='number'
                  min='0'
                />
              </div>
            )}
          />

          <form.SubmitButton
            className='w-full'
            title='Create Session'
            isPending={isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
}
