import { RefObject, useEffect } from 'react';
import { useLatest } from './useLatest';

// отслеживает клики вне элемента и запускает обработчик

export function useOutsideClick(elementRef: RefObject<HTMLElement>, handler: ()=>void, attached = true) {
	const latestHandler = useLatest<()=>void>(handler);

	useEffect(() => {
		if (!attached) return;

		const handleClick = (event: MouseEvent) => {
			if (!elementRef.current) return;
			if (!elementRef.current.contains(event.target as Node)) {
				latestHandler.current();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [elementRef, latestHandler, attached]);
}