// ─── Atoms ────────────────────────────────────────────────────────────────────
export { Button, buttonVariants }       from "./components/atoms/Button";
export type { ButtonProps }             from "./components/atoms/Button";

export { Badge, StatusBadge }           from "./components/atoms/Badge";
export type { BadgeProps, BadgeVariant, BadgeSize, StatusBadgeProps, StatusType } from "./components/atoms/Badge";

export { StarRating }                   from "./components/atoms/StarRating";
export type { StarRatingProps, StarRatingSize } from "./components/atoms/StarRating";

export { Label, labelVariants }         from "./components/atoms/Label";
export type { LabelProps }              from "./components/atoms/Label";

export { Separator }                    from "./components/atoms/Separator";
export type { SeparatorProps }          from "./components/atoms/Separator";

export { Input, InputGroup }            from "./components/atoms/Input";
export type { InputProps, InputGroupProps } from "./components/atoms/Input";

export { InputAffixField } from "./components/atoms/InputAffixField";
export type { InputAffixFieldProps } from "./components/atoms/InputAffixField";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/atoms/Tabs";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./components/atoms/Tabs";

export { Tooltip }                      from "./components/atoms/Tooltip";
export type { TooltipProps }            from "./components/atoms/Tooltip";

export { Alert, AlertTitle, AlertDescription } from "./components/atoms/Alert";
export type { AlertProps } from "./components/atoms/Alert";

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from "./components/atoms/AlertDialog";
export type { AlertDialogProps, AlertDialogContentProps } from "./components/atoms/AlertDialog";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./components/atoms/Avatar";
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarGroupProps } from "./components/atoms/Avatar";

