import { Sidebar } from './components/layout/sidebar/Sidebar';
import { Layout, Main } from './styles/App.styles';

export default function App() {
  return (
    <Layout>
      <Sidebar />
      <Main></Main>
    </Layout>
  );
}
