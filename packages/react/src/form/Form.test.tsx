import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMForm, useForm } from './Form.js';
import { VertMInput } from '../input/Input.js';

function submitButton() {
  return screen.getByRole('button', { name: 'submit' });
}

describe('VertMForm', () => {
  it('collects field values and passes them to onFinish', async () => {
    const onFinish = vi.fn();
    render(
      <VertMForm onFinish={onFinish}>
        <VertMForm.Item name="name" label="ᠨᠡᠷᠡ">
          <VertMInput />
        </VertMForm.Item>
        <button type="submit">submit</button>
      </VertMForm>
    );

    await userEvent.type(screen.getByRole('textbox'), 'ᠠᠪ');
    await userEvent.click(submitButton());

    await waitFor(() => expect(onFinish).toHaveBeenCalledWith({ name: 'ᠠᠪ' }));
  });

  it('blocks submission and shows a message when a required rule fails', async () => {
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();
    render(
      <VertMForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <VertMForm.Item name="name" rules={[{ required: true, message: 'ᠱᠠᠭᠠᠷᠳᠠᠯᠭᠠᠲᠠᠢ' }]}>
          <VertMInput />
        </VertMForm.Item>
        <button type="submit">submit</button>
      </VertMForm>
    );

    await userEvent.click(submitButton());

    await waitFor(() => expect(screen.getByText('ᠱᠠᠭᠠᠷᠳᠠᠯᠭᠠᠲᠠᠢ')).toBeInTheDocument());
    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalledWith({ name: 'ᠱᠠᠭᠠᠷᠳᠠᠯᠭᠠᠲᠠᠢ' });
  });

  it('enforces pattern rules', async () => {
    const onFinishFailed = vi.fn();
    render(
      <VertMForm onFinishFailed={onFinishFailed}>
        <VertMForm.Item name="code" rules={[{ pattern: /^\d+$/, message: 'digits only' }]}>
          <VertMInput />
        </VertMForm.Item>
        <button type="submit">submit</button>
      </VertMForm>
    );

    await userEvent.type(screen.getByRole('textbox'), 'abc');
    await userEvent.click(submitButton());

    await waitFor(() => expect(screen.getByText('digits only')).toBeInTheDocument());
  });

  it('supports async custom validators', async () => {
    const onFinish = vi.fn();
    render(
      <VertMForm onFinish={onFinish}>
        <VertMForm.Item
          name="code"
          rules={[
            {
              message: 'too short',
              validator: async (value) => {
                if (String(value ?? '').length < 3) throw new Error('too short');
              },
            },
          ]}
        >
          <VertMInput />
        </VertMForm.Item>
        <button type="submit">submit</button>
      </VertMForm>
    );

    await userEvent.type(screen.getByRole('textbox'), 'ab');
    await userEvent.click(submitButton());
    await waitFor(() => expect(screen.getByText('too short')).toBeInTheDocument());
    expect(onFinish).not.toHaveBeenCalled();

    await userEvent.type(screen.getByRole('textbox'), 'c');
    await userEvent.click(submitButton());
    await waitFor(() => expect(onFinish).toHaveBeenCalledWith({ code: 'abc' }));
  });

  it('clears the error once the field becomes valid', async () => {
    render(
      <VertMForm>
        <VertMForm.Item name="name" rules={[{ required: true, message: 'required' }]}>
          <VertMInput />
        </VertMForm.Item>
        <button type="submit">submit</button>
      </VertMForm>
    );

    await userEvent.click(submitButton());
    await waitFor(() => expect(screen.getByText('required')).toBeInTheDocument());

    await userEvent.type(screen.getByRole('textbox'), 'ᠠ');
    await userEvent.click(submitButton());
    await waitFor(() => expect(screen.queryByText('required')).not.toBeInTheDocument());
  });

  it('marks required fields with an asterisk', () => {
    render(
      <VertMForm>
        <VertMForm.Item name="name" label="ᠨᠡᠷᠡ" rules={[{ required: true }]}>
          <VertMInput />
        </VertMForm.Item>
      </VertMForm>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('throws when Form.Item is used outside a Form', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <VertMForm.Item name="orphan">
          <VertMInput />
        </VertMForm.Item>
      )
    ).toThrow(/must be used inside Form/);
    spy.mockRestore();
  });
});

describe('useForm', () => {
  function Harness({ onValues }: { onValues: (v: Record<string, unknown>) => void }) {
    const [form] = useForm();
    return (
      <VertMForm form={form}>
        <VertMForm.Item name="name">
          <VertMInput />
        </VertMForm.Item>
        <button type="button" onClick={() => form.setFieldValue('name', 'ᠰᠡᠲ')}>
          set
        </button>
        <button type="button" onClick={() => onValues(form.getFieldsValue())}>
          read
        </button>
        <button type="button" onClick={() => form.resetFields()}>
          reset
        </button>
      </VertMForm>
    );
  }

  it('reads and writes field values through the instance', async () => {
    const onValues = vi.fn();
    render(<Harness onValues={onValues} />);

    await userEvent.click(screen.getByRole('button', { name: 'set' }));
    await userEvent.click(screen.getByRole('button', { name: 'read' }));
    expect(onValues).toHaveBeenLastCalledWith({ name: 'ᠰᠡᠲ' });
  });

  it('clears values on resetFields', async () => {
    const onValues = vi.fn();
    render(<Harness onValues={onValues} />);

    await userEvent.click(screen.getByRole('button', { name: 'set' }));
    await userEvent.click(screen.getByRole('button', { name: 'reset' }));
    await userEvent.click(screen.getByRole('button', { name: 'read' }));
    expect(onValues).toHaveBeenLastCalledWith({});
  });

  it('clears validation errors on resetFields', async () => {
    function ResetHarness() {
      const [form] = useForm();
      return (
        <VertMForm form={form}>
          <VertMForm.Item name="name" rules={[{ required: true, message: 'required' }]}>
            <VertMInput />
          </VertMForm.Item>
          <button type="submit">submit</button>
          <button type="button" onClick={() => form.resetFields()}>
            reset
          </button>
        </VertMForm>
      );
    }
    render(<ResetHarness />);

    await userEvent.click(submitButton());
    await waitFor(() => expect(screen.getByText('required')).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: 'reset' }));
    await waitFor(() => expect(screen.queryByText('required')).not.toBeInTheDocument());
  });

  it('renders help and extra under the control', () => {
    render(
      <VertMForm>
        <VertMForm.Item name="name" label="ᠨᠡᠷᠡ" help="ᠲᠠᠢᠯᠪᠤᠷᠢ" extra="extra-note">
          <VertMInput />
        </VertMForm.Item>
      </VertMForm>
    );

    expect(screen.getByText('ᠲᠠᠢᠯᠪᠤᠷᠢ')).toBeInTheDocument();
    expect(screen.getByText('extra-note')).toBeInTheDocument();
  });
});
