"use client";
import React, { useState, useMemo } from 'react';

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

const BASE_COURSE_PRICE = 2500; // コースの基本料金を2500円と定義

// 料金表示を整形する関数
const formatPrice = (price: number): string => {
    // toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) は,数値を日本の通貨形式に変換する
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
};

export const CourseCalculator: React.FC<CourseCalculatorProps> = ({ menuItems, selections, onSelect, courseCategories }) => {
    // // ★重要3: 選択状態を管理する State を定義 (useState) ★
    // // ユーザーが選択した各カテゴリーのメニューIDを保持
    // const [selections, setSelections] = useState({
    //     'サラダ': '', // 初期値は空文字
    //     'メイン': '',
    //     'コースドリンク': '',
    //     'デザート': '',
    // });

    // // ★重要4: 料金を動的に計算するロジック (useMemo) ★
    // // selections が変更されるたびに、合計金額を再計算
    // const { totalExtra, finalPrice } = useMemo(() => {
    //     let extra = 0; // 追加料金の合計
    
    //     // 1. 選択されたメニューの course_extra を合計
    //     Object.entries(selections).forEach(([category, selectedId]) => {
    //         if (selectedId) {
    //             // 選択されたIDに一致するメニューアイテムを検索
    //             const selectedItem = menuItems.find(item => item.id === selectedId);

    //             // 追加料金があれば加算
    //             if (selectedItem) {
    //                 extra += selectedItem.course_extra;
    //             }
    //         }
    //     });

    //     // 2. 最終合計料金の計算
    //     const final = BASE_COURSE_PRICE + extra;

    //     return { 
    //         totalExtra: extra, 
    //         finalPrice: final 
    //     };
    // }, [selections, menuItems]); // selections が変わると再実行されます

    // // ★重要5: 選択肢がクリックされたときの処理 ★
    // const handleSelect = (category: string, itemId: string) => {
    //     // 現在の選択状態をコピーし、新しい選択を上書き
    //     setSelections(prev => ({
    //         ...prev,
    //         [category]: itemId // 例: 'メイン' の選択を 'main-01' に更新
    //     }));
    // };

    // // コース計算対象のカテゴリーを定義
    // const courseCategories = ['サラダ', 'メイン', 'コースドリンク', 'デザート'];

    // 表示部分 (JSX)
    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8">

        {/* 選択肢の表示 (ここがコース選択の枠となる) */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            コース組み合わせ選択
        </h3>

            {/* 選択肢の表示 */}
            <div className="space-y-8">
                {courseCategories.map((category) => (
                    <div key={category} className="border-b pb-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{category}の選択</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            
                            {/* 該当カテゴリーのメニューをフィルタリングして表示 */}
                            {menuItems.filter(item => item.category === category).map(item => (
                                <div 
                                    key={item.id}
                                    // クリックで選択が更新される
                                    onClick={() => onSelect(category, item.id)}
                                    className={`
                                        p-3 border rounded-lg cursor-pointer transition-all duration-200 
                                        ${selections[category as keyof typeof selections] === item.id 
                                            ? 'border-red-600 bg-red-100 shadow-md transform scale-[1.02]' // 選択されたとき
                                            : 'border-gray-200 hover:border-red-300 bg-white' // 未選択のとき
                                        }
                                    `}
                                >
                                    <p className="font-bold text-lg text-gray-900">{item.name}</p>
                                    
                                    {/* 追加料金の表示 */}
                                    {item.course_extra !== 0 && (
                                        <span className={`text-sm font-semibold ${item.course_extra > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                                            {item.course_extra > 0 ? `+${formatPrice(item.course_extra)}` : formatPrice(item.course_extra)}
                                        </span>
                                    )}

                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};