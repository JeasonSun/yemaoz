import fetch from './fetch'

export const groupName = 'yemaoz'

export async function getRepos () {
  const articles = await fetch.get(`/groups/${groupName}/repos`)
  return articles
}

export async function getGroupInfo () {
  const group = await fetch.get('/groups/yemaoz')
  return group
}

export async function getDocs (id) {
  const articles = await fetch.get(`/repos/${id}/docs`)
  return articles
}
