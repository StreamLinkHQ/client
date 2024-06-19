import { Navbar, Footer } from "../base";

type HomeLayoutProps = {
  children: React.ReactElement;
};

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="w-full min-h-screen bg-[#222] relative font-merriweather">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
