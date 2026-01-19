export type TableData = {
  id: string;
  label: string;
  value: number;
  originalValue?: number;
  children: {
    id: string;
    label: string;
    value: number;
    originalValue?: number;
  }[];
};
