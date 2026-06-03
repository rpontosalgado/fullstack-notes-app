import { Sidebar } from './components/layout/sidebar/Sidebar';
import { NotesPage } from './components/notes/notesPage/NotesPage';
import { Layout, Main } from './styles/App.styles';

export default function App() {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <NotesPage />
      </Main>
    </Layout>
  );
}
