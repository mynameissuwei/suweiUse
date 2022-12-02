import { ref, isRef,unref } from 'vue'
import type { Ref } from 'vue'


type MaybeRef<T> = T | Ref<T>

interface UseToggleOptions<Truthy, Falsy> {
    truthyValue?: Truthy
    falsyValue?: Falsy
  }

function resolveUnref(r) {
    return typeof r === 'function'
      ? (r as any)()
      : unref(r)
  }

export function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(initialValue?: T, options?: UseToggleOptions<Truthy, Falsy>): [Ref<T>, (value?: T) => T]


export function useToggle(
    initialValue: MaybeRef<boolean> = false,
    options: UseToggleOptions<true, false> = {},
  ) {
    const {
      truthyValue = true,
      falsyValue = false,
    } = options
    const valueIsRef = isRef(initialValue)
    const _value = ref(initialValue) as Ref<boolean>
  
    function toggle(value?: boolean) {
      
      // has arguments
      if (arguments.length) {
        _value.value = value!
        return _value.value
      }
      else {
        const truthy = resolveUnref(truthyValue)
        _value.value = _value.value === truthy
          ? resolveUnref(falsyValue)
          : truthy
        return _value.value
      }
    }
  
    if (valueIsRef) {
      return toggle
    } else {
      return [_value, toggle] 
    }
  }