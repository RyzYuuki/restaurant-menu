import menuData from '@/data/menu.json';
import Image from 'next/image';
import Link from 'next/link';

// URLパラメータ (id) を受け取るための型定義
interface MenuDetailPageProps {
    params: {
        id: string; // URLから渡されるメニューID
    };
}

export default function MenuDetailPage({ params }: MenuDetailPageProps) {
    // URLのID (params.id) と一致するメニューデータを検索
    const menuItem = menuData.find(item => item.id === params.id);

    // メニューが見つからなかった場合の処理
    if (!menuItem) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-3xl font-bold text-red-700">メニューが見つかりませんでした</h1>
                <Link href="/" className="text-blue-600 hover:underline mt-4 block">
                一覧ページへ戻る
                </Link>
            </div>
        );
    }

  // メニューが見つかった場合の表示
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Link href="/" className="text-red-600 hover:underline mb-6 inline-block font-semibold">
                ← メニュー一覧に戻る
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-2xl">
                <h1 className="text-4xl font-serif mb-4 text-gray-800">{menuItem.name}</h1>
                <p className="text-2xl font-bold text-red-600 mb-6">{menuItem.price}</p>
        
                {/* 写真表示: 幅を統一して大きく表示 */}
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
                    <Image
                        src={menuItem.image_path}
                        alt={menuItem.name}
                        fill
                        sizes="100vw"
                        className="object-cover" // 画像の統一処理
                />
                </div>

                {/* メニューの詳細説明 */}
                <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-700">メニューの説明</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {menuItem.description}
                </p>
            </div>
        </div>
    );
}