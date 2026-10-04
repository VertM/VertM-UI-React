import { describe, expect, it, vi } from 'vitest';
import { createFormStore } from './store.js';

describe('createFormStore', () => {
  it('reports the default required message', async () => {
    const store = createFormStore();
    store.registerRules('name', [{ required: true }]);
    await expect(store.validate()).rejects.toEqual({ name: 'Required field' });
  });

  it('lets messages.required override the default', async () => {
    const store = createFormStore({ messages: { required: '必填' } });
    store.registerRules('name', [{ required: true }]);
    await expect(store.validate()).rejects.toEqual({ name: '必填' });
  });

  it('prefers rule.message over messages', async () => {
    const store = createFormStore({ messages: { required: '必填' } });
    store.registerRules('name', [{ required: true, message: 'Name please' }]);
    await expect(store.validate()).rejects.toEqual({ name: 'Name please' });
  });

  it('fails pattern rules with the default message', async () => {
    const store = createFormStore();
    store.setFieldValue('code', 'abc');
    store.registerRules('code', [{ pattern: /^\d+$/ }]);
    await expect(store.validate()).rejects.toEqual({ code: 'Invalid format' });
  });

  it('surfaces async validator failures', async () => {
    const store = createFormStore();
    store.setFieldValue('async', 'x');
    store.registerRules('async', [
      {
        validator: async () => {
          throw new Error('nope');
        },
      },
    ]);
    await expect(store.validate()).rejects.toEqual({ async: 'Validation failed' });
  });

  it('resets values and notifies both listener sets', () => {
    const store = createFormStore();
    const onChange = vi.fn();
    const onReset = vi.fn();
    store.subscribe(onChange);
    store.subscribeReset(onReset);
    store.setFieldValue('a', 1);
    onChange.mockClear();
    store.reset();
    expect(store.getValues()).toEqual({});
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('merges setFieldsValue instead of replacing', () => {
    const store = createFormStore();
    store.setFieldsValue({ a: 1, b: 2 });
    store.setFieldsValue({ b: 3, c: 4 });
    expect(store.getValues()).toEqual({ a: 1, b: 3, c: 4 });
  });
});
