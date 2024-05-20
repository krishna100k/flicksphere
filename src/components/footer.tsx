const Footer = () => {
  return (
    <footer className="w-full h-52 border-t border-slate-700 bg-black/35 flex justify-center items-center gap-10 px-7">
      <div className="font-black text-8xl">
        <span>F</span>
        <span className="text-[#6D28D9]">S</span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">FlickSphere & Co.</h1>
        <p className="w-2/2 text-wrap text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Ipsam
          voluptatem ducimus quaerat architecto numquam culpa cupiditate.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
