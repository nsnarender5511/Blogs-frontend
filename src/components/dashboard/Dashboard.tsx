  return {
    _id: article._id.toString(),
    title: title,
    link: article.blog_url || '#',
    image: article.image_url || null,
    readTime: getRandomInt(5, 25, seed),
    difficulty: getRandomItem(difficulties, seed),
    tags: getRandomItems(sampleTags, getRandomInt(1, 4, seed), seed),
  }; 