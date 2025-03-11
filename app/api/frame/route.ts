import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // The body will contain user information
    // const {
    //   untrustedData: {
    //     fid,          // Farcaster user ID
    //     messageHash,  // Unique hash of the frame action
    //     buttonIndex, // Which button was clicked
    //     inputText,   // Any text input if present
    //     castId,     // ID of the cast containing the frame
    //   },
    //   trustedData: {
    //     messageBytes // Verified message bytes
    //   }
    // } = body

    console.log(body, "body")

    return new Response(
      JSON.stringify({
        version: "vNext",
        image: "https://mystic-meow.vercel.app/frames/response.png",
        buttons: [
          {
            label: "Get Another Fortune",
            action: "post"
          }
        ]
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error handling frame action:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    )
  }
}