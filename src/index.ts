// ─── Atoms ────────────────────────────────────────────────────────────────────
export { Button, buttonVariants }       from "./components/atoms/Button";
export type { ButtonProps }             from "./components/atoms/Button";

export { Badge, StatusBadge }           from "./components/atoms/Badge";
export type { BadgeProps, BadgeVariant, BadgeSize, StatusBadgeProps, StatusType } from "./components/atoms/Badge";

export { Label, labelVariants }         from "./components/atoms/Label";
export type { LabelProps }              from "./components/atoms/Label";

export { Separator }                    from "./components/atoms/Separator";
export type { SeparatorProps }          from "./components/atoms/Separator";

export { Input, InputGroup }            from "./components/atoms/Input";
export type { InputProps, InputGroupProps } from "./components/atoms/Input";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/atoms/Tabs";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./components/atoms/Tabs";

export { Tooltip }                      from "./components/atoms/Tooltip";
export type { TooltipProps }            from "./components/atoms/Tooltip";

export { Alert, AlertTitle, AlertDescription } from "./components/atoms/Alert";
export type { AlertProps } from "./components/atoms/Alert";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./components/atoms/Avatar";
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarGroupProps } from "./components/atoms/Avatar";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from "./components/atoms/Card";
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from "./components/atoms/Card";

export { Checkbox, CheckboxWithLabel, CheckboxGroup } from "./components/atoms/Checkbox";
export type { CheckboxProps, CheckboxWithLabelProps, CheckboxGroupProps } from "./components/atoms/Checkbox";

export { CurrencyInput } from "./components/atoms/CurrencyInput";
export type { CurrencyInputProps } from "./components/atoms/CurrencyInput";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./components/atoms/Dialog";
export type { DialogProps, DialogTriggerProps, DialogContentProps, DialogCloseProps } from "./components/atoms/Dialog";

export { Pagination } from "./components/atoms/Pagination";
export type { PaginationProps } from "./components/atoms/Pagination";

export { PercentageInput } from "./components/atoms/PercentageInput";
export type { PercentageInputProps } from "./components/atoms/PercentageInput";

export { ProductImage } from "./components/atoms/ProductImage";
export type { ProductImageProps } from "./components/atoms/ProductImage";

export { Progress } from "./components/atoms/Progress";
export type { ProgressProps } from "./components/atoms/Progress";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "./components/atoms/Select";
export type { SelectProps, SelectTriggerProps, SelectValueProps, SelectContentProps, SelectItemProps, SelectGroupProps } from "./components/atoms/Select";

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "./components/atoms/Sheet";
export type { SheetProps, SheetTriggerProps, SheetContentProps, SheetCloseProps } from "./components/atoms/Sheet";

export { Slider } from "./components/atoms/Slider";
export type { SliderProps } from "./components/atoms/Slider";

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

// ─── Mobile ───────────────────────────────────────────────────────────────────
export { MobileBottomNav } from "./components/mobile/MobileBottomNav";
export type { MobileBottomNavItem, MobileBottomNavProps } from "./components/mobile/MobileBottomNav";

export { MobileTopBar } from "./components/mobile/MobileTopBar";
export type { MobileTopBarProps } from "./components/mobile/MobileTopBar";

export { FilterBottomSheet } from "./components/mobile/FilterBottomSheet";
export type { FilterBottomSheetProps } from "./components/mobile/FilterBottomSheet";

export { ScrollChipFilter } from "./components/mobile/ScrollChipFilter";
export type { ScrollChipItem, ScrollChipFilterProps } from "./components/mobile/ScrollChipFilter";

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
