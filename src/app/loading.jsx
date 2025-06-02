"use client";

export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
			<div className="animate-pulse w-full max-w-4xl">
				<div className="h-12 w-64 bg-slate-700 rounded mx-auto mb-6"></div>
				<div className="h-6 w-96 bg-slate-700 rounded mx-auto mb-12"></div>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<div className="h-12 w-40 bg-slate-700 rounded"></div>
					<div className="h-12 w-40 bg-slate-700 rounded"></div>
				</div>
			</div>
		</div>
	);
}
