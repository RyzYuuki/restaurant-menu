"use client";
import React, { useState, useMemo } from 'react';
import { CourseMenuItemCard } from './CourseMenuItemCard';

// データの型を定義
interface MenuItem {
    id: string;
    category: string;
    name: string;
    description: string;
    image_path: string;
    allergens: string;
    base_price: number;
    course_extra: number;
}

interface CourseCalculatorProps {
    menuItems: MenuItem[];
    selections: { [key: string]: string }; // 現在の選択状態
    onSelect: (category: string, itemId: string) => void; // 選択更新関数
    courseCategories: string[];
}

const BASE_COURSE_PRICE = 3000; // コースの基本料金を3000円と定義

// 料金表示を整形する関数
const formatPrice = (price: number): string => {
    // toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) は,数値を日本の通貨形式に変換する
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
};

export const CourseCalculator: React.FC<CourseCalculatorProps> = ({ menuItems, selections, onSelect, courseCategories }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8">

        {/* 選択肢の表示 (ここがコース選択の枠となる) */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            セットメニュー組み合わせ
        </h3>

            {/* 選択肢の表示 */}
            <div className="space-y-8">
                {courseCategories.map((category) => (
                    <div key={category} className="border-b pb-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{category}の選択</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            
                            {/* 該当カテゴリーのメニューをフィルタリングして表示 */}
                            {menuItems.filter(item => item.category === category).map(item => (
                                <CourseMenuItemCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    image_path={item.image_path} // 画像パスを渡す
                                    price_extra={item.course_extra} // 追加料金を渡す
                                    allergens={item.allergens}
                                    // 現在選択されているかどうかの判定
                                    isSelected={selections[category as keyof typeof selections] === item.id}
                                    // 選択時に親の State を更新する関数を渡す
                                    onSelect={() => onSelect(category, item.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};