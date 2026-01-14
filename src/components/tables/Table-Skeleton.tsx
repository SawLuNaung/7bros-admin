

import { Skeleton } from '../ui/skeleton';



function TableSekeleton() {
  return (
    <div className=' space-y-3 mt-[10px] w-full'>
    <Skeleton className='tableSkeleton h-8 opacity-100 bg-[#f6f7f8] bg-gradient-to-r from-primary-50 via-white to-primary-50 '/>
    <Skeleton className='tableSkeleton h-8 opacity-100 bg-[#f6f7f8] bg-gradient-to-r from-primary-50 via-white to-primary-50 '/>
    <Skeleton className='tableSkeleton h-8 opacity-100 bg-[#f6f7f8] bg-gradient-to-r from-primary-50 w-[50%] via-white to-primary-50 '/>

    </div>
  )
}

export default TableSekeleton