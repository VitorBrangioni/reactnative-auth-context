interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'myToken',
        user: {
          name: 'Vitor Brangioni',
          email: 'vitorh.brangioni@gmail.com',
        },
      });
    }, 2000);
  });
}
