"use client";

import React, { useState, useMemo } from 'react';
import { CourseCalculator } from './CourseCalculator'; 
import { CoursePriceDisplay } from './CoursePriceDisplay'; 


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
interface CourseMenuWrapperProps {
    menuItems: MenuItem[];
}

const BASE_COURSE_PRICE = 2500; 

export const CourseMenuWrapper: React.FC<CourseMenuWrapperProps> = ({ menuItems }) => {
    // 1. 選択状態を管理する State
    const [selections, setSelections] = useState({
        'サラダ': '',
        'メイン': '',
        'セットドリンク': '',
        'デザート': '',
    });

    // 2. 料金を動的に計算するロジック
    const { totalExtra, finalPrice } = useMemo(() => {
        let extra = 0;
    
        Object.entries(selections).forEach(([category, selectedId]) => {
            if (selectedId) {
                const selectedItem = menuItems.find(item => item.id === selectedId);
                if (selectedItem) {
                    extra += selectedItem.course_extra;
                }
            }
        });

        const final = BASE_COURSE_PRICE + extra;
        return { totalExtra: extra, finalPrice: final };
    }, [selections, menuItems]); 

    // 3. 選択肢がクリックされたときの処理（子に渡す関数）
    const handleSelect = (category: string, itemId: string) => {
        setSelections(prev => ({
            ...prev,
            [category]: itemId 
        }));
    };
    
    const courseCategories = ['サラダ', 'メイン', 'セットドリンク', 'デザート'];

    return (
        // ★★★ 料金表示と選択肢を並列配置（flexを使って左右に分離） ★★★
        <div className="flex flex-col lg:flex-row-reverse gap-8">
            
            {/* 料金表示（右側、別枠）- 計算結果を渡す */}
            {/* 1. lg:w-1/3: 右側を1/3の幅に指定
                2. sticky top-20: 画面上部から20pxの位置に固定
                3. z-50: 他のコンテンツより常に手前に表示
                4. h-fit: 高さを内容物に合わせて調整（sticky動作に有利）*/}
            <div className="lg:w-1/3 sticky top-20 z-50 h-fit">
                <CoursePriceDisplay
                    totalExtra={totalExtra}
                    finalPrice={finalPrice}
                />
            </div>

            {/* 選択肢の枠（左側、別枠）- 選択更新関数を渡す */}
            <div className="lg:w-2/3">
                <CourseCalculator 
                menuItems={menuItems} 
                selections={selections} 
                onSelect={handleSelect} // 関数を子に渡す
                courseCategories={courseCategories}
            />
        </div>
    </div>
  );
};