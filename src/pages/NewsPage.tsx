import Icon from '@/components/ui/icon';
import { MOCK_NEWS } from '@/data/manga';

interface NewsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const CATEGORIES = ['Все', 'Аниме', 'Манга', 'Рейтинги', 'Интервью', 'Новости сайта'];

export default function NewsPage({ onNavigate }: NewsPageProps) {
  const featured = MOCK_NEWS[0];
  const rest = MOCK_NEWS.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide">Новости</h1>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-golos border transition-all ${
              cat === 'Все'
                ? 'bg-primary border-primary text-white'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <article
        onClick={() => onNavigate('newsItem', { id: featured.id })}
        className="relative rounded-xl overflow-hidden cursor-pointer mb-8 group"
      >
        <div className="relative h-64 md:h-80">
          <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-xs font-oswald uppercase px-2 py-0.5 rounded">{featured.category}</span>
              <span className="text-white/70 text-xs font-golos">{featured.date}</span>
            </div>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
              {featured.title}
            </h2>
            <p className="font-golos text-white/80 text-sm line-clamp-2">{featured.excerpt}</p>
          </div>
        </div>
      </article>

      {/* Rest */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((news, i) => (
          <article
            key={news.id}
            onClick={() => onNavigate('newsItem', { id: news.id })}
            className={`group bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/40 transition-all animate-fade-in stagger-${Math.min(i + 1, 6)}`}
          >
            <div className="relative h-40 overflow-hidden">
              <img src={news.cover} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-white text-[10px] font-oswald uppercase px-1.5 py-0.5 rounded">{news.category}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={12} className="text-muted-foreground" />
                <span className="font-golos text-xs text-muted-foreground">{news.date}</span>
              </div>
              <h3 className="font-oswald font-semibold text-base leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {news.title}
              </h3>
              <p className="font-golos text-muted-foreground text-sm line-clamp-2">{news.excerpt}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {news.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-golos">#{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
