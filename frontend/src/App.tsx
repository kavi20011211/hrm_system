import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./View/login-view";
import Dashboard from "./View/dashboard-view";

function App() {
  const user: string | null = "SQA";

  return (
    <Router>
      {user ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Layout>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
}

export default App;
