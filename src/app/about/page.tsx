/* eslint-disable @next/next/no-img-element */
import Comments from '@/src/components/comments';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        {/* 个人信息头部 */}
        <div className="mb-8 flex flex-col items-center md:flex-row">
          <div className="relative mb-4 h-48 w-48 md:mr-8 md:mb-0">
            <img
              src="https://avatars.githubusercontent.com/u/107684428?s=400&u=8c465e9eab17f739e63f42e784808b5687954153&v=4"
              alt="个人头像"
              className="block w-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold dark:text-white">
              前端开发工程师
            </h1>
            <p className="mb-4 text-gray-600 dark:text-gray-300">逆转一切</p>
          </div>
        </div>

        {/* 技术栈 */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            技术栈
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              'React',
              'Vue',
              'TypeScript',
              'Next.js',
              'Nuxt.js',
              'Node',
              'Tailwind CSS',
              'JavaScript',
              'HTML/CSS',
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-700 dark:text-gray-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* 个人简介 */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            关于我
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            作为一名前端开发工程师，我专注于构建高性能、可访问性强的 Web 应用。
            我热衷于学习新技术，并将其应用到实际项目中。在工作中，我注重代码质量和用户体验，
            善于与团队协作，共同打造优秀的产品。
          </p>
        </section>

        {/* 工作经历 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            工作经历
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold dark:text-white">前端开发工程师</h3>
              <p className="text-gray-600 dark:text-gray-400">毕业 - 至今</p>
              <p className="text-gray-700 dark:text-gray-300">
                负责公司核心产品的前端开发，优化用户体验，提升应用性能
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-5 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <Comments />
      </div>
    </div>
  );
}
