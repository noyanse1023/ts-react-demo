import React, { FC } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import '../_style.scss'
import { loginLayout, loginTailLayout } from '../../../constant/layout'

export interface ILoginSuccess {
  password: string,
  username: string,
  remember: boolean
}
export interface Props {
  
}


export const Login: FC<Props> = (prop) => {
  const onFinish = (values: ILoginSuccess) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...loginLayout}
      name="basic"
      className="login_wrapper"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...loginTailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...loginTailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

Login.defaultProps = {
}

export default Login
