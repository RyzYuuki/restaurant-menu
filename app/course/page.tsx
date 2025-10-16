"use client";

import Link from 'next/link';
import { MenuHeader } from '@/components/MenuHeader';
import { CourseMenuWrapper } from '../../components/CourseMenuWrapper';
import menuData from '@/data/menu.json';

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

export default function CoursePage() {

    // MenuHeaderに渡すダミー関数
    const noopToggle = () => {
        console.log("Sub-navigation toggle skipped on Course Page.");
    };
    
    // TypeScriptでJSONデータをMenuItem型の配列として扱う
    const menuItems: MenuItem[] = menuData as MenuItem[];

    const courseCategories = ['サラダ', 'メイン', 'セットドリンク', 'デザート'];

    // フィルタリングしたデータを CourseCalculator に渡たす
    const courseMenuData = menuItems.filter(item => 
        courseCategories.includes(item.category)
    );

    return (
        <div className='container mx-auto p-4 max-w-7xl'>
            <h1 className="text-4xl font-serif text-center my-8 text-gray-800">
                セットメニュー
            </h1>

            {/* カテゴリー */}
            <MenuHeader
                isSubNavOpen={false} // サブナビは常に閉じた状態
                toggleSubNav={noopToggle} // 何もしない関数
            />

            <div className="container mx-auto p-4 max-w-7xl mt-8">
                <h2 className="text-3xl font-serif border-b-2 border-red-600 pb-2 mb-6 text-gray-800">
                    セットメニューの組み合わせ
                </h2>
        
            <CourseMenuWrapper menuItems={courseMenuData} />
        </div>
    </div>
    );
}