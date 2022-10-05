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
import { IconCheck, IconUserPlus, IconUserSearch } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AppModal from "../../../components/AppModal";
import api from "../../../lib/api";
import { friendshipStatus } from "../../../lib/constants";

const UserAction = ({ user, upsertFriendship, isUpsertingFriendship }) => {
  if (user.friendship?.status === friendshipStatus.ACCEPTED)
    return (
      <Group spacing={4}>
        <IconCheck size={16} />
        <Text size="sm">Added</Text>
      </Group>
    );

  if (
    user.friendship?.status === friendshipStatus.REQUESTED &&
    user.id === user.friendship?.receiverId
  )
    return (
      <Button
        onClick={() =>
          upsertFriendship({
            receiverId: user.id,
            status: friendshipStatus.DECLINED,
          })
        }
        loading={isUpsertingFriendship}
        variant="filled"
        color
        compact
      >
        Unsend Request
      </Button>
    );

  if (
    user.friendship?.status === friendshipStatus.REQUESTED &&
    user.id === user.friendship?.senderId
  )
    return (
      <Group spacing="xs" noWrap>
        <Button
          onClick={() =>
            upsertFriendship({
              receiverId: user.id,
              status: friendshipStatus.ACCEPTED,
            })
          }
          loading={isUpsertingFriendship}
          variant="filled"
          color="green"
          compact
        >
          Accept
        </Button>
        <Button
          onClick={() =>
            upsertFriendship({
              receiverId: user.id,
              status: friendshipStatus.DECLINED,
            })
          }
          loading={isUpsertingFriendship}
          variant="filled"
          color="red"
          compact
        >
          Decline
        </Button>
      </Group>
    );

  return (
    <Button
      onClick={() =>
        upsertFriendship({
          receiverId: user.id,
          status: friendshipStatus.REQUESTED,
        })
      }
      loading={isUpsertingFriendship}
      variant="filled"
      color
      compact
    >
      Request
    </Button>
  );
};

const User = ({ user }) => {
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
      <UserAction
        user={user}
        upsertFriendship={upsertFriendship}
        isUpsertingFriendship={isUpsertingFriendship}
      />
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
    }
  );

  const handleSearchTermChange = (event) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
  };

  const showUsers = searchTerm.length > 0;
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
        {showUsers && users.map((user) => <User user={user} key={user.id} />)}
      </Stack>
    </AppModal>
  );
};

export default AddFriendsModal;
