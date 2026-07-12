// ── VertM UI core exports ──
export {
  VertMConfigProvider,
  useVertMConfig,
  useIsVertical,
  defaultVertMConfig,
  type VertMConfigProviderProps,
  type VertMConfig,
  type VertMLocale,
} from './config/index.js';

export {
  Typography,
  Title,
  Text,
  Paragraph,
  Link,
  type TypographyType,
  type TitleProps,
  type TextProps,
  type ParagraphProps,
  type LinkProps,
} from './typography/index.js';

export {
  registerFont,
  useRegisterFont,
  type RegisterFontOptions,
} from './registerFont.js';

export {
  FONT_PRESETS,
  DEFAULT_FONT_FAMILY,
  resolveFontFamily,
  type FontPreset,
  type FontPresetId,
} from '@vertm/tokens';

export { VertMText, type VertMTextProps } from './VertMText.js';
export {
  VertMTextField,
  VertMTextFieldBare,
  type VertMTextFieldProps,
  type VertMTextFieldVariant,
} from './VertMTextField.js';
export { VertMList, type VertMListProps, type VertMListItem } from './VertMList.js';

// ── Phase 1 components ──
export { computeOverlayPosition, Overlay, Tooltip, Portal, type Placement, type OverlayProps, type TooltipProps, type TriggerType } from './overlay/index.js';
export { VertMButton, type ButtonProps, type ButtonGroupProps, type ButtonType, type ButtonSize } from './button/index.js';
export { VertMInput, VertMSearch, type InputProps, type TextAreaProps, type SearchProps, type InputStatus } from './input/index.js';
export { VertMSpace, type SpaceProps, type SpaceDirection } from './space/Space.js';
export { VertMDivider, type DividerProps, type DividerPlacement, type DividerOrientation } from './divider/Divider.js';
export { VertMTag, CheckableTag, type TagProps, type CheckableTagProps, type PresetTagColor } from './tag/Tag.js';
export { VertMCheckbox, type CheckboxProps, type CheckboxGroupProps, type CheckboxOption } from './checkbox/Checkbox.js';
export { VertMRadio, type RadioProps, type RadioGroupProps, type RadioOption } from './radio/Radio.js';
export { VertMSwitch, type SwitchProps } from './switch/Switch.js';
export { VertMSelect, VertMAutoComplete, type SelectProps, type SelectOption } from './select/Select.js';
export { VertMForm, useForm, type FormProps, type FormItemProps, type FormInstance, type Rule } from './form/Form.js';
export { VertMAlert, type AlertProps, type AlertType } from './alert/Alert.js';
export { VertMSpin, type SpinProps } from './spin/Spin.js';
export { VertMProgress, type ProgressProps, type ProgressStatus } from './progress/Progress.js';
export { VertMSkeleton, type SkeletonProps } from './skeleton/Skeleton.js';
export { VertMResult, type ResultProps, type ResultStatus } from './result/Result.js';
export { VertMEmpty, type EmptyProps } from './empty/Empty.js';
export { message, useMessage, MessageHolder, type MessageConfig, type MessageType } from './message/Message.js';
export { notification, type NotificationConfig, type NotificationPlacement } from './notification/Notification.js';
export { VertMPopover, type PopoverProps } from './popover/Popover.js';
export { VertMPopconfirm, type PopconfirmProps } from './popconfirm/Popconfirm.js';
export { VertMModal, type ModalProps } from './modal/Modal.js';
export { VertMDrawer, type DrawerProps, type DrawerPlacement } from './drawer/Drawer.js';

// ── antd-style aliases ──
export { VertMConfigProvider as ConfigProvider } from './config/index.js';
export { VertMButton as Button } from './button/index.js';
export { VertMInput as Input } from './input/index.js';
