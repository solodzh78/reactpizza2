import { useRef, useEffect, useCallback } from 'react';

export function useIsFirstRenderEffect(cb: () => void, deps: any[]) {
	const isFirstRender = useRef(true);

	const callback = useCallback(cb, [cb]);
	useEffect(() => {
		callback();
		isFirstRender.current = false;
		return () => {
			isFirstRender.current = true;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, callback]);

	return isFirstRender;
}