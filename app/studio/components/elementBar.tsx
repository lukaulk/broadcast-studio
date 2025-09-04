import Component from "./component";

export default function ElementBar() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex min-h-38 max-h-40 rounded-none border-t border-t-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
        {/* Components Horizontal Scroll List */}
        
          <div className="flex items-center min-w-20">
           <Component icon="/dvc/tv.png" name="TV" type="End Device"/>

            <div className="w-12 h-12 bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] rounded-md flex items-center justify-center hover:bg-[var(--bsui-active)] active:scale-95 cursor-pointer">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>


          </div>
          
        </div>
      </div>
  );
}
