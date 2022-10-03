import TabHeader from "../TabHeader";
import AddFriendsModal from "./AddFriendsModal";

const FriendsTab = () => {
  return <TabHeader title="Friends" actionItem={<AddFriendsModal />} />;
};

export default FriendsTab;
