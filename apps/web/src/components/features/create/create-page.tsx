'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, LayoutGrid, Plus, Sparkles, Tag, Target, Users2 } from 'lucide-react'
import { useState } from 'react'
import { QuestionBlockProps, QuestionProps, SurveyDraft } from '@/types/props'
import QuestionExecuter from './question-executer'
import BlockExecuter from './block-executer'
import { v4 as uuidv4 } from 'uuid'

const CreateSurveyPage = () => {
  const [type, setType] = useState<'short' | 'long'>('short')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>('')
  const [title, setTitle] = useState('')
  const [shortLabel, setShortLabel] = useState('')
  const [emoji, setEmoji] = useState('smile')
  const [description, setDescription] = useState('')
  const [targetParticipants, setTargetParticipants] = useState<number | null>(null)
  const [audience, setAudience] = useState('')

  function handleTypeChange(newType: 'short' | 'long') {
    setType(newType)
  }

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      id: uuidv4(),
      type: 'freetext',
      title: '',
      questionChoices: 2,
      answerChoices: 1,
    },
  ])

  const [questionBlocks, setQuestionBlocks] = useState<QuestionBlockProps[]>([
    {
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, 5),
      questions: [
        {
          id: uuidv4(),
          type: 'freetext',
          title: '',
          questionChoices: 2,
          answerChoices: 1,
        },
      ],
    },
  ])

  function addBlock() {
    setQuestionBlocks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString().slice(0, 5),
        questions: [],
      },
    ])
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
              questions: [
                ...block.questions,
                {
                  id: uuidv4(),
                  type: 'freetext',
                  title: '',
                  questionChoices: 2,
                  answerChoices: 1,
                },
              ],
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
    setQuestions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: 'freetext',
        title: '',
        questionChoices: 2,
        answerChoices: 1,
      },
    ])
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

    await fetch('/api/create/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  }

  return (
    <form className="flex-center flex-col w-full p-4 gap-4" onSubmit={handleSubmit}>
      <div className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl w-full">
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
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <LayoutGrid className="h-4 w-4" />
              Vorlagen
            </Button>
            <Button size="sm" className="shadow-md">
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
                //TODO: Add more options and colors
                <option value="smile">😊</option>
                <option value="chart">📊</option>
                <option value="brain">🧠</option>
                <option value="idea">💡</option>
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
                value={targetParticipants ?? ''}
                onChange={(e) => setTargetParticipants(Number(e.target.value))}
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
    </form>
  )
}

export default CreateSurveyPage