export { Card, CardHeader, CardIconHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from "./components/atoms/Card";
export type { CardProps, CardHeaderProps, CardIconHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from "./components/atoms/Card";

export { AccordionCard } from "./components/atoms/AccordionCard";
export type { AccordionCardProps, AccordionCardState } from "./components/atoms/AccordionCard";

export { SelectableCard } from "./components/atoms/SelectableCard";
export type { SelectableCardProps, SelectableCardLayout, SelectableCardTone } from "./components/atoms/SelectableCard";

export { FileUpload } from "./components/atoms/FileUpload";
export type { FileUploadProps, UploadedFile } from "./components/atoms/FileUpload";

export { CategoryCard } from "./components/atoms/CategoryCard";
export type { CategoryCardProps, CategoryCardCategory } from "./components/atoms/CategoryCard";

export { DocumentUploadCard } from "./components/atoms/DocumentUploadCard";
export type { DocumentUploadCardProps, DocumentUploadStatus } from "./components/atoms/DocumentUploadCard";

export { Checkbox, CheckboxWithLabel, CheckboxGroup } from "./components/atoms/Checkbox";
export type { CheckboxProps, CheckboxWithLabelProps, CheckboxGroupProps } from "./components/atoms/Checkbox";

export { CurrencyInput } from "./components/atoms/CurrencyInput";
export type { CurrencyInputProps } from "./components/atoms/CurrencyInput";

export { DateInput, DateRangeInput } from "./components/atoms/DateInput";
export type { DateInputProps, DateRangeInputProps } from "./components/atoms/DateInput";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./components/atoms/Dialog";
export type { DialogProps, DialogTriggerProps, DialogContentProps, DialogCloseProps } from "./components/atoms/Dialog";

export { ConfirmDialog } from "./components/atoms/ConfirmDialog";
export type { ConfirmDialogProps } from "./components/atoms/ConfirmDialog";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./components/atoms/Popover";
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverAlign, PopoverSide } from "./components/atoms/Popover";

export { Pagination } from "./components/atoms/Pagination";
export type { PaginationProps } from "./components/atoms/Pagination";

export { PercentageInput } from "./components/atoms/PercentageInput";
export type { PercentageInputProps } from "./components/atoms/PercentageInput";

export { ProductImage } from "./components/atoms/ProductImage";
export type { ProductImageProps } from "./components/atoms/ProductImage";

export { Progress } from "./components/atoms/Progress";
export type { ProgressProps } from "./components/atoms/Progress";

export { RadioGroup, RadioGroupItem } from "./components/atoms/RadioGroup";
export type { RadioGroupProps, RadioGroupItemProps } from "./components/atoms/RadioGroup";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "./components/atoms/Select";
export type { SelectProps, SelectTriggerProps, SelectValueProps, SelectContentProps, SelectItemProps, SelectGroupProps } from "./components/atoms/Select";

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "./components/atoms/Sheet";
export type { SheetProps, SheetTriggerProps, SheetContentProps, SheetCloseProps } from "./components/atoms/Sheet";

export { Slider } from "./components/atoms/Slider";
export type { SliderProps } from "./components/atoms/Slider";

export { Stepper, StepperContent, StepperFooter } from "./components/atoms/Stepper";
export type { StepperProps, StepperContentProps, StepperFooterProps, Step, StepStatus } from "./components/atoms/Stepper";

export { Switch } from "./components/atoms/Switch";
export type { SwitchProps } from "./components/atoms/Switch";

export { Table } from "./components/atoms/Table";
export type { TableProps, Column } from "./components/atoms/Table";

export { MobileCardList } from "./components/atoms/MobileCardList";
export type { MobileCardListProps } from "./components/atoms/MobileCardList";

export { TagsInput } from "./components/atoms/TagsInput";
export type { TagsInputProps } from "./components/atoms/TagsInput";

export { Textarea } from "./components/atoms/Textarea";
export type { TextareaProps } from "./components/atoms/Textarea";

export { Spinner, LoadingSpinner } from "./components/atoms/Spinner";
export type { SpinnerProps, SpinnerSize, SpinnerVariant, LoadingSpinnerProps } from "./components/atoms/Spinner";

export { PasswordStrengthIndicator } from "./components/atoms/PasswordStrengthIndicator";
export type { PasswordStrengthIndicatorProps } from "./components/atoms/PasswordStrengthIndicator";

export { Toggle } from "./components/atoms/Toggle";
export type { ToggleProps } from "./components/atoms/Toggle";

export { ToggleGroup, ToggleGroupItem } from "./components/atoms/ToggleGroup";
export type { ToggleGroupProps, ToggleGroupItemProps } from "./components/atoms/ToggleGroup";

export { Toaster, toast, useToast, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "./components/atoms/Toast";
export type { ToasterToast } from "./components/atoms/Toast";

// ─── Mobile ───────────────────────────────────────────────────────────────────
export { MobileTopBar } from "./components/mobile/MobileTopBar";
export type { MobileTopBarProps } from "./components/mobile/MobileTopBar";

export { ActionBar } from "./components/mobile/ActionBar";
export type { ActionBarProps, ActionBarAction } from "./components/mobile/ActionBar";

export { FilterBottomSheet } from "./components/mobile/FilterBottomSheet";
export type { FilterBottomSheetProps } from "./components/mobile/FilterBottomSheet";

export { ScrollChipFilter } from "./components/mobile/ScrollChipFilter";
export type { ScrollChipItem, ScrollChipFilterProps } from "./components/mobile/ScrollChipFilter";

export { MobileScrollSlider } from "./components/mobile/MobileScrollSlider";
export type { MobileScrollSliderProps } from "./components/mobile/MobileScrollSlider";

export { SwipeableRow } from "./components/mobile/SwipeableRow";
export type { SwipeableRowProps, SwipeAction } from "./components/mobile/SwipeableRow";

// Alias de descubribilidad: MobileScrollSlider cubre el caso de uso de "carrusel"
// móvil (testimonios, galerías de producto, onboarding). No duplica lógica.
export { MobileScrollSlider as Carousel } from "./components/mobile/MobileScrollSlider";
export type { MobileScrollSliderProps as CarouselProps } from "./components/mobile/MobileScrollSlider";

// ─── Molecules ────────────────────────────────────────────────────────────────
export { EmptyState } from "./components/molecules/EmptyState";
export type { EmptyStateProps, EmptyStateAction } from "./components/molecules/EmptyState";

export { SearchInput } from "./components/molecules/SearchInput";
export type { SearchInputProps } from "./components/molecules/SearchInput";

export { StatCard } from "./components/molecules/StatCard";
export type { StatCardProps, StatCardTrend } from "./components/molecules/StatCard";

export { StatGrid } from "./components/molecules/StatGrid";
export type { StatGridProps, StatGridItem } from "./components/molecules/StatGrid";

export { StatHighlightCard } from "./components/molecules/StatHighlightCard";
export type { StatHighlightCardProps, StatHighlightCardGradient } from "./components/molecules/StatHighlightCard";

export { PageContainer } from "./components/molecules/PageContainer";
export type { PageContainerProps, PageContainerVariant } from "./components/molecules/PageContainer";

export { PageHeader } from "./components/molecules/PageHeader";
export type { PageHeaderProps } from "./components/molecules/PageHeader";

export { AuthFooter } from "./components/molecules/AuthFooter";
export type { AuthFooterProps, AuthFooterVariant } from "./components/molecules/AuthFooter";

export { ReviewSummary } from "./components/molecules/ReviewSummary";
export type { ReviewSummaryProps, ReviewSummaryBreakdownItem } from "./components/molecules/ReviewSummary";

export { ActiveFilterChips } from "./components/molecules/ActiveFilterChips";
export type { ActiveFilterChipsProps, ActiveFilterChip } from "./components/molecules/ActiveFilterChips";

export { FilterSheet } from "./components/molecules/FilterSheet";
export type { FilterSheetProps } from "./components/molecules/FilterSheet";

export { FilterPanel } from "./components/molecules/FilterPanel";
export type { FilterPanelProps } from "./components/molecules/FilterPanel";
export type { FilterSection, ChipOption, ToggleOption } from "./components/molecules/FilterPanel/FilterPanel.sections";

export { FilterToolbar } from "./components/molecules/FilterToolbar";
export type { FilterToolbarProps } from "./components/molecules/FilterToolbar";

// ─── Icons ────────────────────────────────────────────────────────────────────
export {
	OrigenLeafIcon,
	OrigenSproutIcon,
	OrigenCartIcon,
	OrigenHeartIcon,
	OrigenStarIcon,
	OrigenVerifiedBadgeIcon,
	OrigenEmptyStateIllustration,
} from "./components/icons";

// ─── Validations ──────────────────────────────────────────────────────────────
export {
	IMAGE_QUALITY_PRESETS,
	formatImageDimensions,
	getImageQualityHint,
	buildImageResolutionError,
	isImageFile,
	getImageDimensions,
} from "./lib/validations/image-quality";
export type { ImageDimensions, ImageQualityRequirement } from "./lib/validations/image-quality";

// ─── Utils ────────────────────────────────────────────────────────────────────
export { cn, formatFileSize }           from "./lib/utils";
export { useIsMobile } from "./lib/hooks/useIsMobile";
export { useSafeArea } from "./lib/hooks/useSafeArea";
export type { SafeAreaInsets } from "./lib/hooks/useSafeArea";
export { useReducedMotion } from "./lib/hooks/useReducedMotion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
export {
  tokens,
  colors,
  rawColors,
  shadows,
  gradients,
  typography,
  radius,
} from "./tokens";
export type {
  ColorToken,
  RawColorToken,
  ShadowToken,
  GradientToken,
} from "./tokens";
