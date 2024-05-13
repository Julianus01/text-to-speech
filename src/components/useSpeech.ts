import { useEffect, useRef, useState } from 'react';
import { PlayingState, SpeechEngine, createSpeechEngine } from './speech';

const useSpeech = (sentencesProp: Array<string>) => {
  const [sentences, setSentences] = useState<string[]>(sentencesProp)
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const currentSentence = sentences[currentSentenceIdx]

  const speechEngineRef = useRef<SpeechEngine>(createSpeechEngine({
    onBoundary: (event) => {
      setCurrentWordRange([event.charIndex, event.charIndex + event.charLength])
    },

    onEnd: () => {
      setCurrentSentenceIdx(prev => prev + 1)
      setCurrentWordRange([0, 0])
    },

    onStateUpdate: () => { },
  }))

  // Reset all state if sentences change
  useEffect(() => {
    setSentences(sentencesProp)
    setCurrentSentenceIdx(0)
    setCurrentWordRange([0, 0])
    setPlaybackState('paused')
  }, [sentencesProp])

  useEffect(() => {
    return () => {
      cancel()
    }
  }, [])

  // When index gets out of bounds, stop playing and reset to first sentence
  useEffect(() => {
    if (currentSentenceIdx > sentences?.length - 1) {
      setCurrentSentenceIdx(0)
      setPlaybackState('paused')
    }
  }, [sentences, currentSentenceIdx])

  // Load sentence to say
  useEffect(() => {
    speechEngineRef.current?.load(currentSentence)
  }, [currentSentence])

  // Continuosly play the current sentence if it changes and we are in playing state
  useEffect(() => {
    if (currentSentence && playbackState === 'playing') {
      speechEngineRef.current?.play()
    }
  }, [playbackState, currentSentence])

  const playSentence = (index: number) => {
    setCurrentSentenceIdx(index)
    setCurrentWordRange([0, 0])
    play()
  }

  const play = () => {
    setPlaybackState('playing')
  };

  const pause = () => {
    speechEngineRef.current?.pause()
    setPlaybackState('paused')
  };

  const cancel = () => {
    speechEngineRef.current?.cancel()
    setPlaybackState('ended')
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    sentences,

    controls: {
      play,
      pause,
      cancel,
      playSentence
    }
  };
};

export { useSpeech };
