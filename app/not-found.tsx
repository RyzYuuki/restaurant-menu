// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto p-8 text-center max-w-2xl min-h-screen flex flex-col justify-center items-center">
      
      {/* エラーコードと大きな見出し */}
      <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-4xl font-serif text-gray-800 mb-8">
        ページが見つかりませんでした
      </h2>

      {/* エラー説明 */}
      <p className="text-lg text-gray-600 mb-10">
        お探しのページは、移動されたか、削除された可能性があります。
        URLを再確認するか、以下のボタンからメニュー一覧へお戻りください。
      </p>

      {/* 戻るボタン（メニュー一覧へ） */}
      <Link 
        href="/" 
        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300 text-xl"
      >
        メニュー一覧に戻る
      </Link>
      
    </div>
  );
}