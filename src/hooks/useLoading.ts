import loading from "@/store/common/loading";
import { useAppSelector } from "./useAppSelector";

export function useLoading(keys: string | string[]) {
  const loadings = useAppSelector('loading');
  return Array.isArray(keys) ? keys.every(key => loadings[key]) : loadings[keys];
}