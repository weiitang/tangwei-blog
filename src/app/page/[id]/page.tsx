import CategorySidebar from '@/src/components/category-sidebar';
import PageLayout from '@/src/components/page-layout';
import Pagination from '@/src/components/pagination';
import PostList from '@/src/components/post-list';
import { getAllPostList } from '@/utils/post';

export async function generateStaticParams() {
  const posts = await getAllPostList();
  const totalPages = Math.ceil(posts.length / 10);

  return Array.from({ length: totalPages }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

const Page = async ({ params }: { params: any }) => {
  const { id } = await params;
  const currentPage = id || 1;
  const postsPerPage = 10;
  const posts = await getAllPostList();
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.categories || []))
  );

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <PageLayout>
      <CategorySidebar categories={categories} posts={posts} />
      <div className="mx-4 flex-grow">
        <PostList posts={currentPosts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </PageLayout>
  );
};

export default Page;
