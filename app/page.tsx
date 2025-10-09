import { MenuCard } from '../components/MenuCard';
// JSONデータをインポート
import menuData from '@/data/menu.json';

const categories = ['メイン', 'サイド', 'ドリンク']; 

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-serif text-center my-8 text-gray-800">
        レストラン メニュー
      </h1>

      {/* 1. ページ内ナビゲーション（アンカーリンク） */}
      <nav className="sticky top-0 bg-white shadow-md p-3 mb-8 z-10">
        <ul className="flex justify-center space-x-6 text-lg font-semibold">
          {categories.map((category) => (
            <li key={category}>
              {/* hrefに '#' とカテゴリ名を付けてページ内IDへジャンプ */}
              <a href={`#${category}`} className="text-red-600 hover:text-red-800 transition-colors">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2. カテゴリごとのセクションとメニューカードの自動生成 */}
      {categories.map((category) => (
        <section key={category} id={category} className="mb-12 pt-16 -mt-16"> 
          {/* pt-16 -mt-16 はアンカーリンクの飛び先がナビゲーションで隠れないようにするテクニック */}
          <h2 className="text-3xl font-serif border-b-2 border-red-600 pb-2 mb-6 text-gray-800">
            {category}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* JSONデータをフィルタリングし、該当カテゴリのメニューのみを map で展開 */}
            {menuData
              .filter(item => item.category === category)
              .map(item => (
                <MenuCard 
                  key={item.id} 
                  id={item.id} 
                  name={item.name} 
                  price={item.price} 
                  image_path={item.image_path}
                  allergens={item.allergens} 
                />
              ))
            }
          </div>
        </section>
      ))}
    </div>
  );
}
