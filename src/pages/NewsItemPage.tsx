import Icon from '@/components/ui/icon';
import { MOCK_NEWS } from '@/data/manga';

interface NewsItemPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

export default function NewsItemPage({ onNavigate, params }: NewsItemPageProps) {
  const news = MOCK_NEWS.find(n => n.id === params?.id) || MOCK_NEWS[0];
  const related = MOCK_NEWS.filter(n => n.id !== news.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 max-w-4xl">
      {/* Back */}
      <button
        onClick={() => onNavigate('news')}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6 font-golos text-sm"
      >
        <Icon name="ArrowLeft" size={14} />
        Все новости
      </button>

      {/* Cover */}
      <div className="rounded-xl overflow-hidden mb-6 h-48 md:h-72">
        <img src={news.cover} alt={news.title} className="w-full h-full object-cover" />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-primary text-white text-xs font-oswald uppercase px-2 py-0.5 rounded">{news.category}</span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span className="font-golos text-xs">{news.date}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Icon name="User" size={12} />
          <span className="font-golos text-xs">{news.author}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-oswald text-3xl md:text-4xl font-bold leading-tight mb-6">{news.title}</h1>

      {/* Content */}
      <div className="prose prose-invert max-w-none mb-8">
        <p className="font-golos text-lg text-muted-foreground leading-relaxed mb-4 font-medium">{news.excerpt}</p>
        <p className="font-golos text-foreground leading-relaxed mb-4">{news.content}</p>
        <p className="font-golos text-muted-foreground leading-relaxed">
          Следите за обновлениями на нашем портале — мы первыми сообщаем о важных событиях в мире манги и аниме.
          Подписывайтесь на уведомления, чтобы не пропустить ни одной новости.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-border mb-8">
        {news.tags.map(tag => (
          <span key={tag} className="text-sm bg-secondary border border-border text-muted-foreground px-3 py-1 rounded-full font-golos">
            #{tag}
          </span>
        ))}
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-golos text-sm text-muted-foreground">Поделиться:</span>
        {['VK', 'TG', 'TW'].map(s => (
          <button key={s} className="bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 px-3 py-1.5 rounded font-oswald text-xs tracking-wide transition-all">
            {s}
          </button>
        ))}
      </div>

      {/* Related */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Читайте также</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map(n => (
            <article
              key={n.id}
              onClick={() => onNavigate('newsItem', { id: n.id })}
              className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/40 transition-all"
            >
              <div className="h-28 overflow-hidden">
                <img src={n.cover} alt={n.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <span className="text-[10px] text-primary font-oswald uppercase">{n.category}</span>
                <h3 className="font-oswald font-semibold text-sm mt-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {n.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
