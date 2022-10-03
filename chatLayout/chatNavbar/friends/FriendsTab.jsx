import {
  Avatar,
  Button,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconUserPlus, IconUserSearch } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppModal from "../../../components/AppModal";
import api from "../../../lib/api";
import TabHeader from "../TabHeader";

const FriendsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebouncedValue(
    searchTerm,
    400
  );

  const { data: users, isFetching } = useQuery(
    ["searchUsers", debouncedSearchTerm],
    () => api.searchUsers(debouncedSearchTerm),
    {
      initialData: [],
      enabled: debouncedSearchTerm.length > 0,
    }
  );

  const isDebouncing = searchTerm !== debouncedSearchTerm;
  const handleSearchTermChange = (event) => {
    const value = event.currentTarget.value;
    if (value === "") setDebouncedSearchTerm(value);
    setSearchTerm(value);
  };

  return (
    <TabHeader
      title="Friends"
      actionItem={
        <AppModal Icon={IconUserPlus} title="Add Friends">
          <Stack>
            <TextInput
              placeholder="Search for friends to add..."
              icon={<IconUserSearch />}
              rightSection={
                (isFetching || isDebouncing) && <Loader size="sm" />
              }
              data-autofocus
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />

            {users.map((user) => (
              <Group position="apart" spacing="xs" noWrap key={user.id}>
                <Group spacing="xs" noWrap>
                  <Avatar src={user.image} />
                  <div>
                    <Text size="sm" lineClamp={1}>
                      {user.name}
                    </Text>
                    <Text size="xs" color="dimmed" lineClamp={1} mt={-2}>
                      {user.email}
                    </Text>
                  </div>
                </Group>
                <Button variant="filled" color compact>
                  Request
                </Button>
              </Group>
            ))}
          </Stack>
        </AppModal>
      }
    />
  );
};

export default FriendsTab;
