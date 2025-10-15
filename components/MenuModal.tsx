import React from 'react';

// MenuModalが受け取るプロパティ
interface MenuModalProps {
    item: {
        id: string;
        name: string;
        price: string;
        description: string;
        image_path: string;
        allergens: string;
        category: string;
    };
    onClose: () => void; // 閉じるための関数
}

export const MenuModal: React.FC<MenuModalProps> = ({ item, onClose }) => {
    if (!item) return null; // データがない場合は何も表示しない

    return (
        // 1. オーバーレイ (ページの周りの黒い部分)
        // fixed inset-0: 画面全体に固定
        // bg-black/70: 背景を半透明の黒にする
        // z-50: 他のコンテンツの上に表示
        // onClick={onClose}: ★★★ ここがページの周りをタップしたら戻る仕組み ★★★
        <div 
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose} 
        >
            {/* 2. モーダルの本体 (詳細情報ボックス) */}
            {/* onClick={(e) => e.stopPropagation()}: 親へのクリック伝播を停止 
               これにより、このボックス内をクリックしてもモーダルは閉じない */}
            <div 
                className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* 閉じるボタン (x印) - あっても親切 */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-2xl z-10 p-2"
                >
                    &times;
                </button>

                {/* 画像 */}
                <img 
                    src={item.image_path} 
                    alt={item.name} 
                    className="w-full h-64 object-cover rounded-t-xl"
                />

                {/* 詳細コンテンツ */}
                <div className="p-6">
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">{item.name}</h2>
                    <p className="text-xl font-bold text-red-600 mb-4">{item.price}</p>
                    
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">説明</h3>
                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">{item.description}</p>
                    
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">アレルギー表示</h3>
                    <p className="text-gray-700">{item.allergens || 'なし'}</p>
                </div>
            </div>
        </div>
    );
};