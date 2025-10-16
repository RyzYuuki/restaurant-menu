import React from 'react';

// 親コンポーネントから受け取るデータの型を定義
interface CoursePriceDisplayProps {
    totalExtra: number;
    finalPrice: number;
}

// 料金表示を整形する関数（再定義）
const formatPrice = (price: number): string => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
};

export const CoursePriceDisplay: React.FC<CoursePriceDisplayProps> = ({ totalExtra, finalPrice }) => {
    return (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                セットメニュー料金合計 (税込)
            </h3>
            <div className="flex justify-between items-center">
                {/* 追加料金の表示: totalExtraが0でなければ表示 */}
                <span className="text-lg font-semibold text-gray-700">
                    基本料金 + 追加料金 ({formatPrice(totalExtra)}):
                </span>
                {/* 最終料金の表示 */}
                <span className="text-4xl font-extrabold text-red-700">
                    {formatPrice(finalPrice)}
                </span>
            </div>
        </div>
    );
};