import Component from "./component";

export default function ElementBar() {
  return (
    <div className="flex w-full justify-center select-none">
      <div className="flex min-h-40 max-h-45 rounded-none border-t border-t-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
        <div className="flex items-center min-w-20">
          <div className="flex space-x-4 items-center">
            <Component icon="/dvc/laptop.png" name="PC" type="End Device" />
            <Component icon="/dvc/router.png" name="Router" type="Wireless Device" />
            <Component icon="/dvc/switch.png" name="Switch" type="Connect Device" />
            <Component icon="/dvc/server.png" name="Server" type="End Device" />
            <Component icon="/dvc/smartphone.png" name="Smartphone" type="End Device" />
            <Component icon="/dvc/desktop.png" name="Desktop" type="End Device" />
            
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
    </div>
  );
}
