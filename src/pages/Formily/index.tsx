import type { ObjectField as ObjectFieldType } from '@formily/core';
import { createForm } from '@formily/core';
import { FormProvider, Field, ObjectField, useField, observer } from '@formily/react';
import { Input, Button, Space } from 'antd';

const form = createForm();

const ObjectComponent = observer(() => {
  const field = useField<ObjectFieldType>();
  console.log('field', field);

  return (
    <>
      <div>
        {Object.keys(field.value || {}).map((key) => (
          <div key={key} style={{ display: 'flex-block', marginBottom: 10 }}>
            <Space>
              <Field name={key} component={[Input, { placeholder: key }]} />
              <Button
                onClick={() => {
                  field.removeProperty(key);
                }}
              >
                Remove
              </Button>
            </Space>
          </div>
        ))}
      </div>
      <Space>
        <Field
          name="propertyName"
          basePath={'test'}
          required
          component={[Input, { placeholder: 'Property Name' }]}
        />
        <Button
          onClick={() => {
            const name = form.values.propertyName;
            console.log('`${field.path}.${name}`', `${field.path}.${name}`);

            if (name && !form.existValuesIn(`${field.path}.${name}`)) {
              field.addProperty(name, '');
              form.deleteValuesIn('propertyName');
            }
          }}
        >
          Add
        </Button>
      </Space>
    </>
  );
});

export default () => (
  <FormProvider form={form}>
    <ObjectField name="object" component={[ObjectComponent]} />
  </FormProvider>
);
