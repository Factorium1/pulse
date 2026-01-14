'use client'

import { createSurvey, updateSurvey } from '@/app/(editor)/editor/create/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, LayoutGrid, Plus, Send, Sparkles, Tag, Target, Users2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  QuestionBlockProps,
  QuestionProps,
  SurveyDraft,
  SurveyForm,
  SurveyUpdateDraft,
} from '@/types/props'
import QuestionExecuter from './question-executer'
import BlockExecuter from './block-executer'
import { v4 as uuidv4 } from 'uuid'
import { SurveySchema, SurveyUpdateSchema } from '@/types/rules'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import type { Question, Survey, SurveyBlock } from '@prisma/client'

type SurveyBlockInput = SurveyBlock & { questions?: Question[]; question?: Question[] }

const CreateSurveyPage = ({
  survey,
  questionsData,
  blocks,
}: {
  survey?: Survey
  questionsData?: Question[]
  blocks?: SurveyBlockInput[]
}) => {
  const router = useRouter()
  const [type, setType] = useState<'short' | 'long'>('short')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>('')
  const [title, setTitle] = useState('')
  const [shortLabel, setShortLabel] = useState('')
  const [emoji, setEmoji] = useState('smile')
  const [description, setDescription] = useState('')
  const [targetParticipants, setTargetParticipants] = useState<number>(10)
  const [audience, setAudience] = useState('')

  const createEmptyQuestion = (): QuestionProps => ({
    id: uuidv4(),
    type: 'freetext',
    title: '',
    questionChoices: 2,
    answerChoices: 1,
  })

  const createEmptyBlock = (): QuestionBlockProps => ({
    id: uuidv4(),
    date: new Date().toLocaleDateString('de-DE'),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    questions: [createEmptyQuestion()],
  })

  const mapSurveyType = (value?: Survey['type']): 'short' | 'long' => {
    if (value === 'LONG') return 'long'
    if (value === 'SHORT') return 'short'
    return value === 'long' || value === 'short' ? value : 'short'
  }

  const mapQuestionType = (value?: Question['type']): QuestionProps['type'] => {
    switch (value) {
      case 'MULTIPLE_CHOICE':
        return 'multiple-choice'
      case 'SINGLE_CHOICE':
        return 'single-choice'
      case 'RATING':
        return 'rating'
      default:
        return 'freetext'
    }
  }

  const mapPrismaQuestionToForm = (question: Question): QuestionProps => {
    const mappedType = mapQuestionType(question.type)
    const isChoice = mappedType === 'multiple-choice' || mappedType === 'single-choice'

    const questionChoices = isChoice ? Math.max(question.options?.length ?? 0, 2) : undefined

    const answerChoices =
      mappedType === 'single-choice'
        ? 1
        : mappedType === 'multiple-choice'
          ? Math.max(question.maxAnswers ?? 2, 2)
          : undefined

    const normalizedOptions =
      isChoice && questionChoices
        ? Array.from({ length: questionChoices }, (_, index) => question.options?.[index] ?? '')
        : undefined

    return {
      id: question.id,
      type: mappedType,
      title: question.title ?? '',
      description: question.description ?? '',
      questionChoices,
      answerChoices,
      question: normalizedOptions,
    }
  }

  const mapPrismaBlockToForm = (block: SurveyBlockInput): QuestionBlockProps => {
    const questionList = block.questions ?? block.question ?? []

    const dateSource = block.fixedAt ?? block.createdAt
    const dateObj = dateSource ? new Date(dateSource) : undefined
    const hasValidDate = dateObj && !Number.isNaN(dateObj.getTime())

    return {
      id: block.id,
      date: hasValidDate
        ? dateObj.toLocaleDateString('de-DE')
        : new Date().toLocaleDateString('de-DE'),
      time: hasValidDate
        ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      questions: questionList.map(mapPrismaQuestionToForm),
    }
  }

  useEffect(() => {
    if (!survey) return

    const mappedType = mapSurveyType(survey.type)
    setType(mappedType)
    setTags(survey.tags ?? [])
    setTitle(survey.title ?? '')
    setShortLabel(survey.shortLabel ?? '')
    setEmoji(survey.emoji ?? 'smile')
    setDescription(survey.description ?? '')
    setTargetParticipants(survey.targetParticipants ?? 10)
    setAudience(survey.audience ?? '')

    if (mappedType === 'short' && questionsData?.length) {
      setQuestions(questionsData.map(mapPrismaQuestionToForm))
      setQuestionBlocks([])
    }

    if (mappedType === 'long' && blocks?.length) {
      setQuestionBlocks(blocks.map(mapPrismaBlockToForm))
      setQuestions([])
    }
  }, [survey, questionsData, blocks])

  function handleTypeChange(newType: 'short' | 'long') {
    setType(newType)
  }

  const [questions, setQuestions] = useState<QuestionProps[]>(() => [createEmptyQuestion()])

  const [questionBlocks, setQuestionBlocks] = useState<QuestionBlockProps[]>(() => [
    createEmptyBlock(),
  ])

  function addBlock() {
    setQuestionBlocks((prev) => [...prev, createEmptyBlock()])
  }

  function changeBlock(blockId: string, updatedBlock: QuestionBlockProps) {
    setQuestionBlocks((prev) => prev.map((block) => (block.id === blockId ? updatedBlock : block)))
  }

  function addBlockQuestion(blockId: string) {
    setQuestionBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              questions: [...block.questions, createEmptyQuestion()],
            }
          : block,
      ),
    )
  }

  function deleteBlockQuestion(blockId: string, questionId: string) {
    setQuestionBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              questions: block.questions.filter((question) => question.id !== questionId),
            }
          : block,
      ),
    )
  }

  function deleteBlock(blockId: string) {
    setQuestionBlocks((prev) => prev.filter((block) => block.id !== blockId))
  }

  function changeBlockQuestion(
    blockId: string,
    questionId: string,
    updatedQuestion: QuestionProps,
  ) {
    setQuestionBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              questions: block.questions.map((question) =>
                question.id === questionId ? updatedQuestion : question,
              ),
            }
          : block,
      ),
    )
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, createEmptyQuestion()])
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((question) => question.id !== id))
  }

  function changeQuestion(id: string, updatedQuestion: QuestionProps) {
    const next: QuestionProps = { ...updatedQuestion }

    if (next.type === 'multiple-choice' && next.answerChoices === 1) {
      next.type = 'single-choice'
    }

    if (next.type === 'single-choice' && next.answerChoices && next.answerChoices > 1) {
      next.type = 'multiple-choice'
    }

    if (next.type === 'single-choice') {
      next.answerChoices = 1
    }

    if (next.type === 'multiple-choice') {
      if (!next.answerChoices || next.answerChoices < 2) {
        next.answerChoices = 2
      }
    }

    setQuestions((prev) => prev.map((question) => (question.id === id ? next : question)))
  }

  function handleAddButtonClick() {
    if (type === 'short') {
      addQuestion()
    } else {
      addBlock()
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
  }

  function handleAddTag() {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags((prevTags) => [...prevTags, newTag.trim()])
      setNewTag('')
    }
    console.log(questions)
  }

  async function handleChange(e: React.FormEvent<HTMLFormElement>) {
    if (!survey) {
      toast.error('Survey not found for update')
      return
    }
    e.preventDefault()
    const payload: SurveyUpdateDraft = {
      id: survey.id,
      title,
      shortLabel,
      emoji,
      description,
      type,
      tags,
      targetParticipants,
      audience,
      questions: type === 'short' ? questions : [],
      blocks: type === 'long' ? questionBlocks : [],
    }

    const validationResult = SurveyUpdateSchema.safeParse(payload)
    if (!validationResult.success) {
      const { fieldErrors, formErrors } = validationResult.error.flatten()
      const errorMessages = [...formErrors, ...Object.values(fieldErrors).flat()]
      errorMessages.forEach((msg) => {
        toast.error(msg)
      })
      return
    }

    try {
      let res
      res = await updateSurvey(survey.id, payload)

      if (!res.ok) {
        toast.error('Fehler beim Aktualisieren der Studie')
        return
      }

      toast.success('Studie erfolgreich aktualisiert!')
      router.push(`/editor/manage`)
      return
    } catch (error) {
      toast.error('Network error: ' + String(error))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload: SurveyDraft = {
      title,
      shortLabel,
      emoji,
      description,
      type,
      tags,
      targetParticipants,
      audience,
      questions: type === 'short' ? questions : [],
      blocks: type === 'long' ? questionBlocks : [],
    }

    const validationResult = SurveySchema.safeParse(payload)
    if (!validationResult.success) {
      const { fieldErrors, formErrors } = validationResult.error.flatten()
      const errorMessages = [...formErrors, ...Object.values(fieldErrors).flat()]
      errorMessages.forEach((msg) => {
        toast.error(msg)
      })
      return
    }

    try {
      let res
      res = await createSurvey(payload)

      if (!res.ok) {
        toast.error(res.message || 'Fehler beim Erstellen der Studie')
        return
      }

      toast.success('Studie erfolgreich erstellt!')
      router.push(`/editor/manage`)
    } catch (error) {
      toast.error('Network error: ' + String(error))
    }
  }

  return (
    <form
      className="flex-center flex-col w-full p-4 gap-4"
      onSubmit={survey ? handleChange : handleSubmit}
    >
      <div className="rounded-3xl border border-border/70 bg-linear-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl w-full">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Studien erstellen
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              Konfiguriere Survey + Live-Preview
              <Sparkles className="h-6 w-6 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Nutze das Survey-Model (Titel, Beschreibung, Fragen, Optionen, Timing) und ergänze
              Tags sowie Ziel-Teilnehmer, um alles aus einem Flow zu pflegen.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-background/60 backdrop-blur"
            >
              <LayoutGrid className="h-4 w-4" />
              Vorlagen
            </Button>
            <Button type="button" size="sm" className="shadow-md">
              <CheckCircle2 className="h-4 w-4" />
              Entwurf sichern
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6 items-start lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm flex-start flex-col gap-4">
          <div className="">
            <p className="text-xs uppercase text-muted-foreground tracking-widest">Grunddaten</p>
            <h2 className="text-xl font-semibold text-foreground">Survey Details</h2>
            <p className="text-sm text-muted-foreground">
              Titel, Beschreibung, Fragen & Optionen für dein Survey konfigurieren.
            </p>
          </div>
          <div className="w-full">
            <label htmlFor="titel" className="text-sm text-muted-foreground">
              Titel der Studie
            </label>
            <input
              type="text"
              id="titel"
              name="titel"
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              placeholder="z.B. Kundenzufriedenheitsumfrage Q2 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="w-full grid grid-cols-4 gap-4">
            <div className="w-full col-span-3">
              <label htmlFor="short-form" className="text-sm text-muted-foreground">
                Kurzform
              </label>
              <input
                type="text"
                id="short-form"
                name="short-form"
                className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
                placeholder="z.B. Gedächtnis"
                value={shortLabel}
                onChange={(e) => setShortLabel(e.target.value)}
                required
              />
            </div>
            <div className="w-full col-span-1">
              <label htmlFor="emoji" className="text-sm text-muted-foreground">
                Emoji
              </label>
              <select
                id="emoji"
                name="emoji"
                className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none text-center"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              >
                <option value="brain">🧠</option>
                <option value="grow">🌱</option>
                <option value="energy">⚡</option>
                <option value="passion">❤️‍🔥</option>
                <option value="idea">💡</option>
                <option value="info">📎</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="beschreibung" className="text-sm text-muted-foreground">
              Beschreibung
            </label>
            <textarea
              id="beschreibung"
              name="beschreibung"
              rows={4}
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              placeholder="Worum geht es, was erwartet die Teilnehmer?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="suvey-typ" className="text-sm text-muted-foreground">
              Survey-Typ
            </label>
            <select
              id="survey-typ"
              name="survey-typ"
              className="w-full rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs outline-none"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as 'short' | 'long')}
            >
              <option value="short">Umfrage</option>
              <option value="long">Mehrtägige Studie</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex items-center justify-start gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <p className="text-muted-foreground">Tags</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Tags hinzufügen..."
                className="bg-transparent outline-none text-muted-foreground px-3 text-sm rounded-lg border border-border/70"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs cursor-pointer"
                onClick={() => handleAddTag()}
              >
                <Plus className="h-4 w-4" />
                Hinzufügen
              </Button>
            </div>
            <div className="flex-center flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex-center gap-1 rounded-full border border-border/70 bg-muted/60 px-3 py-1 text-xs text-foreground font-semibold"
                >
                  {tag}
                  <span
                    className="text-muted-foreground cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="w-full grid gap-4 md:grid-cols-2">
            <div className="flex-start flex-col gap-2 rounded-xl border border-border/70 bg-background/80 p-4">
              <div className="flex-center flex-row gap-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Ziel-Teilnehmer</p>
              </div>
              <Input
                type="number"
                placeholder="Anzahl der Teilnehmer"
                className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70 flex-1"
                value={targetParticipants}
                onChange={(e) => setTargetParticipants(Number(e.target.value))}
                required
              />
              <p className="text-muted-foreground text-xs">
                Anzahl gplanter Teilnehmer für die Studie.
              </p>
            </div>
            <div className="flex-start flex-col gap-2 rounded-xl border border-border/70 bg-background/80 p-4">
              <div className="flex-center flex-row gap-2">
                <Users2 className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Zielgruppe</p>
              </div>
              <Input
                type="text"
                placeholder="Beschreibung der Zielgruppe"
                className="bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70 flex-1"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
              <p className="rounded-full bg-muted/60 border border-border/70 px-3 py-1 text-xs">
                Deutschland
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6 items-start lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm flex-start flex-col gap-4">
          <div className="flex flex-col gap-2 md:flex-between md:flex-row md:gap-0 md:items-center w-full">
            <div className="">
              <p className="text-xs uppercase text-muted-foreground tracking-widest">Fragen</p>
              <h2 className="text-xl font-semibold text-foreground">Fragebogen</h2>
              <p className="text-sm text-muted-foreground">
                Titel, Beschreibung, Fragetyp & Optionen und Timing je Frage. Die aktive frage
                erscheint in der Vorschau.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs cursor-pointer"
              onClick={handleAddButtonClick}
            >
              <Plus className="h-4 w-4" />
              {type === 'short' ? 'Frage hinzufügen' : 'Block hinzufügen'}
            </Button>
          </div>
          {type === 'short' ? (
            <QuestionExecuter
              questions={questions}
              onRemoveQuestion={removeQuestion}
              onChangeQuestion={changeQuestion}
            />
          ) : (
            <BlockExecuter
              questionBlocks={questionBlocks}
              onAddBlockQuestion={addBlockQuestion}
              onRemoveBlockQuestion={deleteBlockQuestion}
              onChangeBlockQuestion={changeBlockQuestion}
              onChangeBlock={changeBlock}
              onDeleteBlock={deleteBlock}
            />
          )}
        </div>
      </div>

      <div className="w-full rounded-3xl border border-border/70 bg-linear-to-r from-primary/15 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Abschliessen</p>
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            Studie absenden
            <Sparkles className="h-5 w-5 text-primary" />
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Sichere den Entwurf oder sende ihn ab, um direkt Feedback von Teilnehmern zu sammeln.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-background/70 backdrop-blur cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            Entwurf sichern
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="px-6 py-3 rounded-xl shadow-lg text-secondary border-none cursor-pointer"
          >
            <Send className="h-5 w-5" />
            <p className="">Studie absenden</p>
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateSurveyPage
