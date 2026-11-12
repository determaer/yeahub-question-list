import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Main from "./components/Main/Main";
import QuestionList from "./components/QuestionList/QuestionList";
import SidebarFilters from "./components/SidebarFilters/SidebarFilters";

function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <QuestionList />
        <SidebarFilters />
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
