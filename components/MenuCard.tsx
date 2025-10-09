import Link from 'next/link';
import Image from 'next/image';

// メニューデータの型定義 (TypeScript)
interface MenuCardProps {
    id: string;
    name: string;
    price: string;
    image_path: string;
    allergens: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, image_path, allergens }) => {
    return (
        // 詳細ページへのリンクを設定
        <Link href={`/menu/${id}`} className="group block overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            {/* 1. 写真の統一処理 */}
            <div className="relative w-full h-64"> 
                {/* Next.jsのImageコンポーネントで画像の最適化 */}
                <Image
                    src={image_path}
                    alt={name}
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    // ** object-coverが重要: 画像を指定サイズにトリミングし、コンテナを埋める **
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* 2. メニュー名と価格 */}
            <div className="p-4">
                <h3 className="text-xl font-serif text-gray-800 truncate">{name}</h3>
                <p className="text-lg font-bold text-red-600 mt-1">{price}</p>

                {/* 3. アレルギー情報の表示をここに追加 */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                    <p className="text-xs text-gray-500 font-medium">
                        アレルギー表示: <span className="font-normal">{allergens}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};