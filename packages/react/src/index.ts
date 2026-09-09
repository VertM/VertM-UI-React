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
export { VertMList, type VertMListProps, type VertMListItem, type ListGrid } from './list/List.js';

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
export {
  message,
  useMessage,
  MessageHolder,
  type MessageAPI,
  type MessageConfig,
  type MessageType,
} from './message/Message.js';
export {
  notification,
  useNotification,
  NotificationHolder,
  type NotificationAPI,
  type NotificationConfig,
  type NotificationPlacement,
} from './notification/Notification.js';
export { VertMPopover, type PopoverProps } from './popover/Popover.js';
export { VertMPopconfirm, type PopconfirmProps } from './popconfirm/Popconfirm.js';
export {
  VertMModal,
  modal,
  useModal,
  ModalHolder,
  type ModalProps,
  type ModalAPI,
  type ModalFuncConfig,
  type ModalFuncReturn,
  type ConfirmType,
} from './modal/index.js';
export {
  VertMApp,
  useApp,
  type AppProps,
  type AppContextValue,
} from './app/App.js';
export { VertMDrawer, type DrawerProps, type DrawerPlacement } from './drawer/Drawer.js';

// ── Phase 2 components ──
export {
  VertMLayout,
  type LayoutProps,
  type HeaderProps,
  type FooterProps,
  type ContentProps,
  type SiderProps,
} from './layout/Layout.js';
export {
  VertMRow,
  VertMCol,
  type RowProps,
  type ColProps,
  type RowJustify,
  type RowAlign,
} from './grid/Grid.js';
export {
  VertMFlex,
  type FlexProps,
  type FlexJustify,
  type FlexAlign,
} from './flex/Flex.js';
export {
  VertMCard,
  type CardProps,
  type CardMetaProps,
  type CardGridProps,
} from './card/Card.js';
export { useBreakpoint, BREAKPOINTS, type Breakpoint, type BreakpointMap } from './hooks/useBreakpoint.js';
export {
  VertMMenu,
  type MenuProps,
  type MenuItemProps,
  type SubMenuProps,
  type MenuItemType,
  type MenuArrowConfig,
  type MenuExpandIconRender,
} from './menu/Menu.js';
export type { MenuMode, MenuSelectInfo } from './menu/types.js';
export {
  VertMTabs,
  type TabsProps,
  type TabItem,
  type TabsType,
  type TabPosition,
  type TabsEditableConfig,
} from './tabs/Tabs.js';
export {
  VertMDropdown,
  type DropdownProps,
  type DropdownMenuConfig,
  type DropdownButtonProps,
  type DropdownOpenChangeInfo,
  type DropdownArrowConfig,
} from './dropdown/Dropdown.js';
export {
  VertMBreadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItem,
  type BreadcrumbItemType,
  type BreadcrumbRouteItem,
  type BreadcrumbSeparatorItem,
  type BreadcrumbMenuConfig,
  type BreadcrumbMenuItem,
  type BreadcrumbDirection,
  type BreadcrumbSemanticClassNames,
  type BreadcrumbSemanticStyles,
  type BreadcrumbItemProps,
  type BreadcrumbSeparatorProps,
} from './breadcrumb/Breadcrumb.js';
export {
  VertMPagination,
  type PaginationProps,
  type PaginationLayout,
} from './pagination/Pagination.js';
export { VertMSteps, type StepsProps, type StepItem, type StepStatus, type StepsDirection } from './steps/Steps.js';
export { VertMCollapse, type CollapseProps, type CollapsePanel } from './collapse/Collapse.js';
export { VertMDescriptions, type DescriptionsProps, type DescriptionItem } from './descriptions/Descriptions.js';
export { VertMAvatar, type AvatarProps, type AvatarGroupProps, type AvatarSize, type AvatarShape } from './avatar/Avatar.js';
export { VertMBadge, type BadgeProps, type BadgeStatus } from './badge/Badge.js';
export { VertMStatistic, type StatisticProps, type CountdownProps } from './statistic/Statistic.js';
export { VertMTimeline, type TimelineProps, type TimelineItem } from './timeline/Timeline.js';
export { VertMSegmented, type SegmentedProps, type SegmentedOption } from './segmented/Segmented.js';
export { VertMAnchor, type AnchorProps, type AnchorItem } from './anchor/Anchor.js';
export { VertMSplitter, type SplitterProps, type SplitterPanelProps } from './splitter/Splitter.js';

// ── antd-style aliases ──
export { VertMConfigProvider as ConfigProvider } from './config/index.js';
export { VertMButton as Button } from './button/index.js';
export { VertMInput as Input } from './input/index.js';
export { VertMModal as Modal } from './modal/index.js';
export { VertMApp as App } from './app/App.js';
