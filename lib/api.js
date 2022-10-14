const fetcher = async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const resJson = await res.json();
    const error = new Error();
    error.status = res.status;
    error.message = resJson.message;
    throw error;
  }

  return res.json();
};

const GET = async (url) => {
  return fetcher(url, {
    method: "GET",
  });
};

const POST = async (url, body) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return fetcher(url, options);
};

// Channel GETs

const doesChannelExist = async (channelSlug) => {
  const url = `/api/protected/channel/exists?slug=${channelSlug}`;
  const res = await GET(url);
  return res.doesExist;
};

const getChannel = async (channelSlug) => {
  const url = `/api/protected/channel/get?slug=${channelSlug}`;
  const res = await GET(url);
  return res;
};

const getChannelsByUser = async () => {
  const url = "/api/protected/channel/getAll";
  const res = await GET(url);
  return res;
};

// Channel POSTs

const createChannel = async ({ slug, name, description, image }) => {
  const url = "/api/protected/channel/create";
  const body = { slug, name, description, image };
  const res = await POST(url, body);
  return res;
};

// User GETs

const searchUsers = async (searchTerm) => {
  const url = `/api/protected/user/search?searchTerm=${searchTerm}`;
  const res = await GET(url);
  return res;
};

const getFriendships = async () => {
  const url = "/api/protected/user/friendships";
  const res = await GET(url);
  return res;
};

// User POSTs

const upsertFriendship = async ({ receiverId, status }) => {
  const url = "/api/protected/user/upsertFriendship";
  const body = { receiverId, status };
  const res = await POST(url, body);
  return res;
};

const api = {
  doesChannelExist,
  getChannel,
  getChannelsByUser,
  createChannel,
  searchUsers,
  getFriendships,
  upsertFriendship,
};

export default api;
