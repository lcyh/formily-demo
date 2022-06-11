import React, { useMemo } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { GeneralField } from '@formily/core';
import { createForm } from '@formily/core';
import { FormProvider, FormConsumer, Field, connect, mapProps } from '@formily/react';
import { Input, Form, Button } from 'antd';

// FormItem UI组件
const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      return {
        ...props,
        extra: 'xxxx',
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      };
    },
  ),
);

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }), []);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, val: string) => {
    console.log('点击button', e, val);
  };
  return (
    <PageContainer>
      <FormProvider form={form}>
        <Form layout="vertical">
          <Field
            name="name"
            title="Name"
            required
            decorator={[FormItem]}
            component={[Input, { placeholder: 'Please Input' }]}
            reactions={(field: GeneralField) => {
              console.log('field', field);
              if (field.value === '123') {
                field.query('button').take().disabled = true;
              }
            }}
          />
          <Field
            name="button"
            title="Button"
            required
            decorator={[FormItem]}
            component={[Button, { children: 1212, onClick: (e) => handleClick(e, 'hello') }]}
          />
          <code>
            <pre>
              <FormConsumer>{(form) => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
          </code>
        </Form>
      </FormProvider>
      <FooterToolbar
        extra={
          <Button
            type="primary"
            onClick={() => {
              form.submit(console.log);
            }}
          >
            Submit
          </Button>
        }
      />
    </PageContainer>
  );
};
