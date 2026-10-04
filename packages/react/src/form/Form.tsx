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
import { createFormStore, type FormStore, type Rule } from '@vertm/core';
import { VertMText } from '../VertMText.js';
import { useIsVertical } from '../config/context.js';

export type { Rule } from '@vertm/core';

type FormLayout = 'vertical' | 'horizontal';

export interface FormInstance {
  getFieldValue: (name: string) => unknown;
  getFieldsValue: () => Record<string, unknown>;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldsValue: (values: Record<string, unknown>) => void;
  validateFields: () => Promise<Record<string, unknown>>;
  resetFields: () => void;
  _store: FormStore;
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
  /** 表单实例，由 useForm 创建 */
  form?: FormInstance;
  /** 表单项布局方向 @default 'vertical' */
  layout?: FormLayout;
  /** 校验通过并提交时的回调 */
  onFinish?: (values: Record<string, unknown>) => void;
  /** 校验失败时的回调 */
  onFinishFailed?: (errors: Record<string, string>) => void;
  /** 表单内容，通常为 Form.Item */
  children?: ReactNode;
  /** 自定义类名 */
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
  const isVerticalWriting = useIsVertical();

  useFormStore(store);

  useEffect(() => store.subscribeReset(() => setErrors({})), [store]);

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
        className={[
          'vertm-form',
          `vertm-form--${layout}`,
          isVerticalWriting && 'vertm-form--vertical-writing',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export interface FormItemProps {
  /** 字段名，对应表单值的 key */
  name: string;
  /** 字段标签 */
  label?: ReactNode;
  /** 校验规则列表 @default [] */
  rules?: Rule[];
  /** 是否显示必填标记；有 required 规则时默认为 true */
  required?: boolean;
  /** 字段下方的帮助文案（有校验错误时由错误信息替换） */
  help?: ReactNode;
  /** 字段额外说明，始终显示在 help/error 之后 */
  extra?: ReactNode;
  /** 表单控件，需能接收 value / onChange */
  children?: ReactElement;
  /** 自定义类名 */
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
  help,
  extra,
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
      className={`vertm-form-item ${error ? 'vertm-form-item--error' : ''} ${className}`.trim()}
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
      {error ? (
        <div className="vertm-form-item__error" role="alert">
          {typeof error === 'string' ? <VertMText as="span" text={error} /> : error}
        </div>
      ) : (
        help && (
          <div className="vertm-form-item__help">
            {typeof help === 'string' ? <VertMText as="span" text={help} /> : help}
          </div>
        )
      )}
      {extra && (
        <div className="vertm-form-item__extra">
          {typeof extra === 'string' ? <VertMText as="span" text={extra} /> : extra}
        </div>
      )}
    </div>
  );
}

VertMForm.Item = FormItem;
VertMForm.useForm = useForm;
