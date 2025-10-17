import React from 'react';
import Image from 'next/image';

interface CourseMenuItemCardProps {
    id: string;
    name: string;
    description: string;
    image_path: string;
    price_extra: number;
    allergens: string;
    isSelected: boolean; 
    onSelect: () => void;
}

export const CourseMenuItemCard: React.FC<CourseMenuItemCardProps> = ({
    id,
    name, 
    description, 
    image_path, 
    price_extra, 
    allergens,
    isSelected,
    onSelect 
}) => {

    const isNoOption = id === 'no_drink_option' || id === 'no_dessert_option';

    // 料金を日本円形式に整形する関数（ローカルで定義）
    const formatPrice = (price: number): string => {
        return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
    };

    return (
        // 横長のデザインと選択時のスタイル
        <div 
            onClick={onSelect}
            className={`
                flex items-center gap-4 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 
                shadow-md hover:shadow-lg
                ${isSelected 
                    ? 'border-red-500 bg-red-50' // 選択時
                    : 'border-gray-200 bg-white' // 非選択時
                }
            `}
        >

            {isNoOption ? (
                // 1. 「なし」の場合: 中央寄せされた大きな名前だけを表示
                <div className="flex justify-center items-center w-full h-full py-4"> 
                    <h3 className="text-xl font-bold text-gray-800">{name}　</h3>

                    {price_extra < 0 && (
                        <span className="text-lg font-bold text-green-600 mt-1">
                            ({formatPrice(price_extra)})
                        </span>
                    )}
                </div>
            ) : (
                // 2. 通常のメニューアイテムの場合: 画像、説明、アレルギーを表示
                <>
                    {/* 1. 画像 */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                            src={image_path}
                            alt={name}
                            fill
                            sizes="96px"
                            className="object-cover"
                        />
                    </div>

                    {/* 2. テキスト情報 */}
                    <div className="flex-grow">
                        {/* 名前と追加料金 */}
                        <h3 className="text-lg font-bold text-gray-800 break-words">
                            {name}
                            {price_extra !== 0 && (
                                <span className={`ml-2 text-sm font-normal ${price_extra > 0 ? 'text-red-500' : 'text-green-600'} flex-shrink-0`}>
                                    {price_extra > 0 ? `(+¥${price_extra.toLocaleString()})` : `(${price_extra.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })})`}
                                </span>
                            )}
                        </h3>
                        
                        {/* 説明文 */}
                        {/* <p className="text-sm text-gray-600 line-clamp-2 mt-1 break-words">{description}</p> */}
                        
                        {/* アレルギー情報 */}
                        <p className="text-xs text-gray-500 mt-2 break-words">
                            アレルギー表示: {allergens || 'なし'}
                        </p>
                    </div>
                </>
            )}

            {/* 3. 選択チェックマーク (オプション) */}
            <div className="flex-shrink-0">
                {isSelected && (
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
        </div>
    );
};