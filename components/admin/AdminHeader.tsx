'use client';

import { useAdminUIStore } from '@/lib/store/adminUI';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
    const { toggleSidebar } = useAdminUIStore();
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        router.push('/admin-login');
    };

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 w-full">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-4 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Logout Button - visible on all screens */}
                <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>

                <div className="flex items-center space-x-3 border-l pl-2 md:pl-4 ml-2 md:ml-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-dark">Admin</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold text-sm md:text-base">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
