const Footer = () => {
  return (
    <footer className="w-full h-52 border-t border-slate-700 bg-black/35 flex justify-center items-center gap-10">
      <div className="font-black text-8xl">
        <span>G</span>
        <span className="text-[#6D28D9]">N</span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">GigaNigga & Co.</h1>
        <p className="w-2/2 text-wrap text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Ipsam
          voluptatem ducimus quaerat architecto numquam culpa cupiditate.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
