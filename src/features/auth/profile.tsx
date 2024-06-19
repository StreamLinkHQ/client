import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import { HomeLayout } from "../ui";

const Profile = () => {
  return (
    <HomeLayout>
      <div className="w-[85%] lg:w-[30%] mx-auto my-14">
        <DynamicEmbeddedWidget background="with-border" />
      </div>
    </HomeLayout>
  );
};

export default Profile;
