import { useState } from 'react'
import { entries } from 'lodash'

type OnSubmit<T> = (values: T) => void

type BindOptions = React.InputHTMLAttributes<unknown> & {
  label?: string
}

type BindResult<T> = {
  name: keyof T
  value: T[keyof T]
  placeholder: string
  onChange: (e: React.ChangeEvent<unknown>) => void
  type: string
  trim?: boolean
  required?: boolean
}

type FormProps<T> = {
  initialValues?: Partial<T>
  values?: Partial<T>
}

export function useForm<
  T extends Record<string, string | number | boolean>,
  R = T,
>(props: FormProps<T>) {
  const [values, setValues] = useState<Partial<T>>(props.initialValues || {})
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const configIndex = {} as Partial<Record<keyof T, BindResult<T>>>

  const [updatedValues, setUpdatedValues] = useState<Partial<T>>(values)

  // useEffect(() => {
  //   if (!props.values) return

  //   setValues(props.values)
  // }, [props.values])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedValues({ ...updatedValues, [e.target.name]: e.target.value })
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const validate = (values: Partial<T>) => {
    return entries(values).every(([key, value]) => {
      const errors = {} as Partial<Record<keyof T, string>>

      if (configIndex[key as keyof T]?.trim) {
        // todo: this
        // @ts-expect-error fuck off typescript
        value = (value as string)?.trim()
      }

      if (configIndex[key as keyof T]?.required) {
        if (!value) {
          errors[key as keyof T] = 'Required'
        }
      }

      setErrors(errors)
      return true
    })
  }

  const handleSubmit = (onSubmit: OnSubmit<T>) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (validate(values)) {
        onSubmit(values as T)
      } else {
        console.error('Invalid form', errors)
      }
    }
  }

  const bind = (key: keyof T, options?: BindOptions) => {
    const bindResult = {
      id: `input-${key as string}`,
      name: key,
      value: values[key],
      onChange: handleChange,
      type: 'text',
      ...options,
    }

    // @ts-expect-error fuck off typescript
    configIndex[key as keyof T] = bindResult

    return bindResult as any
  }

  const setValue = (key: keyof T, value: T[keyof T]) => {
    setValues({ ...values, [key]: value })
    setUpdatedValues({ ...updatedValues, [key]: value })
  }

  const watch = (key: keyof T) => {
    return values[key]
  }

  const update = (partial: Partial<T>) => {
    setValues({ ...values, ...partial })
    setUpdatedValues({ ...updatedValues, ...partial })
  }

  const reset = () => {
    setValues(props.values || props.initialValues || {})
    setUpdatedValues({})

    // find the first input with autoFocus and focus it

    const values = Object.values(configIndex)

    console.log('bindresults', values)

    const matchId = values.find(
      // @ts-expect-error fuck off typescript
      (bindResult) => bindResult.id,
      // @ts-expect-error fuck off typescript
    )?.id

    console.log('matchId', matchId)

    if (matchId) {
      document.getElementById(matchId)?.focus()
    }
  }

  return {
    values,
    handleChange,
    handleSubmit,
    bind,
    reset,
    errors,
    validate,
    updatedValues,
    update,
    setValue,
    errorCount: Object.keys(errors).length,
    watch,
  }
}
