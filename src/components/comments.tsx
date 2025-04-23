'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <Giscus
      repo="weiitang/tangwei-blog"
      repoId="R_kgDOObrdig"
      category="Announcements"
      categoryId="DIC_kwDOObrdis4CpX8m"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
    />
  );
}
