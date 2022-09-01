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

const doesChannelExist = async (channelName) => {
  const url = `/api/channel/exists?name=${channelName}`;
  const res = await GET(url);
  return res.doesExist;
};

const createChannel = async (newChannel) => {
  const url = "/api/channel/create";
  const body = newChannel;
  const res = await POST(url, body);
  return res;
};

const api = { doesChannelExist, createChannel };
export default api;
