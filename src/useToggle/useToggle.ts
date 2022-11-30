import { ref, isRef } from 'vue'
import type { Ref } from 'vue'


type MaybeRef<T> = T | Ref<T>

const useToggle = (initialValue: MaybeRef<boolean>) => {
    const _value = ref(initialValue)
    
    function toggle(value?: boolean) {
        let len = arguments.length
    }
}