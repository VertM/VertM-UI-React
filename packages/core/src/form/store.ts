export interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (value: unknown) => Promise<void> | void;
}

export interface FormValidateMessages {
  required: string;
  pattern: string;
  validator: string;
}

export const DEFAULT_VALIDATE_MESSAGES: FormValidateMessages = {
  required: 'Required field',
  pattern: 'Invalid format',
  validator: 'Validation failed',
};

export interface FormStoreOptions {
  messages?: Partial<FormValidateMessages>;
}

export interface FormStore {
  getValues: () => Record<string, unknown>;
  getRules: () => Record<string, Rule[]>;
  subscribe: (listener: () => void) => () => void;
  /** Notified on `reset()` so the owning Form can drop its validation errors. */
  subscribeReset: (listener: () => void) => () => void;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldsValue: (values: Record<string, unknown>) => void;
  registerRules: (name: string, rules: Rule[]) => void;
  validate: () => Promise<Record<string, unknown>>;
  reset: () => void;
}

export function createFormStore(options?: FormStoreOptions): FormStore {
  let values: Record<string, unknown> = {};
  let rules: Record<string, Rule[]> = {};
  const listeners = new Set<() => void>();
  const resetListeners = new Set<() => void>();
  const notify = () => listeners.forEach((l) => l());
  const messages = { ...DEFAULT_VALIDATE_MESSAGES, ...options?.messages };

  return {
    getValues: () => values,
    getRules: () => rules,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    subscribeReset: (listener) => {
      resetListeners.add(listener);
      return () => resetListeners.delete(listener);
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
            errors[name] = rule.message ?? messages.required;
            break;
          }
          if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
            errors[name] = rule.message ?? messages.pattern;
            break;
          }
          if (rule.validator) {
            try {
              await rule.validator(value);
            } catch {
              errors[name] = rule.message ?? messages.validator;
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
      resetListeners.forEach((l) => l());
      notify();
    },
  };
}
