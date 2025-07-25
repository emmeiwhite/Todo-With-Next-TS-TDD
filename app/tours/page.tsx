// ✅ Step 1: Install zod
import { z } from 'zod'

// ✅ Step 2: Define a Zod Schema for Tour
const TourSchema = z.object({
  id: z.string(),
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string()
})

// ✅ Step 3: Infer  TS type
type Tour = z.infer<typeof TourSchema>

const url: string = 'https://www.course-api.com/react-tours-project'

// ✅ Step 4: Validate the API response inside fetchTours
async function fetchTours(url: string): Promise<Tour[]> {
  // Just a 1s delay -- simulating the API
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const response = await fetch(url)
    const rawData: Tour[] = await response.json()

    // SafeParsing
    const result = TourSchema.array().safeParse(rawData)

    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`)
    }

    return result.data
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'there was an error ...'

    console.log(errorMsg)
    return []
    // Will look into this InshaAllah! But for now, Sense of Urgency regarding Suspense & Hydration
  }
}

/** --- Server Side Rendering in Next.js --- */
export default async function ToursPage() {
  const tours = await fetchTours(url)

  return (
    <div className="py-6">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h1 className="text-2xl font-semibold">Tours</h1>

        {/* {toursJSX} */}

        <h2 className="my-3 text-xl font-bold">Total Tours: {tours.length}</h2>

        <div className="flex flex-col gap-4">
          {tours.map(tour => {
            return (
              <div
                key={tour.id}
                className="p-3 rounded shadow-sm shadow-indigo-400">
                <h2>{tour.name}</h2>
                <p>{tour.price}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
