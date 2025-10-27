'use client';
// next.js not found page customization
export default function NotFound() {
    return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl mb-2">Page Not Found</h2>
        <p className="text-[var(--bsui-gray-0)] opacity-50">The page you are looking for doesn&apos;t exist or has been moved.</p>
    </div>
    );
}