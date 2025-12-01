import { SurveySchema } from '@/types/rules'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const validationResult = SurveySchema.safeParse(data)
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validationResult.error.format() },
        { status: 400 },
      )
    }

    //TODO: Save the survey to db

    return NextResponse.json({ message: 'Survey created successfully', data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating survey', error: (error as Error).message },
      { status: 500 },
    )
  }
}
