import Image from 'next/image';

function AnimalCard() {
  return (
    <div className="relative aspect-square cursor-pointer overflow-hidden">
      <Image
        className="object-cover"
        src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
        sizes="25vw"
        alt=""
        fill
      />
    </div>
  );
}

export default AnimalCard;
