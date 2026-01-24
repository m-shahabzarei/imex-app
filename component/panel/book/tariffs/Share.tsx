function Share() {
  return (
    <div className="flex text-sm text-custom items-center justify-center pb-2 pt-6">
      <div className="cursor-pointer flex gap-2 items-center">
        <div
          className="w-5 h-5 bg-custom"
          style={{
            maskImage: "url('/image/Export.svg')",
            WebkitMaskImage: "url('/image/Export.svg')",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
        />
        <span>اشتراک گذاری</span>
      </div>
    </div>
  );
}
export default Share;