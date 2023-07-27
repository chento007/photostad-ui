export default function Skeleton() {
  return (
    <div className="p-10">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-4">
        <div class="skeleton h-screen row-span-3 rounded-main"></div>
        <div class="skeleton h-24 rounded-main"></div>
        <div class="skeleton h-24 rounded-main"></div>
        <div class="skeleton h-24 rounded-main"></div>
        <div class="skeleton h-72 rounded-main col-start-2 col-end-4 "></div>
        <div class="skeleton h-72 rounded-main"></div>
        <div class="skeleton h-72 rounded-main col-start-2 col-end-4 "></div>
      </div>
    </div>
  );
}
