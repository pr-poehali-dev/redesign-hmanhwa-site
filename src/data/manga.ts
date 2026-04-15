export interface Manga {
  id: string;
  title: string;
  titleRu: string;
  cover: string;
  rating: number;
  status: 'ongoing' | 'completed' | 'hiatus';
  type: 'manga' | 'manhwa' | 'manhua';
  genres: string[];
  tags: string[];
  description: string;
  author: string;
  artist: string;
  year: number;
  chapters: Chapter[];
  views: number;
  bookmarks: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  pages: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
}

export const MOCK_CHAPTERS: Chapter[] = Array.from({ length: 120 }, (_, i) => ({
  id: `ch-${i + 1}`,
  number: i + 1,
  title: i % 10 === 0 ? `Глава ${i + 1}: Начало нового пути` : `Глава ${i + 1}`,
  date: new Date(2024, 0, 1 + i * 3).toLocaleDateString('ru-RU'),
  pages: Array.from({ length: 18 }, (_, p) =>
    `https://picsum.photos/800/1200?random=${i * 20 + p}`
  ),
})).reverse();

export const MOCK_MANGA: Manga[] = [
  {
    id: '1',
    title: 'Solo Leveling',
    titleRu: 'Соло Левелинг',
    cover: 'https://picsum.photos/300/420?random=1',
    rating: 9.4,
    status: 'completed',
    type: 'manhwa',
    genres: ['Экшен', 'Фэнтези', 'Приключения'],
    tags: ['Сильный герой', 'Охотники', 'Порталы', 'Магия'],
    description: 'В мире, где охотники — люди с магическими способностями — должны сражаться с монстрами из подземелий, Сон Чжин-У — слабейший охотник. Однажды он сталкивается с опасным двойным подземельем и получает уникальную систему повышения уровня.',
    author: 'Чхугон',
    artist: 'Jang Sung-Rak',
    year: 2018,
    chapters: MOCK_CHAPTERS,
    views: 4823000,
    bookmarks: 312000,
  },
  {
    id: '2',
    title: 'Berserk',
    titleRu: 'Берсерк',
    cover: 'https://picsum.photos/300/420?random=2',
    rating: 9.7,
    status: 'hiatus',
    type: 'manga',
    genres: ['Экшен', 'Ужасы', 'Тёмное фэнтези'],
    tags: ['Тёмное фэнтези', 'Средневековье', 'Монстры', 'Трагедия'],
    description: 'История Гатса — воина, рождённого на поле битвы, который ищет смысл своего существования, встречает соратников и пережившает предательство. Эпическое тёмное фэнтези о борьбе человека с судьбой.',
    author: 'Кентаро Миура',
    artist: 'Кентаро Миура',
    year: 1989,
    chapters: MOCK_CHAPTERS.slice(0, 40),
    views: 7200000,
    bookmarks: 589000,
  },
  {
    id: '3',
    title: 'Tower of God',
    titleRu: 'Башня Бога',
    cover: 'https://picsum.photos/300/420?random=3',
    rating: 9.1,
    status: 'ongoing',
    type: 'manhwa',
    genres: ['Экшен', 'Фэнтези', 'Приключения'],
    tags: ['Башня', 'Испытания', 'Тайны', 'Сила'],
    description: 'Двадцать пятый Бам всю жизнь провёл в темноте под башней, пока его единственная подруга не ушла внутрь. Он следует за ней и начинает восхождение по таинственной башне.',
    author: 'SIU',
    artist: 'SIU',
    year: 2010,
    chapters: MOCK_CHAPTERS.slice(0, 90),
    views: 5100000,
    bookmarks: 421000,
  },
  {
    id: '4',
    title: 'Chainsaw Man',
    titleRu: 'Человек-бензопила',
    cover: 'https://picsum.photos/300/420?random=4',
    rating: 9.2,
    status: 'ongoing',
    type: 'manga',
    genres: ['Экшен', 'Тёмное фэнтези', 'Трагикомедия'],
    tags: ['Демоны', 'Охотники', 'Кровь', 'Экшен'],
    description: 'Дэндзи — бедный подросток, вынужденный охотиться на демонов, чтобы выплатить долг покойного отца. После смертельного боя его спасает пёс-демон Почита, сливаясь с ним воедино.',
    author: 'Тацуки Фудзимото',
    artist: 'Тацуки Фудзимото',
    year: 2018,
    chapters: MOCK_CHAPTERS.slice(0, 70),
    views: 6800000,
    bookmarks: 498000,
  },
  {
    id: '5',
    title: 'Omniscient Reader',
    titleRu: 'Всезнающий читатель',
    cover: 'https://picsum.photos/300/420?random=5',
    rating: 9.3,
    status: 'completed',
    type: 'manhwa',
    genres: ['Экшен', 'Фэнтези', 'Триллер'],
    tags: ['Апокалипсис', 'Ким Докья', 'Системный апокалипсис'],
    description: 'Ким Докья — единственный читатель романа «Три способа выжить в апокалипсисе». Когда реальный мир начинает следовать сюжету книги, его знания становятся главным оружием.',
    author: 'Sing Shong',
    artist: 'Sleepy-C',
    year: 2020,
    chapters: MOCK_CHAPTERS.slice(0, 100),
    views: 4100000,
    bookmarks: 287000,
  },
  {
    id: '6',
    title: 'Vagabond',
    titleRu: 'Бродяга',
    cover: 'https://picsum.photos/300/420?random=6',
    rating: 9.6,
    status: 'hiatus',
    type: 'manga',
    genres: ['Приключения', 'Исторические', 'Драма'],
    tags: ['Самурай', 'Япония', 'Боевые искусства', 'Путешествие'],
    description: 'История Миямото Мусаси — легендарного самурая, стремящегося стать непобедимым под небесами. Основано на романе «Мусаси» Эйдзи Ёсикавы.',
    author: 'Такэхико Иноуэ',
    artist: 'Такэхико Иноуэ',
    year: 1998,
    chapters: MOCK_CHAPTERS.slice(0, 60),
    views: 3900000,
    bookmarks: 341000,
  },
  {
    id: '7',
    title: 'Demon Slayer',
    titleRu: 'Истребитель демонов',
    cover: 'https://picsum.photos/300/420?random=7',
    rating: 8.8,
    status: 'completed',
    type: 'manga',
    genres: ['Экшен', 'Исторические', 'Фэнтези'],
    tags: ['Демоны', 'Мечи', 'Тaisho', 'Сёнэн'],
    description: 'Тандзиро Камадо становится охотником на демонов после того, как его семья убита, а сестра превращена в демона. Он стремится вернуть ей человеческий облик.',
    author: 'Коёхару Готоугэ',
    artist: 'Коёхару Готоугэ',
    year: 2016,
    chapters: MOCK_CHAPTERS.slice(0, 50),
    views: 8200000,
    bookmarks: 670000,
  },
  {
    id: '8',
    title: 'The Beginning After the End',
    titleRu: 'Начало после конца',
    cover: 'https://picsum.photos/300/420?random=8',
    rating: 8.9,
    status: 'ongoing',
    type: 'manhwa',
    genres: ['Фэнтези', 'Экшен', 'Приключения'],
    tags: ['Реинкарнация', 'Магия', 'Король', 'Второй шанс'],
    description: 'Могущественный король перерождается в магическом мире с сохранёнными воспоминаниями. Он получает второй шанс, чтобы прожить жизнь иначе, с теплом и любовью.',
    author: 'TurtleMe',
    artist: 'Fuyuki23',
    year: 2018,
    chapters: MOCK_CHAPTERS.slice(0, 110),
    views: 3700000,
    bookmarks: 256000,
  },
];

