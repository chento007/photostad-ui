const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* box 1 */}
    <div className="skeleton rounded-main shadow-sm  flex flex-col justify-center items-center h-[170px]">
      
    </div>
    {/* box 2 */}
    <div className="skeleton rounded-main shadow-sm  flex flex-col justify-center items-center h-[170px]">
      
    </div>
    {/* box 3 */}
    <div className=" rounded-main shadow-sm skeleton flex flex-col justify-center items-center h-[170px]">
     
    </div>
  </div>
  )
}
export default Skeleton