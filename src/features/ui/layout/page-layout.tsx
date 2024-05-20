type PageLayoutProps = {
  children: React.ReactElement;
};

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <div>
      <h1>hey there</h1>
      {children}
    </div>
  );
};
