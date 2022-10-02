import { Autocomplete, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppModal from "../../../components/AppModal";
import api from "../../../lib/api";
import TabHeader from "../TabHeader";

const FriendsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 400);

  const { data: users = [], isLoading } = useQuery(
    ["searchUsers", debouncedSearchTerm],
    () => api.searchUsers(debouncedSearchTerm),
    {
      enabled: debouncedSearchTerm.length > 0,
      select: (data) => data.map((user) => ({ value: user.name, ...user })),
    }
  );

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <TabHeader
      title="Friends"
      actionItem={
        <AppModal Icon={IconUserPlus} title="Add Friends">
          <Stack>
            <Autocomplete
              data={users}
              label="Search users"
              
              data-autoFocus
              value={searchTerm}
              onChange={handleSearchTermChange}
              nothingFound={searchTerm.length > 0 && !isLoading && "No users found"}
              filter={() => true} // disable filtering since it's done on the server
            />
          </Stack>
        </AppModal>
      }
    />
  );
};

export default FriendsTab;
