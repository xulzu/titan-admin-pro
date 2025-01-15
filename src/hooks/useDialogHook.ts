import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const rulesRequired = {
  required: true,
  message: '请检查必填项',
  trigger: 'change',
} as RuleObject
/**
  @desc  const { form, formRef, dialogVisible, loading, openDialog, closeHandler, confirmHook } =
  useDialogHook(Form) 
  */
export default function useDialogHook<T>(Form?: { new (initData?: any): T }) {
  const formRef = ref<FormInstance>()
  const form = ref(Form ? new Form() : null) as Ref<T>
  const dialogVisible = ref(false)
  const loading = ref(false)
  let resFn = void 0 as ((params: any) => void) | void,
    rejFn = void 0 as (() => void) | void
  function openDialog(initData?: Partial<T>) {
    form.value = Form ? new Form(initData) : (initData as T)
    dialogVisible.value = true
    return new Promise<any>((res, rej) => {
      resFn = res
      rejFn = rej
    })
  }
  function closeHandler() {
    formRef.value?.resetFields()
    dialogVisible.value = false
    rejFn?.()
    resFn = rejFn = null as any
  }
  //导出一个工具函数方便外部进行处理
  function confirmHook(fn: (form: T, ...args: any[]) => any, closeAfterSubmit = true) {
    return async (...args: any) => {
      try {
        await formRef.value?.validate().catch(() => {
          throw '请检查必填项'
        })
        loading.value = true
        const res = await fn(form.value, ...args)
        dialogVisible.value = !closeAfterSubmit
        resFn(res)
      } catch (error: any) {
        message.error(error + '')
      } finally {
        loading.value = false
      }
    }
  }
  return {
    form,
    formRef,
    dialogVisible,
    loading,
    openDialog,
    closeHandler,
    confirmHook,
    __resolve: resFn,
    __reject: rejFn,
  }
}
