import { Form, FormItem, Input } from '@formily/antd';
import { createForm, onFieldChange } from '@formily/core';
import { FormProvider, Field } from '@formily/react';
import { Button } from 'antd';

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
        <Field name="username" title="用户名" required decorator={[FormItem]} component={[Input]} />
        <Field
          name="button2"
          title="提交"
          decorator={[FormItem]}
          component={[
            Button,
            {
              children: 'button',
            },
          ]}
        />
      </Form>
    </FormProvider>
  );
};
