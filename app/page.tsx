"use client";

import React, { useState } from 'react';
import { MenuCard } from '../components/MenuCard';
import { MenuHeader } from '../components/MenuHeader';
import { TittleHeader } from '../components/TittleHeader';
import menuData from '@/data/menu.json';
import { MenuModal } from '../components/MenuModal';


// app/page.tsx の上部に記述

interface MenuItem {
    id: string;
    category: string;
    name: string;
    price: string;
    description: string;
    image_path: string;
    allergens: string;
    base_price: number;
    course_extra: number;
}

// 単品メニューのサブカテゴリとして利用
const singleItemCategories = ['メイン', 'サイド', 'ドリンク', 'デザート']; 

export default function HomePage() {
    const menuItems: MenuItem[] = menuData as MenuItem[];

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const [isSubNavOpen, setIsSubNavOpen] = useState(false);

    // MenuCardクリック時の処理関数
    const handleCardClick = (item: MenuItem) => {
        setSelectedItem(item); // 選択されたメニューのデータをStateに格納
    };

    // モーダルを閉じる処理関数
    const handleCloseModal = () => {
        setSelectedItem(null); // Stateをnullに戻すことで、モーダルを非表示にする
    };

    const toggleSubNav = () => {
        setIsSubNavOpen(prev => !prev);
    };

    return (
    <div className="container mx-auto max-w-7xl">

        {/* タイトル */}
        <TittleHeader />

        {/* カテゴリー */}
        <MenuHeader 
            isSubNavOpen={isSubNavOpen} // 現在の状態
            toggleSubNav={toggleSubNav} // 開閉関数
        />

        {/* isSubNavOpen が true のときだけ表示される横並びメニュー */}
        <div 
            className={`
                sticky top-[60px] bg-white shadow-md z-40
                transition-all duration-300 overflow-hidden 
                ${isSubNavOpen ? 'max-h-96 opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0'} 
            `}
        >
            <nav className="overflow-x-auto whitespace-nowrap px-4 py-3">
                {/* 横並びのメニュー項目 */}
                <div className="inline-flex space-x-6">
                    {singleItemCategories.map((category) => (
                        <a 
                            key={category} 
                            href={`#${category}`} 
                            onClick={() => setIsSubNavOpen(false)} // 選択後は自動で閉じる
                            className="text-lg font-semibold text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-100 flex-shrink-0"
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </nav>
        </div>

        {/* カテゴリごとのセクションとメニューカードの自動生成 */}
        <div className="p-4 mt-8"> 
            {singleItemCategories.map((category) => (
                <section key={category} id={category} className="mb-12 pt-16 -mt-16"> 
                    {/* pt-16 -mt-16 はアンカーリンクの飛び先がナビゲーションで隠れないようにするテクニック */}
                    <h2 className="text-3xl font-serif border-b-2 border-red-600 pb-2 mb-6 text-gray-800">
                        {category}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menuItems
                            .filter(item => item.category === category)
                            .map(item => (
                            <MenuCard 
                                key={item.id} 
                                // ★★★ クリックイベントを渡し、Stateを更新するように修正 ★★★
                                onClick={() => handleCardClick(item)} 
                                id={item.id} 
                                name={item.name} 
                                price={item.price} 
                                image_path={item.image_path}
                                allergens={item.allergens}
                            />
                            ))
                        }
                        </div>
                    </section>
                ))}
            </div>

            {/* モーダル表示部分 */}
            {selectedItem && (
                <MenuModal 
                    item={selectedItem} 
                    onClose={handleCloseModal} 
                />
            )}

        </div>
    );
}
