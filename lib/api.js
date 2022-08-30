const fetcher = async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const resJson = await res.json();
    const error = new Error(resJson.message);
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const GET = async (url) => {
  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

const getChannel = async (channelName) => {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/get-channel/${channelName}`;
  const res = await GET(url);
  return res;
};

const createChannel = async (newChannel) => {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/create-channel`;
  const body = newChannel;
  const res = await POST(url, body);
  return res;
};

const api = { getChannel, createChannel };
export default api;
