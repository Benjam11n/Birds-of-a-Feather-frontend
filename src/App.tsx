import "../src/styles/global.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import DarkModeProvider from "./ui/DarkModeProvider";
import DashBoard from "./pages/DashBoard";
import AppLayout from "./ui/AppLayout";
import Friends from "./pages/Friends";
import FYP from "./pages/FYP";
import Account from "./pages/Account";
import PageNotFound from "./ui/PageNotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import AccountStatistics from "./features/users/AccountStatistics";
import AccountDetails from "./features/users/AccountDetails";
import Communities from "./pages/Communities";
import Community from "./pages/Community";
import EditAccount from "./pages/EditAccount";
import Post from "./pages/Post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="communities" element={<Communities />} />
              <Route path="posts/:postId" element={<Post />} />
              <Route path="communities/:communityId" element={<Community />} />
              <Route path="friends" element={<Friends />} />
              <Route path="fyp" element={<FYP />} />
              <Route path="editAccount" element={<EditAccount />} />
              <Route path="account" element={<Account />}>
                <Route path="details" element={<AccountDetails />} />
                <Route path="statistics" element={<AccountStatistics />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "18px",
              maxWidth: "340px",
              padding: "20px 28px",
              borderRadius: "16px",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
