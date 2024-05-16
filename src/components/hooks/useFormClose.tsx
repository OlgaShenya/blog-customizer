import { useEffect, useRef, useState } from 'react';

export const useFormClose = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const onClick = (event: MouseEvent) => {
		event.stopPropagation();
		if (event.target instanceof Node && !ref.current?.contains(event.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) document.addEventListener('mousedown', onClick);
		else document.removeEventListener('mousedown', onClick);
		return () => document.removeEventListener('mousedown', onClick);
	}, [open]);

	return { open, setOpen, formContainerRef: ref };
};
