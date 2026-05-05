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

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from "./components/atoms/Card";
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from "./components/atoms/Card";

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

export { TagsInput } from "./components/atoms/TagsInput";
export type { TagsInputProps } from "./components/atoms/TagsInput";

export { Textarea } from "./components/atoms/Textarea";
export type { TextareaProps } from "./components/atoms/Textarea";

export { Toggle } from "./components/atoms/Toggle";
export type { ToggleProps } from "./components/atoms/Toggle";

export { ToggleGroup, ToggleGroupItem } from "./components/atoms/ToggleGroup";
export type { ToggleGroupProps, ToggleGroupItemProps } from "./components/atoms/ToggleGroup";

export { Toaster, toast, useToast, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "./components/atoms/Toast";
export type { ToasterToast } from "./components/atoms/Toast";

// ─── Mobile ───────────────────────────────────────────────────────────────────
export { MobileBottomNav } from "./components/mobile/MobileBottomNav";
export type { MobileBottomNavItem, MobileBottomNavProps } from "./components/mobile/MobileBottomNav";

export { MobileTopBar } from "./components/mobile/MobileTopBar";
export type { MobileTopBarProps } from "./components/mobile/MobileTopBar";

export { ActionBar } from "./components/mobile/ActionBar";
export type { ActionBarProps, ActionBarAction } from "./components/mobile/ActionBar";

export { FilterBottomSheet } from "./components/mobile/FilterBottomSheet";
export type { FilterBottomSheetProps } from "./components/mobile/FilterBottomSheet";

export { ScrollChipFilter } from "./components/mobile/ScrollChipFilter";
export type { ScrollChipItem, ScrollChipFilterProps } from "./components/mobile/ScrollChipFilter";

// ─── Molecules ────────────────────────────────────────────────────────────────
export { EmptyState } from "./components/molecules/EmptyState";
export type { EmptyStateProps, EmptyStateAction } from "./components/molecules/EmptyState";

export { SearchInput } from "./components/molecules/SearchInput";
export type { SearchInputProps } from "./components/molecules/SearchInput";

export { StatCard } from "./components/molecules/StatCard";
export type { StatCardProps, StatCardTrend } from "./components/molecules/StatCard";

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

// ─── Utils ────────────────────────────────────────────────────────────────────
export { cn, formatFileSize }           from "./lib/utils";
export { useIsMobile } from "./lib/hooks/useIsMobile";
