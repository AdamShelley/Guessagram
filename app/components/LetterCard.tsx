
interface LetterProps {
    letter: string
}

export default function LetterCard ({letter}: LetterProps) {
    return (
        <div>{letter}</div>
    )
}