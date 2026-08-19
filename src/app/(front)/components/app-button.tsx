'use client'

export default function AppButton() {
  
  const handleClickMe = () => alert('Hello Next.js');  

  return (
    <button
      onClick={handleClickMe}
      className="inline-flex h-11 items-center justify-center rounded-none border-[3px] border-black bg-black px-6 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black active:border-[5px]"
    >
      Click Me!
    </button>
  );
}