import TabHeader from "../TabHeader";
import AddFriendsModal from "./AddFriendsModal";
import Friendships from "./Friendships";

const FriendsTab = () => {
  return (
    <>
      <TabHeader title="Friends" actionItem={<AddFriendsModal />} />
      <Friendships />
    </>
  );
};

export default FriendsTab;
