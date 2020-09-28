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

export async function getDocDetail (repoId, id) {
  console.log('获取detail', repoId, id)
  const article = await fetch.get(`/repos/${repoId}/docs/${id}`)
  return article
}

