export default function signIn() {
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
