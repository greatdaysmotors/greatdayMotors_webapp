import { IconType } from "react-icons";

export interface UserDetailProps {
  name: string;
  detail: string;
  detailEditLabel?: string;
  Icon?: IconType;
  EditIcon?: IconType | null;
  iconSize?: number;
  editIconSize?: number;
  editIconColor?: string;
  inputLabel?: string;
  onDetailChange?: (detail: string) => void;
  selectOptions?: string[];
}