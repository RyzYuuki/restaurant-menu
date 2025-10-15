"use client";

import React, { useState } from 'react';
import { MenuCard } from '../components/MenuCard';
import { MenuHeader } from '../components/MenuHeader';
import { TittleHeader } from '../components/TittleHeader';
import menuData from '@/data/menu.json';
import Link from 'next/link';
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

const categories = ['メイン', 'サイド', 'ドリンク', 'デザート']; 

export default function HomePage() {
    const menuItems: MenuItem[] = menuData as MenuItem[];

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    // MenuCardクリック時の処理関数
    const handleCardClick = (item: MenuItem) => {
        setSelectedItem(item); // 選択されたメニューのデータをStateに格納
    };

    // モーダルを閉じる処理関数
    const handleCloseModal = () => {
        setSelectedItem(null); // Stateをnullに戻すことで、モーダルを非表示にする
    };

    return (
    <div className="container mx-auto p-4 max-w-7xl">

        {/* タイトル */}
        <TittleHeader />

        {/* カテゴリー */}
        <MenuHeader />

        {/* カテゴリごとのセクションとメニューカードの自動生成 */}
        <div className="container mx-auto p-4 max-w-7xl mt-8"> 
            {categories.map((category) => (
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
