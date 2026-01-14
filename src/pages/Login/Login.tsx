import { CardWithForm } from "../../components/ui/login_card"
import { cn } from "../../lib/utils"

export const Login = () => {
  return (
    <div className={cn('bg-gradient-to-r from-emerald-600 from-10% via-emerald-600 via-30% to-emerald-700 to-90% h-[100svh]','flex items-center justify-center','px-[20px]')}>
           <CardWithForm/>
    </div>
  )
}
