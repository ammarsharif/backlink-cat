import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const POSTS = [
  {
    id: '1',
    image: '/images/post-1.jpg', // TODO: asset
    title: 'What is Lorem Ipsum?',
    excerpt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    href: '#',
  },
  {
    id: '2',
    image: '/images/post-2.jpg', // TODO: asset
    title: 'What is Lorem Ipsum?',
    excerpt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    href: '#',
  },
  {
    id: '3',
    image: '/images/post-3.jpg', // TODO: asset
    title: 'What is Lorem Ipsum?',
    excerpt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    href: '#',
  },
];

export function LatestPosts() {
  return (
    <section className="py-16 bg-[var(--color-bg-primary)]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-center mb-10">
          Latest <span className="text-[var(--color-text-accent)]">Posts</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-[var(--color-border-card)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              {/* Post image */}
              <div className="h-44 overflow-hidden bg-gray-200">
                {/* TODO: asset — blog post thumbnail */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[var(--color-text-heading)] text-base mb-2 font-[var(--font-heading)]">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <a
                  href={post.href}
                  className="text-xs font-semibold text-[var(--color-text-accent)] hover:underline uppercase tracking-wide"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="primary" size="lg">
            VIEW ALL POSTS
          </Button>
        </div>
      </Container>
    </section>
  );
}
