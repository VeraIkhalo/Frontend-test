const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

// Fetch a single user by ID
export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id}`)
  }
  return response.json()
}

// Fetch posts
export async function fetchPosts(userId?: number): Promise<Post[]> {
  const url = userId 
    ? `${API_BASE_URL}/posts?userId=${userId}` 
    : `${API_BASE_URL}/posts`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

// Fetch comments
export async function fetchComments(postId?: number): Promise<Comment[]> {
  const url = postId 
    ? `${API_BASE_URL}/comments?postId=${postId}` 
    : `${API_BASE_URL}/comments`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }
  return response.json()
}

// Fetch posts and comments together (for chat messages)
export async function fetchPostsWithComments(userId: number): Promise<Array<Post & { comments: Comment[] }>> {
  const posts = await fetchPosts(userId)
  const comments = await fetchComments()
  
  return posts.map(post => ({
    ...post,
    comments: comments.filter(comment => comment.postId === post.id)
  }))
}

