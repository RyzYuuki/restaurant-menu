import Link from 'next/link';

export const MenuHeader = () => {
    return (
        <nav className="sticky top-0 bg-white shadow-md pt-3 pb-3 z-50">
            <ul className="flex justify-center space-x-6 text-lg font-semibold">
                {['メイン', 'サイド', 'ドリンク', 'デザート'].map((category) => (
                    <li key={category}>
                        <Link href={`/#${category}`} className="text-red-600 hover:text-red-800 transition-colors">
                            {category}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="/course" className="text-red-600 hover:text-red-800 transition-colors">
                        コース
                    </Link>
                </li>
            </ul>
        </nav>
    );
};