import { useState } from 'react';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import SearchPage from '@/pages/SearchPage';
import BookmarksPage from '@/pages/BookmarksPage';
import ProfilePage from '@/pages/ProfilePage';
import TagsPage from '@/pages/TagsPage';
import MangaPage from '@/pages/MangaPage';
import ReaderPage from '@/pages/ReaderPage';
import NewsPage from '@/pages/NewsPage';
import NewsItemPage from '@/pages/NewsItemPage';

type Page = 'home' | 'catalog' | 'search' | 'bookmarks' | 'profile' | 'tags' | 'manga' | 'reader' | 'news' | 'newsItem';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page as Page);
    setPageParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'reader') {
    return <ReaderPage onNavigate={navigate} params={pageParams} />;
  }

  return (
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'catalog' && <CatalogPage onNavigate={navigate} />}
      {currentPage === 'search' && <SearchPage onNavigate={navigate} />}
      {currentPage === 'bookmarks' && <BookmarksPage onNavigate={navigate} />}
      {currentPage === 'profile' && <ProfilePage onNavigate={navigate} />}
      {currentPage === 'tags' && <TagsPage onNavigate={navigate} params={pageParams} />}
      {currentPage === 'manga' && <MangaPage onNavigate={navigate} params={pageParams} />}
      {currentPage === 'news' && <NewsPage onNavigate={navigate} />}
      {currentPage === 'newsItem' && <NewsItemPage onNavigate={navigate} params={pageParams} />}
    </Layout>
  );
}
