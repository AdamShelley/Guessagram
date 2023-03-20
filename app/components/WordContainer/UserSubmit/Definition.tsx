
type WordDefinition = {
    def: string
}

export default function Definition({def}: WordDefinition){
    return (

        <div className="flex flex-col text-left p-3 border border-slate-600 bg-slate-700 rounded-md mt-10">
            <p className="font-bold tracking-wide">Definition: </p>
            <p className="mt-2">{def}</p>
            </div>
    )
}