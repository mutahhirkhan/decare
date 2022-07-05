import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from 'react-router-dom';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hooks
export const useQuery = () => new URLSearchParams(useLocation().search);
export const usePathname = () => useLocation().pathname;
export const useHistory = () => useHistory();

export const usePathnameWithoutQuery = () => {
    const pathname = usePathname();
    const query = useQuery();
    return query.length ? `${pathname}?${query.toString()}` : pathname;
}

export const usePathnameWithQuery = (query) => {
    const pathname = usePathname();
    return `${pathname}?${query}`;
}

export const usePathnameWithQueryWithoutHash = (query) => {
    const pathname = usePathname();
    return `${pathname}?${query}`;
}

export const usePathnameWithQueryAndHash = (query, hash) => {
    const pathname = usePathname();
    return `${pathname}?${query}#${hash}`;
}
