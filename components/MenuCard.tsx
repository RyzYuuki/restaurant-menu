import Image from 'next/image';

// メニューデータの型定義 (TypeScript)
interface MenuCardProps {
    id: string;
    name: string;
    price: string;
    image_path: string;
    allergens: string | undefined;
    onClick: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, image_path, allergens, onClick }) => {
    return (
        <div 
            onClick={onClick} // ★★★ クリックイベントでモーダルを表示 ★★★
            className="group block overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white cursor-pointer"
        >
            {/* 1. 写真の統一処理 */}
            <div className="relative w-full h-64"> 
                <Image
                    src={image_path}
                    alt={name}
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* 2. メニュー名と価格 */}
            <div className="p-4">
                <h3 className="text-xl font-serif text-gray-800 truncate">{name}</h3>
                <p className="text-lg font-bold text-red-600 mt-1">{price}</p>

                {/* 3. アレルギー情報の表示 */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                    <p className="text-xs text-gray-500 font-medium">
                        アレルギー表示: <span className="font-normal">{allergens || 'なし'}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};