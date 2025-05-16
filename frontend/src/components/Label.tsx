type LabelProps= {
    stringLabel:string
    styling:string
}

export default function Label({stringLabel, styling}:LabelProps) {
    const className = "rounded-2xl px-1.5 flex justify-center w-fit" + " " + styling
    return (
        <div className={className}><span>{stringLabel}</span>
        </div>
    )
}