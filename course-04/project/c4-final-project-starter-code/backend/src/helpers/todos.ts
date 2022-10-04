import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

const todoAccess = new TodosAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return await todoAccess.getTodosForUser(userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const todoId: string = uuid.v4()
  const createdAt: string = new Date().toISOString()
  const newItem: TodoItem = {
    todoId,
    userId,
    createdAt,
    done: false,
    ...createTodoRequest
  }

  return await todoAccess.createTodo(newItem)
}

export async function updateTodo(
  userId: string,
  todoId: string,
  updateTodoRequest: UpdateTodoRequest
): Promise<void> {
  return await todoAccess.updateTodo(userId, todoId, updateTodoRequest)
}

export async function deleteTodo(
  userId: string,
  todoId: string
): Promise<void> {
  return await todoAccess.deleteTodo(userId, todoId)
}

export async function createAttachmentPresignedUrl(
  userId: string,
  todoId: string
): Promise<string> {
  const imageId = uuid.v4()

  return await todoAccess.uploadAttachment(userId, todoId, imageId)
}
