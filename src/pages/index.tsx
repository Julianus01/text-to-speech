import { Inter } from "next/font/google"
import { useSpeech } from "../components/useSpeech"
import { CurrentlyReading } from "../components/CurrentlyReading"
import React, { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

const SENTENCES = [
  `My wife told me to stop impersonating a flamingo. I had to put my foot down.`,
  `I went to buy some camo pants but couldn’t find any.`,
  `I failed math so many times at school, I can’t even count.`,
  `I used to have a handle on life, but then it broke.`,
  `I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.`,
  `I heard there were a bunch of break-ins over at the car park. That is wrong on so many levels.`,
  `I want to die peacefully in my sleep, like my grandfather… Not screaming and yelling like the passengers in his car.`,
  `When life gives you melons, you might be dyslexic.`,
  `Don’t you hate it when someone answers their own questions? I do.`,
  `It takes a lot of balls to golf the way I do.`,
  `I told him to be himself; that was pretty mean, I guess.`,
  `I know they say that money talks, but all mine says is ‘Goodbye.’`,
  `My father has schizophrenia, but he’s good people.`,
  `The problem with kleptomaniacs is that they always take things literally.`,
  `I can’t believe I got fired from the calendar factory. All I did was take a day off.`,
  `Most people are shocked when they find out how bad I am as an electrician.`,
  `Never trust atoms; they make up everything.`,
  `My wife just found out I replaced our bed with a trampoline. She hit the ceiling!`,
  `I was addicted to the hokey pokey, but then I turned myself around.`,
  `I used to think I was indecisive. But now I’m not so sure.`,
  `Russian dolls are so full of themselves.`,
  `The easiest time to add insult to injury is when you’re signing someone’s cast.`,
  `Light travels faster than sound, which is the reason that some people appear bright before you hear them speak.`,
  `My therapist says I have a preoccupation for revenge. We’ll see about that.`,
  `A termite walks into the bar and asks, ‘Is the bar tender here?’`,
  `A told my girlfriend she drew her eyebrows too high. She seemed surprised.`,
  `People who use selfie sticks really need to have a good, long look at themselves.`,
  `Two fish are in a tank. One says, ‘How do you drive this thing?’`,
  `I always take life with a grain of salt. And a slice of lemon. And a shot of tequila.`,
  `Just burned 2,000 calories. That’s the last time I leave brownies in the oven while I nap.`,
  `Always borrow money from a pessimist. They’ll never expect it back.`,
  `Build a man a fire and he’ll be warm for a day. Set a man on fire and he’ll be warm for the rest of his life.`,
  `I don’t suffer from insanity—I enjoy every minute of it.`,
  `The last thing I want to do is hurt you; but it’s still on the list.`,
  `The problem isn’t that obesity runs in your family. It’s that no one runs in your family.`,
  `Today a man knocked on my door and asked for a small donation toward the local swimming pool. I gave him a glass of water.`,
  `I’m reading a book about anti-gravity. It’s impossible to put down.`,
  `‘Doctor, there’s a patient on line one that says he’s invisible.’ ‘Well, tell him I can’t see him right now.’`,
  `Atheism is a non-prophet organization.`,
  `A recent study has found that women who carry a little extra weight live longer than the men who mention it.`,
]

function pickNRandomItemsFromArray(array: string[], N: number = 5) {
  // Make a copy of the original array to avoid modifying it
  const newArray = [...array]
  const result = []

  // Pick N random items
  for (let i = 0; i < N; i++) {
    // Generate a random index within the current length of the array
    const randomIndex = Math.floor(Math.random() * newArray.length)
    // Remove the item at the randomly selected index from the array and add it to the result
    result.push(newArray.splice(randomIndex, 1)[0])
  }

  return result
}

export default function Home() {
  const [sentences, setSentences] = useState<string[]>([])
  const speechData = useSpeech(sentences)

  useEffect(() => {
    setSentences(pickNRandomItemsFromArray(SENTENCES))
  }, [])

  const randomizeData = () => {
    setSentences(pickNRandomItemsFromArray(SENTENCES))
  }

  return (
    <main
      className={`flex min-h-screen flex-col bg-slate-900 items-center justify-between p-8 pb-24 sm:p-24 ${inter.className}`}
    >
      <div className="max-w-xl w-full space-y-8">
        {sentences.map((sentence, index) => (
          <CurrentlyReading
            onClick={() => speechData.controls.playSentence(index)}
            key={index}
            currentWordRange={speechData.currentWordRange}
            sentence={sentence}
            current={index === speechData.currentSentenceIdx}
            isPlaying={speechData.playbackState === "playing"}
          />
        ))}
      </div>

      <div className="fixed bottom-8 flex items-center space-x-4">
        {speechData.playbackState === "paused" && (
          <button
            onClick={speechData.play}
            className="flex items-center justify-center bg-white p-4 text-center text-gray-700 rounded-full border hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 dark:hover:border-gray-600 disabled:pointer-events-none disabled:opacity-50 dark:disabled:opacity-30 dark:disabled:pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </button>
        )}

        {speechData.playbackState === "playing" && (
          <button
            onClick={speechData.pause}
            className="flex items-center justify-center bg-white p-4 text-center text-gray-700 rounded-full border hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 dark:hover:border-gray-600 disabled:pointer-events-none disabled:opacity-50 dark:disabled:opacity-30 dark:disabled:pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          </button>
        )}

        <button
          disabled={speechData.playbackState === "playing"}
          onClick={randomizeData}
          className="flex space-x-3 items-center justify-center bg-white p-4 text-center text-gray-700 rounded-full border hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 dark:hover:border-gray-600 disabled:pointer-events-none disabled:opacity-50 dark:disabled:bg-grey-800 dark:disabled:pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <div>New Jokes</div>
        </button>
      </div>
    </main>
  )
}
