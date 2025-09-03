"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OptionBar() {
  return (
  <Tabs defaultValue="logical" className="w-full rounded-none">
        <TabsList className="flex h-17 rounded-none border-b border-b-[var(--bsui-border)] w-full justify-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
          <div className="flex space-x-2 ml-4">
            <TabsTrigger
              value="logical"
              className="flex cursor-pointer text-md items-center px-3 py-3 rounded-md text-[var(--bsui-gray-0)] data-[state=active]:bg-[hsl(210,5%,30%)] data-[state=active]:font-semibold hover:bg-[var(--bsui-active)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5  mr-2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
              <span>Logical</span>
            </TabsTrigger>
            <TabsTrigger
              value="physical"
              className="flex cursor-pointer text-md items-center px-3 py-3  text-[var(--bsui-gray-0)] rounded-md data-[state=active]:bg-[hsl(210,5%,30%)] data-[state=active]:font-semibold hover:bg-[var(--bsui-active)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                />
              </svg>
              <span> Physical</span>
            </TabsTrigger>
          </div>
          <div className="ml-auto flex mr-4">
            <button
              type="button"
              className="flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
            >
              <span className="text-sm flex space-x-2">
                <span>Play Project</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#3AE87A"
                  className="size-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </TabsList>

        <TabsContent value="logical" className="w-full flex items-center justify-center">Logic View Here</TabsContent>
        <TabsContent value="physical" className="w-full flex items-center justify-center">Physical View Here.</TabsContent>
      </Tabs>
  );
}
