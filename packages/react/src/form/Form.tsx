import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  cloneElement,
  isValidElement,
  type ReactNode,
  type FormEvent,
  type ReactElement,
} from 'react';
import { VertMText } from '../VertMText.js';

export interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (value: unknown) => Promise<void> | void;
}

type FormLayout = 'vertical' | 'horizontal';

interface FormStore {
  getValues: () => Record<string, unknown>;
  getRules: () => Record<string, Rule[]>;
  subscribe: (listener: () => void) => () => void;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldsValue: (values: Record<string, unknown>) => void;
  registerRules: (name: string, rules: Rule[]) => void;
  validate: () => Promise<Record<string, unknown>>;
  reset: () => void;
}

export interface FormInstance {
  getFieldValue: (name: string) => unknown;
  getFieldsValue: () => Record<string, unknown>;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldsValue: (values: Record<string, unknown>) => void;
  validateFields: () => Promise<Record<string, unknown>>;
  resetFields: () => void;
  _store: FormStore;
}

function createFormStore(): FormStore {
  let values: Record<string, unknown> = {};
  let rules: Record<string, Rule[]> = {};
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((l) => l());

  return {
    getValues: () => values,
    getRules: () => rules,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setFieldValue(name, value) {
      values = { ...values, [name]: value };
      notify();
    },
    setFieldsValue(vals) {
      values = { ...values, ...vals };
      notify();
    },
    registerRules(name, r) {
      rules = { ...rules, [name]: r };
    },
    async validate() {
      const errors: Record<string, string> = {};
      for (const [name, fieldRules] of Object.entries(rules)) {
        const value = values[name];
        for (const rule of fieldRules) {
          if (rule.required && (value === undefined || value === null || value === '')) {
            errors[name] = rule.message ?? 'Required field';
            break;
          }
          if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
            errors[name] = rule.message ?? 'Invalid format';
            break;
          }
          if (rule.validator) {
            try {
              await rule.validator(value);
            } catch {
              errors[name] = rule.message ?? 'Validation failed';
              break;
            }
          }
        }
      }
      if (Object.keys(errors).length) throw errors;
      return { ...values };
    },
    reset() {
      values = {};
      notify();
    },
  };
}

export function useForm(): [FormInstance] {
  const storeRef = useRef<FormStore | null>(null);
  if (!storeRef.current) storeRef.current = createFormStore();
  const store = storeRef.current;

  return [
    useMemo(
      () => ({
        getFieldValue: (name: string) => store.getValues()[name],
        getFieldsValue: () => ({ ...store.getValues() }),
        setFieldValue: (name: string, value: unknown) => store.setFieldValue(name, value),
        setFieldsValue: (values: Record<string, unknown>) => store.setFieldsValue(values),
        validateFields: () => store.validate(),
        resetFields: () => store.reset(),
        _store: store,
      }),
      [store]
    ),
  ];
}

interface FormContextValue {
  store: FormStore;
  errors: Record<string, string>;
  layout: FormLayout;
}

const FormContext = createContext<FormContextValue | null>(null);

function useFormStore(store: FormStore) {
  const [, setTick] = useState(0);
  useEffect(() => store.subscribe(() => setTick((t) => t + 1)), [store]);
}

export interface FormProps {
  form?: FormInstance;
  layout?: FormLayout;
  onFinish?: (values: Record<string, unknown>) => void;
  onFinishFailed?: (errors: Record<string, string>) => void;
  children?: ReactNode;
  className?: string;
}

export function VertMForm({
  form,
  layout = 'vertical',
  onFinish,
  onFinishFailed,
  children,
  className = '',
}: FormProps) {
  const internalStore = useRef<FormStore | null>(null);
  if (!internalStore.current) internalStore.current = createFormStore();
  const store = form?._store ?? internalStore.current;
  const [errors, setErrors] = useState<Record<string, string>>({});

  useFormStore(store);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await store.validate();
      setErrors({});
      onFinish?.(result);
    } catch (err) {
      const fieldErrors = err as Record<string, string>;
      setErrors(fieldErrors);
      onFinishFailed?.(fieldErrors);
    }
  };

  return (
    <FormContext.Provider value={{ store, errors, layout }}>
      <form
        className={`vertm-form vertm-form--${layout} vertm-vertical ${className}`.trim()}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export interface FormItemProps {
  name: string;
  label?: ReactNode;
  rules?: Rule[];
  /** Show required marker; defaults to `true` when any rule has `required`. */
  required?: boolean;
  children?: ReactElement;
  className?: string;
}

function isFieldRequired(rules: Rule[], required?: boolean): boolean {
  if (required != null) return required;
  return rules.some((rule) => rule.required);
}

export function FormItem({
  name,
  label,
  rules = [],
  required,
  children,
  className = '',
}: FormItemProps) {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('Form.Item must be used inside Form');

  ctx.store.registerRules(name, rules);
  const error = ctx.errors[name];
  const value = ctx.store.getValues()[name];
  const showRequired = isFieldRequired(rules, required);

  let control: ReactNode = children;
  if (isValidElement(children)) {
    const props = children.props as { value?: unknown; onChange?: (v: unknown) => void };
    control = cloneElement(children, {
      value: props.value ?? value,
      onChange: (v: unknown) => {
        const val =
          typeof v === 'object' && v !== null && 'target' in v
            ? (v as { target: { value: unknown } }).target.value
            : v;
        ctx.store.setFieldValue(name, val);
        props.onChange?.(v);
      },
    } as Record<string, unknown>);
  }

  return (
    <div
      className={`vertm-form-item vertm-vertical ${error ? 'vertm-form-item--error' : ''} ${className}`.trim()}
    >
      {label && (
        <label className="vertm-form-item__label">
          {showRequired && (
            <span className="vertm-form-item__required" aria-hidden="true">
              *
            </span>
          )}
          {typeof label === 'string' ? <VertMText as="span" text={label} /> : label}
        </label>
      )}
      <div className="vertm-form-item__control">{control}</div>
      {error && <div className="vertm-form-item__error">{error}</div>}
    </div>
  );
}

VertMForm.Item = FormItem;
VertMForm.useForm = useForm;
