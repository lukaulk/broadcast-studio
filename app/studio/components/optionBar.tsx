"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OptionBar() {
  return (
    <div>
      <Tabs defaultValue="logical" className="w-full rounded-none">
        <TabsList className="flex h-17  rounded-none border-b border-b-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
          <TabsTrigger
            value="logical"
            className="flex items-center px-3 py-3 rounded-md data-[state=active]:bg-[#383B3E] data-[state=active]:font-semibold hover:bg-[var(--bsui-active)]"
          >
            <Image src="/icons/Connect.svg" alt="Logical" width={22} height={22} className="mr-2" />
            Logical
          </TabsTrigger>
          <TabsTrigger
            value="physical"
            className="flex items-center px-3 py-3 rounded-md data-[state=active]:bg-[var(--bsui-actived)] data-[state=active]:font-semibold hover:bg-[var(--bsui-active)]"
          >
            Physical
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logical">Make changes to your account here.</TabsContent>
        <TabsContent value="physical">Change your password here.</TabsContent>
      </Tabs>

      <div className="ml-auto flex mr-4">
        <button
          type="button"
          className="flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
        >
          <span className="text-sm">Execute</span>
        </button>
      </div>
    </div>
  );
}
