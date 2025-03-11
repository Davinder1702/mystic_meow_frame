"use client";

import { Header } from '@/components/sections/header';
import { FortuneTeller } from '@/components/sections/fortune-teller';
import { SocialSharing } from '@/components/sections/social-sharing';
import { PremiumSection } from '@/components/sections/premium-section';
import { useEffect, useState } from 'react';
import frameSdk, { Context } from '@farcaster/frame-sdk'
/**
 * MysticMeow - Feline Fortune Telling Application
 * 
 * A whimsical fortune telling app featuring a cosmic cat that provides
 * random positive predictions when users interact with the crystal ball.
 * 
 * Features:
 * - Random fortune generation
 * - Social sharing capabilities
 * - Premium prediction options
 */
function Home({ context }: { context: Context.FrameContext }) {
  console.log("mounts")
    if (context) {
      
      console.log('User interaction:', context);
    }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <main className="max-w-md w-full px-4 py-8 flex flex-col items-center">
        <Header />
        <FortuneTeller  />
        <SocialSharing />
        <PremiumSection />
      </main>
    </div>
  );
}

export default function App() {
  const [context, setContext] = useState<Context.FrameContext | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getContext() {
      try {
        const fetchedContext = await frameSdk.context
        setContext(fetchedContext)
      } catch (error) {
        setError(error instanceof Error ? error.message : `${error}`)
      } finally {
        return frameSdk.actions.ready({})
      }
    }
    void getContext()
  }, [])

  return (
    <div className="container prose mx-auto max-w-prose bg-[#312e81]">
      {error === null ? (
        context === null ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                <span className="text-lg font-medium text-white/90">Loading frame context...</span>
              </div>
            </div>
          </div>
        ) : (
          <Home context={context} />
        )
      ) : (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-200">{error}</div>
      )}
    </div>
  )
}