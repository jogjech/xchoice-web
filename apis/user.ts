import axios from "axios";

interface PutUserResult {
  error?: {
    message: string;
  };
  isError: boolean;
}

const putUser = async (accessToken: string): Promise<PutUserResult> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/users`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      isError: false,
    };
  } catch (error) {
    return {
      isError: true,
      error: {
        message: "Failed to put user",
      },
    };
  }
};

export { putUser };
