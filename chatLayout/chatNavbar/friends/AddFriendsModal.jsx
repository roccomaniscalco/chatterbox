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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AppModal from "../../../components/AppModal";
import api from "../../../lib/api";
import { friendshipStatus } from "../../../lib/constants";

const UserSearchResultsItem = ({ user }) => {
  const queryClient = useQueryClient();

  const { mutate: upsertFriendship, isLoading: isUpsertingFriendship } =
    useMutation(api.upsertFriendship, {
      onSuccess: () => {
        return queryClient.invalidateQueries(["searchUsers"]);
      },
    });

  return (
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

      <Button
        onClick={() => upsertFriendship(user.id, friendshipStatus.REQUESTED)}
        loading={isUpsertingFriendship}
        variant="filled"
        color
        compact
      >
        Request
      </Button>
    </Group>
  );
};

const AddFriendsModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 400);

  const { data: users, isFetching: isFetchingUsers } = useQuery(
    ["searchUsers", debouncedSearchTerm],
    () => api.searchUsers(debouncedSearchTerm),
    {
      initialData: [],
      enabled: debouncedSearchTerm.length > 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const handleSearchTermChange = (event) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
  };

  const showUserSearchResults = searchTerm.length > 0;
  const showInputLoader =
    searchTerm.length > 0 &&
    (searchTerm !== debouncedSearchTerm || isFetchingUsers);

  return (
    <AppModal Icon={IconUserPlus} title="Add Friends">
      <Stack>
        <TextInput
          value={searchTerm}
          onChange={handleSearchTermChange}
          rightSection={showInputLoader && <Loader size="sm" />}
          icon={<IconUserSearch />}
          placeholder="Search for friends to add"
          data-autofocus
          autoComplete="off"
        />

        {showUserSearchResults &&
          users.map((user) => (
            <UserSearchResultsItem user={user} key={user.id} />
          ))}
      </Stack>
    </AppModal>
  );
};

export default AddFriendsModal;
