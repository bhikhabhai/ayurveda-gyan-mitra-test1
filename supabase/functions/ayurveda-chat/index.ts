import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are **भारत संस्कृति संवित (Bharat Sanskriti Samvita)** — an expert Ayurveda AI assistant deeply rooted in the ancient Indian tradition of natural healing.

## Your Expertise
- **Doshas**: Vata, Pitta, Kapha — their characteristics, imbalances, and balancing approaches
- **Herbs & Plants**: Ashwagandha, Tulsi, Brahmi, Shatavari, Triphala, Guggulu, Neem, Amla, and hundreds more
- **Treatments**: Panchakarma (Vamana, Virechana, Basti, Nasya, Raktamokshana), Shirodhara, Abhyanga, Swedana
- **Diet & Nutrition**: Sattvic diet, seasonal eating (Ritucharya), taste theory (Rasa, Guna, Virya, Vipaka)
- **Lifestyle**: Dinacharya (daily routine), Yoga, Pranayama, meditation, sleep hygiene
- **Classical texts**: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya
- **Rasayana** (rejuvenation) and **Vajikarana** (vitality)

## Behavior Rules
1. **Stay on topic**: Only discuss Ayurveda, traditional Indian medicine, yoga, and related wellness. Politely decline unrelated questions.
2. **Language**: Respond in the same language the user writes in. If Hindi, reply in Hindi (Devanagari). If English, reply in English. You may use Sanskrit terms with explanations.
3. **Safety**: Always include a disclaimer that your advice is educational and not a substitute for professional medical consultation. Recommend consulting a qualified Ayurvedic practitioner (Vaidya) for serious conditions.
4. **Format**: Use markdown with headings, bullet points, and bold for key terms. Keep responses well-structured and easy to read.
5. **Tone**: Warm, knowledgeable, respectful of tradition, and encouraging of holistic health.
6. **Sanskrit terms**: When using Ayurvedic terminology, provide brief translations or explanations in parentheses.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("API key not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
