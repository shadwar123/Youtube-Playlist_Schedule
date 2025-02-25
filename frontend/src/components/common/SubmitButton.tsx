'use client'
 
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button className="w-full rounded-xl bg-zinc-900 text-slate-200" disabled={pending} >{pending ? "Processing..": "Submit"}</Button>
  )
}