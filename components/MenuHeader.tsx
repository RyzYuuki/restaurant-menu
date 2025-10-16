"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

// Propsの型定義
interface MenuHeaderProps {
    isSubNavOpen: boolean; // サブナビの現在の状態
    toggleSubNav: () => void; // サブナビの開閉を切り替える関数
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ isSubNavOpen, toggleSubNav }) => {

    const pathname = usePathname(); // 現在のパスを取得
    const isHomePage = pathname === '/'; // ホームページにいるか判定

    const mainNavs = [
        // コースメニュー一覧ページ
        { name: 'セット', href: '/course' } 
    ];

    const buttonClasses = `
        text-red-600 hover:text-red-800 transition-colors py-1 px-3 relative top-[1px] rounded-full 
        ${isHomePage && isSubNavOpen ? 'bg-red-100' : ''}
    `;

    return (
        <nav className="sticky top-0 bg-white shadow-md p-3 z-50">
            <ul className="flex justify-center space-x-6 text-lg font-semibold items-center">

                <li>
                    {/* ★★★ 修正点: ホームページでない場合は Link に切り替える ★★★ */}
                    {isHomePage ? (
                        // ホームページの場合: ボタンとしてStateを操作
                        <button 
                            onClick={toggleSubNav} 
                            className={buttonClasses}
                        >
                            単品
                            <span className="ml-2 inline-block">
                                <svg 
                                    className={`w-3 h-3 transition-transform duration-300 ${isSubNavOpen ? 'rotate-180' : 'rotate-0'}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span>
                        </button>
                    ) : (
                        <Link href="/" className={buttonClasses}>
                            単品
                        </Link>
                    )}
                </li>
                
                {/* セットメニューのリンク */}
                {mainNavs.map((nav) => (
                    <li key={nav.name}>
                        <Link 
                            href={nav.href} 
                            className="text-red-600 hover:text-red-800 transition-colors py-1 px-3 top-[1px]"
                        >
                            {nav.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};