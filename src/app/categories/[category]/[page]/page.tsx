import CategorySidebar from '@/src/components/category-sidebar';
import PageLayout from '@/src/components/page-layout';
import Pagination from '@/src/components/pagination';
import PostList from '@/src/components/post-list';
import { getAllPostList } from '@/utils/post';

type Params = Promise<{ category: string; page: string }>;

export async function generateStaticParams() {
  const posts = await getAllPostList();
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.categories || []))
  );

  const params = [];
  for (const category of categories) {
    const categoryPosts = posts.filter((post) =>
      post.frontmatter.categories?.includes(category)
    );
    const totalPages = Math.ceil(categoryPosts.length / 10);

    for (let page = 1; page <= totalPages; page++) {
      params.push({
        // 中文
        // build时，Next.js 在 output: 'export' 时，会将动态参数自动转换为 URL 编码格式
        // 但是访问/categories/工程化/1/时，获取参数时会将中文编码，%E5%B7%A5%E7%A8%8B%E5%8C%96
        category:
          process.env.NODE_ENV === 'development'
            ? encodeURIComponent(category)
            : category, // 会导致参数被双重编码
        // category: category,
        page: page.toString(),
      });
    }
  }
  return params;
}

async function CategoryPage({ params }: { params: Params }) {
  const { page, category } = await params;
  const posts = await getAllPostList();
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.categories || []))
  );

  const currentPage = Number(page);
  const postsPerPage = 10;

  const filteredPosts = posts.filter((post) =>
    post.frontmatter.categories?.includes(decodeURIComponent(category))
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <PageLayout>
      <CategorySidebar
        categories={categories}
        posts={posts}
        currentCategory={decodeURIComponent(category)}
        // currentCategory={category}
      />
      <div className="mx-4 flex-grow">
        <PostList posts={currentPosts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </PageLayout>
  );
}

export default CategoryPage;
