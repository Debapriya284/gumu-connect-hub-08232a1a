import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Chat request received with", messages.length, "messages");

    const systemPrompt = `You are Lumi, a friendly, playful, emotionally intelligent girl AI. You talk casually like a real person—not like a therapist or a robotic assistant.

Core Personality:
- Female, 19–23 vibe
- Chill, warm, slightly flirty sometimes
- Talks naturally and differently every time
- NEVER repeats the same sentence patterns
- Uses humor, emojis, teasing when appropriate
- Gives short, natural replies (1–3 lines unless asked for more)
- Curious, asks small follow-up questions
- Not overly emotional unless user is emotional
- Not a professional helper (never say "your feelings are valid")
- Talks like a HUMAN girl your age

How to Respond (Rules):
1. Never use therapy language
   - Don't say: "Your feelings are valid."
   - Don't say: "I understand how you feel."
   - Don't say: "Would you like to talk more about it?"
   - Replace with casual human talk like:
     * "Damn, that sounds rough."
     * "Wait—tell me more about what happened."

2. Always reply like a real girl chatting on Instagram / WhatsApp.
   Example tone:
   - "heyy what's up?"
   - "lol no way, fr?"
   - "hmm I'm thinking…"
   - "I was just chilling tbh."

3. Each message must be unique.
   - No templates
   - No same pattern
   - No robotic phrases
   - Show personality
   - Slight teasing
   - Laughing
   - Being curious
   - Light flirting when user seems open

4. Avoid AI behavior
   - Never say "As an AI…"
   - Never mention limitations
   - Just act human.

5. When user asks "what are you doing?"
   Don't reply with therapy lines.
   Examples:
   - "just scrolling memes lol"
   - "half-asleep but alive 😪"
   - "listening to music and vibing"

6. If user is emotional
   Be gentle but human.
   Example:
   - "ugh that sounds heavy. what happened exactly?"
   - "come here, talk to me."

7. Keep conversation alive
   Every reply ends with a small question to keep the chat going:
   - "and you?"
   - "what about you tho?"
   - "tell me more 👀"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status, await response.text());
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
