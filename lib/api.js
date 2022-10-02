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
  const url = `/api/channel/exists?slug=${channelSlug}`;
  const res = await GET(url);
  return res.doesExist;
};

const getChannel = async (channelSlug) => {
  const url = `/api/channel/get?slug=${channelSlug}`;
  const res = await GET(url);
  return res;
};

const getChannelsByUser = async () => {
  const url = "/api/channel/getByUser";
  const res = await GET(url);
  return res;
};

// Channel POSTs

const createChannel = async (newChannel) => {
  const url = "/api/channel/create";
  // convert each value that is an empty string to null
  // TODO: move this to the server
  const body = Object.fromEntries(
    Object.entries(newChannel).map(([key, value]) => [key, value || null])
  );
  const res = await POST(url, body);
  return res;
};

// User GETs

const searchUsers = async (searchTerm) => {
  const url = `/api/user/search?searchTerm=${searchTerm}`;
  const res = await GET(url);
  return res;
};

const api = {
  doesChannelExist,
  getChannel,
  getChannelsByUser,
  createChannel,
  searchUsers,
};
export default api;
