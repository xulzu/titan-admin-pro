//因为不想引入任何npm包，这里只是保存下登录信息。 可以使用@vue/core 中useStorage()等效替代，也可以用pinia等全局状态管理库

export function useLoginStore() {
  return {
    getToken: () => localStorage.getItem("token"),
    setToken: (token: string) => localStorage.setItem("token", token),

    getAccount: () => localStorage.getItem("account"),
    setAccount: (account: string) => localStorage.setItem("account", account),

    getName() {
      return "徐x";
    },
  };
}
