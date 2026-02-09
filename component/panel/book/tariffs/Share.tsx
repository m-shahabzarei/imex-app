import React from 'react';

function Share({ text } : {text : any}) {
  
  const handleShare = async () => {
    // اضافه کردن امضا به انتهای متن
    const finalShareText = `${text || ''}

اپلیکیشن ایمکس
https://imexapp.ir`.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'اشتراک‌گذاری اطلاعات تعرفه',
          text: finalShareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(finalShareText);
        alert('متن در کلیپ‌بورد کپی شد!');
      } catch (err) {
        console.error('عدم پشتیبانی', err);
      }
    }
  };

  return (
    <div className="flex text-sm text-custom items-center justify-center pb-2 pt-6">
      <div 
        onClick={handleShare} 
        className="cursor-pointer flex gap-2 items-center hover:opacity-80 transition-opacity"
      >
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