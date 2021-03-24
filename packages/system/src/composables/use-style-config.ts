import { computed, ComputedRef } from 'vue'
import { SystemStyleObject } from '@chakra-ui/styled-system'
import { ThemingProps } from '../system.types'
import { filterUndefined, get, mergeWith, runIfFn } from '@chakra-ui/vue-utils'
import { useChakra } from './use-chakra'

export function useStyleConfig(
  themeKey: string,
  themingProps: ThemingProps,
  options: { isMultiPart: true },
  userStyleConfig?: any
): ComputedRef<Record<string, SystemStyleObject>>

export function useStyleConfig(
  themeKey: string,
  themingProps?: ThemingProps,
  options?: { isMultiPart?: boolean },
  userStyleConfig?: any
): ComputedRef<SystemStyleObject>

export function useStyleConfig(
  themeKey: any,
  themingProps: any,
  options: any = {},
  userStyleConfig?: any
) {
  const { theme, colorMode } = useChakra()
  const themeStyleConfig = get(theme, `components.${themeKey}`)

  const styleConfig = userStyleConfig || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(themingProps)
  )

  return computed(() => {
    const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)
    const variants = runIfFn(
      styleConfig.variants?.[mergedProps.variant] ?? {},
      mergedProps
    )

    const sizes = runIfFn(
      styleConfig.sizes?.[mergedProps.size] ?? {},
      mergedProps
    )

    type ComponentStyles = SystemStyleObject | Record<string, SystemStyleObject>
    const styles = mergeWith({}, baseStyles, sizes, variants) as ComponentStyles

    if (options.isMultiPart && styleConfig.parts) {
      styleConfig.parts.forEach((part: string) => {
        styles[part] = styles[part] ?? {}
      })
    }

    return styles
  })
}

export function useMultiStyleConfig(themeKey: string, themingProps: any) {
  return useStyleConfig(themeKey, themingProps, { isMultiPart: true })
}
