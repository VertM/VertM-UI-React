import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMCheckbox } from '../checkbox/Checkbox.js';
import { VertMRadio } from '../radio/Radio.js';
import { VertMForm, useForm } from '../form/Form.js';
import { VertMInput } from '../input/Input.js';
import { VertMButton } from '../button/Button.js';

function EditorialForm() {
  const [form] = useForm();
  return (
    <VertMForm form={form} onFinish={() => {}}>
      <VertMForm.Item name="word" label="ᠨᠡᠷ᠎ᠡ" rules={[{ required: true, message: 'ᠵᠠᠰᠠᠬᠤ' }]}>
        <VertMInput />
      </VertMForm.Item>
      <VertMButton htmlType="submit" type="primary">
        submit
      </VertMButton>
    </VertMForm>
  );
}

describe('editorial choice and form layout', () => {
  it('keeps checkbox and radio groups as peer columns under editorial', () => {
    const { container } = render(
      <VertMConfigProvider appearance="editorial">
        <VertMCheckbox.Group
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
          defaultValue={['a']}
        />
        <VertMRadio.Group
          options={[
            { label: 'X', value: 'x' },
            { label: 'Y', value: 'y' },
          ]}
          defaultValue="x"
        />
      </VertMConfigProvider>
    );

    expect(container.querySelector('[data-appearance="editorial"]')).toBeTruthy();
    expect(container.querySelector('.vertm-checkbox-group')).toBeInTheDocument();
    expect(container.querySelector('.vertm-radio-group')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('renders form fields as editorial columns and shows validation error', async () => {
    const { container } = render(
      <VertMConfigProvider appearance="editorial">
        <EditorialForm />
      </VertMConfigProvider>
    );

    expect(container.querySelector('.vertm-form')).toBeInTheDocument();
    expect(container.querySelector('.vertm-form-item__label')).toHaveTextContent('ᠨᠡᠷ᠎ᠡ');

    await userEvent.click(screen.getByRole('button', { name: 'submit' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('ᠵᠠᠰᠠᠬᠤ');
  });
});
