"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Chart = React.forwardRef(function Chart({ className, ...props }, ref) {
	return <div ref={ref} className={cn("space-y-3", className)} {...props} />;
});
Chart.displayName = "Chart";

const ChartContainer = React.forwardRef(function ChartContainer(
	{ className, ...props },
	ref
) {
	return <div ref={ref} className={cn("h-[350px]", className)} {...props} />;
});
ChartContainer.displayName = "ChartContainer";

const ChartTitle = React.forwardRef(function ChartTitle(
	{ className, ...props },
	ref
) {
	return (
		<h3
			ref={ref}
			className={cn("font-semibold tracking-tight", className)}
			{...props}
		/>
	);
});
ChartTitle.displayName = "ChartTitle";

const ChartDescription = React.forwardRef(function ChartDescription(
	{ className, ...props },
	ref
) {
	return (
		<p
			ref={ref}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
});
ChartDescription.displayName = "ChartDescription";

const ChartHeader = React.forwardRef(function ChartHeader(
	{ className, ...props },
	ref
) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col space-y-1.5", className)}
			{...props}
		/>
	);
});
ChartHeader.displayName = "ChartHeader";

const ChartLegend = React.forwardRef(function ChartLegend(
	{ className, ...props },
	ref
) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-wrap items-center gap-4", className)}
			{...props}
		/>
	);
});
ChartLegend.displayName = "ChartLegend";

const ChartLegendItem = React.forwardRef(function ChartLegendItem(
	{ className, name, color, ...props },
	ref
) {
	return (
		<div
			ref={ref}
			className={cn("flex items-center gap-2", className)}
			{...props}
		>
			<div
				className={cn("h-2 w-2 rounded-full")}
				style={{ backgroundColor: color }}
			/>
			<span className="text-sm font-medium">{name}</span>
		</div>
	);
});
ChartLegendItem.displayName = "ChartLegendItem";

const ChartTooltip = React.forwardRef(function ChartTooltip(
	{ className, ...props },
	ref
) {
	return (
		<div
			ref={ref}
			className={cn("rounded-lg border bg-background p-2 shadow-md", className)}
			{...props}
		/>
	);
});
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = React.forwardRef(function ChartTooltipContent(
	{ className, children, ...props },
	ref
) {
	return (
		<div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
			{children}
		</div>
	);
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export {
	Chart,
	ChartContainer,
	ChartDescription,
	ChartHeader,
	ChartLegend,
	ChartLegendItem,
	ChartTitle,
	ChartTooltip,
	ChartTooltipContent,
};
