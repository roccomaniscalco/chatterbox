import ChatHeader from "../../layouts/chat/ChatHeader";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

const SpecificChat = () => {
  return (
    <>
      <ChatHeader />
    </>
  );
};

SpecificChat.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SpecificChat;
