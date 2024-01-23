import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/features/authentication/SignUpForm";

function Login() {
  return (
    <main className="mt-4 flex flex-col items-center justify-center gap-4">
      <Logo />

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Log in</TabsTrigger>
          <TabsTrigger value="password">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Please enter your username and password to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center space-y-2">
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Welcome! To create a new account, please enter your desired
                username, email and a secure password.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center space-y-2">
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Login;
