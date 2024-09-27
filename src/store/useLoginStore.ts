//因为不想引入任何npm包，这里只是保存下登录信息。 可以使用@vue/core 中useStorage()等效替代，也可以用pinia等全局状态管理库
import { useStorage } from '@vueuse/core'

interface LoginUser {
  username: string
  employeeId: string
  dept: Dept
  etoken: string
}

interface Dept {
  id: string
  name: string
  pid: string
  enabled: boolean
}

const useInfo = useStorage<Partial<LoginUser>>('userInfo', {})
export function useLoginStore() {
  return useInfo
}
