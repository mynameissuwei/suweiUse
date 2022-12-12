import { ref, shallowRef } from 'vue-demi'

const noop = () => {}

function promiseTimeout(
    ms: number,
    throwOnTimeout = false,
    reason = 'Timeout',
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (throwOnTimeout)
        setTimeout(() => reject(reason), ms)
      else
        setTimeout(resolve, ms)
    })
  }

export interface UseAsyncStateOptions {
    delay?: number
    immediate?: boolean
    onError?: (e: unknown) => void
    resetOnExecute?: boolean
    shallow?: boolean
    throwError?: boolean
}

/**
 * @description: 
 * @param promise
 * @param initialState
 * @param options
 */
export function useAsyncState(promise,initialState,options?:UseAsyncStateOptions) {
    const {
        immediate = true,
        delay = 0,
        onError = noop,
        resetOnExecute = true,
        shallow = true,
        throwError,
    } = options ?? {}

    const state = shallow ? shallowRef(initialState) : ref(initialState)
    const isReady = ref(false)
    const isLoading = ref(false)
    const error = ref<unknown | undefined>(undefined)

    async function execute(delay = 0, ...args: any[]) {
        if (resetOnExecute)
          state.value = initialState
        error.value = undefined
        isReady.value = false
        isLoading.value = true
    
        if (delay > 0)
          await promiseTimeout(delay)
    
        const _promise = typeof promise === 'function'
          ? promise(...args)
          : promise
    
        try {
          const data = await _promise
          state.value = data
          isReady.value = true
        }
        catch (e) {
          error.value = e
          onError(e)
          if (throwError)
            throw error
        }
        finally {
          isLoading.value = false
        }
    
        return state.value
    }

    if (immediate)  execute(delay)

    return {
      state,
      isReady,
      isLoading,
      error,
      execute,
    }
}