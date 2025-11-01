'use client';
import Link from 'next/link';
// next.js not found page customization
export default function NotFound() {
    return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl mb-2">Page Not Found</h2>
        <p className="text-[var(--bsui-gray-0)] opacity-50">The page you are looking for doesn&apos;t exist or has been moved.</p>

        <Link href="/">
            <button className="bg-white px-3 py-2 mt-6 cursor-pointer text-zinc-900 rounded-md hover:bg-zinc-200"> Go Back </button>
        </Link>
    </div>
    );
}