export const ALL_TAGS = [
  'Сильный герой', 'Реинкарнация', 'Магия', 'Демоны', 'Охотники',
  'Тёмное фэнтези', 'Самурай', 'Апокалипсис', 'Башня', 'Система',
  'Второй шанс', 'Монстры', 'Экшен', 'Средневековье', 'Порталы',
  'Школа', 'Романтика', 'Ужасы', 'Комедия', 'Трагедия',
  'Путешествие во времени', 'Дракон', 'Меч', 'Боевые искусства',
];

export const ALL_GENRES = [
  'Экшен', 'Фэнтези', 'Романтика', 'Приключения', 'Драма',
  'Комедия', 'Ужасы', 'Триллер', 'Исторические', 'Тёмное фэнтези',
  'Трагикомедия', 'Повседневность', 'Сёнэн', 'Сёдзё', 'Сэйнэн',
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Solo Leveling получает аниме-адаптацию второго сезона',
    excerpt: 'Студия A-1 Pictures анонсировала второй сезон популярного аниме с датой выхода на 2025 год.',
    content: 'Студия A-1 Pictures официально анонсировала второй сезон аниме-адаптации Solo Leveling. Премьера запланирована на январь 2025 года. Сезон охватит арку с монархами и покажет полное пробуждение силы Сон Чжин-У. Режиссёр Сюхэй Матано подтвердил, что команда стремится превзойти первый сезон по качеству анимации.',
    cover: 'https://picsum.photos/800/400?random=10',
    date: '14 апреля 2025',
    category: 'Аниме',
    tags: ['Solo Leveling', 'Аниме', 'A-1 Pictures'],
    author: 'Редакция MangaVerse',
  },
  {
    id: 'n2',
    title: 'Берсерк продолжается: анонсированы новые главы',
    excerpt: 'Команда Кентаро Миуры объявила о продолжении манги после долгого перерыва.',
    content: 'Издательство Young Animal официально подтвердило, что манга Берсерк продолжится. Работу над тайтлом возглавит ближайший коллега Кентаро Миуры — Кодзи Мори, который завершит историю согласно замыслу мастера. Первые новые главы ожидаются уже в следующем квартале.',
    cover: 'https://picsum.photos/800/400?random=11',
    date: '10 апреля 2025',
    category: 'Манга',
    tags: ['Берсерк', 'Кентаро Миура', 'Dark Fantasy'],
    author: 'Алексей Громов',
  },
  {
    id: 'n3',
    title: 'Топ-10 лучших манхв 2024 года по версии читателей',
    excerpt: 'Результаты ежегодного читательского голосования: какие тайтлы покорили сердца в этом году.',
    content: 'Подведены итоги ежегодного голосования читателей MangaVerse. В этом году лидером стал Omniscient Reader, набравший рекордное количество голосов. На втором месте расположился Solo Leveling, на третьем — Tower of God. Примечательно, что в топ-10 впервые вошли три маньхуа.',
    cover: 'https://picsum.photos/800/400?random=12',
    date: '5 апреля 2025',
    category: 'Рейтинги',
    tags: ['Топ', 'Рейтинг', '2024', 'Манхва'],
    author: 'Мария Соколова',
  },
  {
    id: 'n4',
    title: 'Chainsaw Man: старт второй части на русском языке',
    excerpt: 'Официальный перевод второй части манги Тацуки Фудзимото наконец доступен на русском.',
    content: 'Официальное издательство объявило о начале публикации второй части Chainsaw Man на русском языке. Новый арк введёт совершенно новых персонажей и неожиданно изменит тональность истории. Первый том уже поступил в продажу.',
    cover: 'https://picsum.photos/800/400?random=13',
    date: '1 апреля 2025',
    category: 'Манга',
    tags: ['Chainsaw Man', 'Официальный перевод', 'Фудзимото'],
    author: 'Иван Петров',
  },
  {
    id: 'n5',
    title: 'Новые функции на MangaVerse: облачные закладки и синхронизация',
    excerpt: 'Мы запустили облачное хранение прогресса чтения и синхронизацию между устройствами.',
    content: 'С сегодняшнего дня все пользователи MangaVerse могут синхронизировать прогресс чтения между устройствами. Ваши закладки, прочитанные главы и история чтения теперь сохраняются в облаке. Функция доступна после регистрации на сайте.',
    cover: 'https://picsum.photos/800/400?random=14',
    date: '28 марта 2025',
    category: 'Новости сайта',
    tags: ['MangaVerse', 'Обновление', 'Функции'],
    author: 'Команда MangaVerse',
  },
  {
    id: 'n6',
    title: 'Интервью с автором Tower of God: планы до конца истории',
    excerpt: 'SIU рассказал о своём видении финала и о том, сколько арков осталось до конца.',
    content: 'В эксклюзивном интервью корейскому изданию автор Tower of God — SIU — рассказал, что история подходит к своей финальной трети. По его словам, осталось ещё несколько крупных арков, прежде чем история достигнет своего заключения. Он также намекнул на возможный камбэк нескольких давно пропавших персонажей.',
    cover: 'https://picsum.photos/800/400?random=15',
    date: '22 марта 2025',
    category: 'Интервью',
    tags: ['Tower of God', 'SIU', 'Интервью'],
    author: 'Анна Белова',
  },
];

export function getReadingProgress(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem('mangaverse_progress') || '{}');
  } catch {
    return {};
  }
}

export function saveReadingProgress(mangaId: string, chapterNumber: number) {
  const progress = getReadingProgress();
  progress[mangaId] = chapterNumber;
  localStorage.setItem('mangaverse_progress', JSON.stringify(progress));
}

export function getBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem('mangaverse_bookmarks') || '[]');
  } catch {
    return [];
  }
}

export function toggleBookmark(mangaId: string): boolean {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(mangaId);
  if (idx === -1) {
    bookmarks.push(mangaId);
    localStorage.setItem('mangaverse_bookmarks', JSON.stringify(bookmarks));
    return true;
  } else {
    bookmarks.splice(idx, 1);
    localStorage.setItem('mangaverse_bookmarks', JSON.stringify(bookmarks));
    return false;
  }
}
