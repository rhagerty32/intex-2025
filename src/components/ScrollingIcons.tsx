import React from 'react'
import './ScollingIcons.css'

type ScrollingIconsProps = {
    icons: React.ReactNode[]
}

export const ScrollingIcons = ({ icons }: ScrollingIconsProps) => {
    return (
        <div className="relative w-full overflow-hidden">
            <div className="animate-scroll flex gap-10 w-max">
                {[...icons, ...icons].map((icon, index) => (
                    <div key={index} className="flex items-center justify-center opacity-60 grayscale transition">
                        {icon}
                    </div>
                ))}
            </div>
        </div>
    )
}