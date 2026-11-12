import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import QuestionList from "./components/QuestionList/QuestionList";
import SidebarFilters from "./components/SidebarFilters/SidebarFilters";

function App() {
  return (
    <Layout>
      <Header />
      <main className="yql__main-content">
        <QuestionList />
        <SidebarFilters />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;

