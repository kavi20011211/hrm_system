import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./View/login-view";
import Dashboard from "./View/dashboard-view";
import RegisterPage from "./View/register-view";
import JobPost from "./View/job-post-view";
import AdminUserPage from "./View/admin-view";

import { MantineProvider } from "@mantine/core";
import { FC, useState } from "react";
interface Props {}
const App: FC<Props> = () => {
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<any | undefined>();

  return (
    <MantineProvider>
      <Router>
        {user ? (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/job-post" element={<JobPost />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin-user" element={<AdminUserPage />} />
            </Routes>
          </Layout>
        ) : (
          <LoginPage setToken={setToken} setUser={setUser} />
        )}
      </Router>
    </MantineProvider>
  );
};

export default App;
