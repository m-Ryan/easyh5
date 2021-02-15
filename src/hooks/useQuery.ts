import { useLocation, useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import qs from 'qs';

export function useQuery<T extends { [key: string]: any; }>(): T & {
	patchQuery: (params: T) => string;
} {
	const history = useHistory();
	const location = useLocation();

	const query = useMemo(() => {
		return qs.parse(location.search, {
			ignoreQueryPrefix: true,
		}) as any as { [key: string]: any; };
	}, [location]);

	const patchQuery = (params: T) => {
		const newSearch = qs.stringify(
			{
				...query,
				...params,
			},
			{
				addQueryPrefix: true,
			}
		);

		history.push({
			search: newSearch,
		});
		return newSearch;
	};

	return { ...query, patchQuery };
}