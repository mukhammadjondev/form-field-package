import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CheckboxGroupField } from './components/fields/CheckboxGroup';
import { Form } from './components/ui/form';
import { TextField } from './components/fields';
import { Eye } from 'lucide-react';

const formSchema = z.object({
  input: z.string(),
  checkbox: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function App() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
      checkbox: '',
    },
  });

  const onSubmit = (formValues: FormSchema) => {
    console.log(formValues);
  };

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextField name="input" label="INPUT" iconLeft={<Eye />} required />

          <CheckboxGroupField
            name="checkbox"
            data={[
              { label: 'dasda', value: 'sfasdasdasgasd' },
              { label: 'dasd asd asda', value: 'sfasdasdgasdgasd' },
            ]}
          />
        </form>
      </Form>
    </div>
  );
}
