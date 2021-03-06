import { InputHTMLAttributes, useState } from 'react'
import * as S from './styles'

type CheckboxValue = string | ReadonlyArray<string> | number

export type CheckboxProps = {
  onCheck?: (status: boolean) => void
  isChecked?: boolean
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  value?: CheckboxValue
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({
  isChecked = false,
  onCheck,
  label,
  labelFor = '',
  labelColor = 'white',
  value,
  ...props
}: CheckboxProps) => {
  //controlled component (state)
  const [checked, setChecked] = useState(isChecked)

  const onChange = () => {
    const status = !checked

    setChecked(status)

    if (onCheck) {
      onCheck(status)
    }
  }

  return (
    <S.Wrapper>
      <S.Input
        onChange={onChange}
        type="checkbox"
        id={labelFor}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label && (
        <S.Label labelColor={labelColor} htmlFor={labelFor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  )
}

export default Checkbox
