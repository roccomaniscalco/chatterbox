import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconPlus, IconUserPlus, IconUserSearch } from "@tabler/icons";
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
              data={searchTerm.length > 0 ? users : []} // clear options when input is empty
              label="Search chatters"
              icon={<IconUserSearch />}
              rightSection={
                // show loading indicator when user is typing or fetching data
                isLoading && searchTerm.length > 0 && <Loader size="sm" />
              }
              data-autoFocus
              value={searchTerm}
              onChange={handleSearchTermChange}
              nothingFound={
                // show nothing found message when input is not empty and there are no results
                searchTerm.length > 0 && !isLoading && "No chatters found"
              }
              filter={() => true} // disable filtering since it's done on the server
              itemComponent={({ name, email, image, id }) => (
                <div>
                  <Group position="apart" spacing="xs" noWrap>
                    <Group spacing="xs" noWrap>
                      <Avatar src={image}  />
                      <div>
                        <Text size="sm" lineClamp={1}>{name}</Text>
                        <Text size="xs" color="dimmed" lineClamp={1}>
                          {email}
                        </Text>
                      </div>
                    </Group>
                    <ActionIcon variant="default" mr={6}>
                      <IconPlus />
                    </ActionIcon>
                  </Group>
                </div>
              )}
            />
          </Stack>
        </AppModal>
      }
    />
  );
};

export default FriendsTab;
