import Image from "next/image";

function Avatar ({ src, alt }) {
    return (
        <div className="flex items-center justify-center m-2.5"> {/* Adjusted the margin to 10px */}
            <Image 
                loading="lazy"
                src={src}
                alt={alt}
                className="max-w-md"
                width={20}
                height={20}
            />
        </div>
    )
}

export default Avatar;