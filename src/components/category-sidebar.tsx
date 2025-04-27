import { PostData } from '@/types/post';
import Link from 'next/link';

interface CategorySidebarProps {
  categories: string[];
  posts: PostData[];
  currentCategory?: string;
}

export default function CategorySidebar({
  categories,
  posts,
  currentCategory,
}: CategorySidebarProps) {
  return (
    <>
      {/* 移动端横向布局 */}
      <div className="sticky top-20 left-0 w-full overflow-x-auto md:hidden">
        <div className="bg-white p-4 shadow-md">
          <div className="flex min-w-max gap-2">
            <Link
              href="/"
              className={`rounded-full px-3 py-2 text-sm whitespace-nowrap ${
                !currentCategory
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              全部文章
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                // href={`/categories/${encodeURIComponent(category)}/1`}
                href={`/categories/${category}/1`}
                className={`rounded-full px-3 py-2 text-sm whitespace-nowrap ${
                  // category === decodeURIComponent(currentCategory as string)
                  category === currentCategory
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
                <span className="ml-1">
                  (
                  {
                    posts.filter((post) =>
                      post.frontmatter.categories?.includes(category)
                    ).length
                  }
                  )
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PC端竖向侧边栏 */}
      <aside className="sticky top-24 hidden w-64 flex-shrink-0 self-start md:block">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold">文章分类</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className={`block rounded p-2 transition-colors ${
                  !currentCategory
                    ? 'bg-gray-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                全部文章
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  // href={`/categories/${encodeURIComponent(category)}/1`}
                  href={`/categories/${category}/1`}
                  className={`block rounded p-2 transition-colors ${
                    // category === decodeURIComponent(currentCategory as string)
                    category === currentCategory
                      ? 'bg-gray-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-2 text-sm ${
                      // category === decodeURIComponent(currentCategory as string)
                      category === currentCategory
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    (
                    {
                      posts.filter((post) =>
                        post.frontmatter.categories?.includes(category)
                      ).length
                    }
                    )
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
