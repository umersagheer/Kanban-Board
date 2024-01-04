'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { useTaskStore } from '@/store/use-task'

import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { inflate } from 'zlib'

const NewTodoDialog = () => {
  const addTask = useTaskStore(state => state.addTask)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title, description } = Object.fromEntries(formData)

    if (typeof title !== 'string' || typeof description !== 'string') {
      return
    }

    addTask(title, description)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'}>+Add a new Todo</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add new todo</DialogTitle>
            <DialogDescription>
              What do you want to done today
            </DialogDescription>
          </DialogHeader>
          <form
            id='todo-form'
            className='grid gap-4 py-4'
            onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-4 items-center gap-4'>
              <Input
                id='title'
                name='title'
                placeholder='todo title...'
                className='col-span-4'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Textarea
                placeholder='Add description...'
                id='description'
                name='description'
                className='col-span-4'
              />
            </div>
          </form>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type='submit' form='todo-form'>
                Add todo
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewTodoDialog
