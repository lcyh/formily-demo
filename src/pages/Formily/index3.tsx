import { Form, FormItem, Input, ArrayTable, Editable } from '@formily/antd';
import { createForm, onFieldChange } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { Button } from 'antd';
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
    Button,
  },
});

const form = createForm({
  effects: () => {
    onFieldChange('array.a1', (state) => {
      console.log('====================================');
      console.log('state', state);
      console.log('====================================');
    });
  },
});

export default () => {
  return (
    <FormProvider form={form}>
      <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
        <SchemaField>
          <SchemaField.String
            name="button"
            title="button"
            x-decorator="FormItem"
            x-component="Button"
            x-component-props={{
              children: 'button',
            }}
          />
        </SchemaField>
      </Form>
    </FormProvider>
  );
};
