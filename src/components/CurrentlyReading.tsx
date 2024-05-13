import classNames from "classnames"

export const CurrentlyReading = ({
  currentWordRange,
  sentence,
  current,
  isPlaying,
  onClick,
}: {
  currentWordRange: [number, number]
  sentence: string
  current: boolean
  isPlaying: boolean
  onClick: () => void
}) => {
  const firstSentencePart = sentence?.substring(0, currentWordRange[0])
  const secondSentencePart = sentence?.substring(currentWordRange[1])

  const currentWord = sentence?.substring(
    currentWordRange[0],
    currentWordRange[1]
  )

  return (
    <div data-testid="currently-reading">
      {current && isPlaying && (
        <p
          className="text-slate-300 font-extrabold mx-auto text-2xl sm:text-3xl bg-gradient-to-r"
          data-testid="current-sentence"
        >
          {firstSentencePart}
          <span
            data-testid="current-word"
            className={classNames({
              "rounded-lg bg-slate-700": true,
              "p-1 -m-1":
                currentWordRange[0] !== 0 && currentWordRange[1] !== 0,
            })}
          >
            {currentWord}
          </span>
          {secondSentencePart}
        </p>
      )}

      {(!current || !isPlaying) && (
        <p
          onClick={onClick}
          className={classNames({
            "font-extrabold mx-auto text-2xl sm:text-3xl text-slate-500 cursor-pointer hover:text-slate-300":
              true,
          })}
          data-testid="current-sentence"
        >
          {sentence}
        </p>
      )}
    </div>
  )
}
