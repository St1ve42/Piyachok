import TabMenu from "@/src/components/ui/tab-menu/TabMenu";

export default function NewsPage() {
  return <div className="flex justify-between">
      <div className="w-[20%] text-center">Фільтрація</div>
      <div className="w-[70%]">
          <TabMenu/>
      </div>
  </div>
}


