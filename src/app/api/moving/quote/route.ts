import { NextResponse } from "next/server";
import { z } from "zod";
import { getMovingQuote } from "@/lib/moving-quote";

const schema = z.object({
  serviceSlug: z.string().optional().nullable(),
  originCity: z.string().optional().nullable(),
  originState: z.string().optional().nullable(),
  destinationCity: z.string().optional().nullable(),
  destinationState: z.string().optional().nullable(),
  miles: z.number().optional().nullable(),
  moveDate: z.string().optional().nullable(),
  moveSize: z.enum(["studio", "1br", "2br", "3br", "4br+"]).optional().nullable(),
  addOns: z
    .object({
      packing: z.enum(["none", "partial", "full"]).optional(),
      storage: z.boolean().optional(),
      junkRemoval: z.boolean().optional(),
      assembly: z.boolean().optional(),
    })
    .optional()
    .nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = schema.parse(json);

    const quote = await getMovingQuote(body);
    if (!quote.ok) {
      return NextResponse.json(quote, { status: 409 });
    }
    return NextResponse.json(quote);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    }
    return new NextResponse(null, { status: 500 });
  }
}

