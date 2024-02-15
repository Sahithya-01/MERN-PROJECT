import articles from "./article-content";
import { Link } from "react-router-dom";
import ArticlesList from "../components/ArticlesList";
const ArticlesListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </>
  );
};
export default ArticlesListPage;
