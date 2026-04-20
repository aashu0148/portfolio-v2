import * as React from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CollapsibleContextType {
	isOpen: boolean;
	toggle: () => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(undefined);

const useCollapsible = () => {
	const context = React.useContext(CollapsibleContext);
	if (!context) {
		throw new Error('useCollapsible must be used within a Collapsible component');
	}
	return context;
};

interface CollapsibleProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	className?: string;
	triggerTitle?: string;
	triggerClassName?: string;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
	(
		{
			children,
			defaultOpen = false,
			open,
			onOpenChange,
			className,
			triggerTitle,
			triggerClassName,
			...props
		},
		ref
	) => {
		const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

		const isControlled = open !== undefined;
		const isOpen = isControlled ? open : internalOpen;

		const setIsOpen = React.useCallback(
			(newOpen: boolean) => {
				if (!isControlled) {
					setInternalOpen(newOpen);
				}
				onOpenChange?.(newOpen);
			},
			[isControlled, onOpenChange]
		);

		const toggle = React.useCallback(() => {
			setIsOpen(!isOpen);
		}, [isOpen, setIsOpen]);

		const contextValue = React.useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

		return (
			<CollapsibleContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={cn(className)}
					{...props}
				>
					{triggerTitle ? (
						<CollapsibleTrigger className={cn('flex items-center gap-2', triggerClassName)}>
							<p>{triggerTitle}</p>
							<ChevronDown
								className={cn('size-4 transition-transform', isOpen ? 'rotate-180' : '')}
							/>
						</CollapsibleTrigger>
					) : null}
					{children}
				</div>
			</CollapsibleContext.Provider>
		);
	}
);
Collapsible.displayName = 'Collapsible';

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
	({ children, className, onClick, asChild = false, ...props }, ref) => {
		const { toggle } = useCollapsible();

		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			toggle();
			onClick?.(e);
			// Prevent default focus of trigger element after click happened
			e.currentTarget.blur();
		};

		if (asChild) {
			return (
				<span
					ref={ref as React.Ref<HTMLSpanElement>}
					onClick={(e) => {
						toggle();
						e.currentTarget.blur();
					}}
					className={cn('contents', className)}
				>
					{children}
				</span>
			);
		}

		return (
			<button
				ref={ref}
				className={cn(className)}
				onClick={handleClick}
				{...props}
			>
				{children}
			</button>
		);
	}
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
	({ children, className, ...props }, ref) => {
		const { isOpen } = useCollapsible();

		return (
			<div
				ref={ref}
				className={cn(
					'grid overflow-hidden transition-all duration-300 ease-in-out',
					isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				)}
				{...props}
			>
				<div className={cn('flex min-h-0 flex-col', className)}>{children}</div>
			</div>
		);
	}
);
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleContent, CollapsibleTrigger, useCollapsible };
