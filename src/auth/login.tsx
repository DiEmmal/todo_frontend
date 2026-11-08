import { CustomHeader } from "../shared/components/CustomHeader";

export const LoginPage = () => {
  return (
    <section className="bg-app">
      <CustomHeader title="Login" link={{ to: "/", text: "Home" }} />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2>Currently in development</h2>
      </div>
    </section>
  );
};
